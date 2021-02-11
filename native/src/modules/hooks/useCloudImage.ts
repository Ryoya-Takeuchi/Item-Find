import * as React from 'react';
import storage from '@react-native-firebase/storage';
import * as RNFS from 'react-native-fs';
import * as DeviceInfo from 'react-native-device-info';


type State =  'start' | 'done' | 'error';
export type refType = 'rooms' | 'items' | 'thumbnails'
export type TFileExtension = 'jpeg' | 'png';

namespace fileExtension {
	export const jpeg = 'jpg';
	export const png = 'png';
}


export default function useCloudImage(uuid : string , type : refType, fileExtensions : TFileExtension[]) {
	const [images , setImages] = React.useState<string[]>(undefined);
	const [state , setState] = React.useState<State>(undefined);

	const run = React.useCallback(async() => {
		
		async function process() {
			let stat: RNFS.StatResult;
			try {
				const base64images = await Promise.all(
					fileExtensions.map(async (fileExtension,index) => {
						const filePath = `${RNFS.CachesDirectoryPath}/${DeviceInfo.getBundleId()}/${uuid}${index}.png`;
						const stat = await RNFS.stat(filePath);
						if(stat.isFile()) {
							const encodedData = await RNFS.readFile(await filePath, 'base64');
							return `data:image/png;base64,${encodedData}`;
						}
					})
				)
				setImages(base64images);
			} catch (error) {
				const ref = await storage().ref('0ox1deWark6YVFRSwLJS');
				const listRef = ref.child(`images/${type}/${uuid}`);
				const list = await listRef.listAll();
				const imageUris = await Promise.all(
					list.items.map(async(itemRef) => {
						return storage().ref(itemRef.fullPath).getDownloadURL();
					})
				);
				const filePaths = imageUris.map(async(imageUri , index) => {
					const dir = `${
						RNFS.CachesDirectoryPath
					}/${DeviceInfo.getBundleId()}`;
					// ${DeviceInfo.getBundleId()}/images/${type}/${index}
					await RNFS.mkdir(dir);
					const filePath = `${RNFS.CachesDirectoryPath}/${DeviceInfo.getBundleId()}/${uuid}${index}.png`;
					// /${DeviceInfo.getBundleId()}/images/${type}/${index}/${uuid}.png`;
					// /${DeviceInfo.getBundleId()}/images/${type}/${index}/${uuid}.png`;
					const process = RNFS.downloadFile({
						fromUrl: imageUri,
						toFile: filePath
					});
					await process.promise;
					stat = await RNFS.stat(filePath);
					return filePath;
				});
				const base64Images = await Promise.all(
					filePaths.map(async(filePath) => {
						const encodedData = await RNFS.readFile(await filePath, 'base64');
						return `data:image/png;base64,${encodedData}`;
					})
				);
				setImages(base64Images);
			}
		}

		setState('start');
		process().
		then(() => {
			setState('done')
		})
		.catch(() => {
			setState('error');
		})
	},[uuid , type])

	return {
		state,
		run,
		images
	}

}