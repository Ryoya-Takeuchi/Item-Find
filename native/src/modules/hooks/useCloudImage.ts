import * as React from 'react';
import storage from '@react-native-firebase/storage';
import * as RNFS from 'react-native-fs';
import * as DeviceInfo from 'react-native-device-info';


type State =  'start' | 'done' | 'error';
export type refType = 'rooms' | 'items' | 'thumbnails'
export type TFileExtension = 'jpeg' | 'png' | undefined;

namespace fileExtension {
	export const jpeg = 'jpg';
	export const png = 'png';
}


function checkFirebaseStorageURL(url: string) {
    return /^gs:\/\/.*/.test(url);
}

export default function useCloudImage(uuid : string , type : refType, imgUrls : string[] | null) {
	const [images , setImages] = React.useState<string[]>(undefined);
	const [state , setState] = React.useState<State>(undefined);

	const run = React.useCallback(async() => {
		async function process() {
			const images = await Promise.all(
				imgUrls.map(async(imgUrl) => {
					let stat : RNFS.StatResult
					
					if(!checkFirebaseStorageURL(imgUrl)) {
						return;
					}
					const ref = storage().refFromURL(imgUrl);
					const metadata =await ref.getMetadata();
					const fileExtension = metadata.contentType.match(/(gif|jpe?g|png)$/i)[0];
					console.log("fileExtension",fileExtension)
					const fileName = await ref.fullPath.split('/')[4];
					const filePath = `${RNFS.CachesDirectoryPath}/${DeviceInfo.getBundleId()}/${uuid}${fileName}`;
					try {
						stat = await RNFS.stat(filePath);
						if( new Date(stat.mtime).getTime() < new Date(metadata.updated).getTime() ) {
							throw new Error("file is update")
						}

					} catch (error) {
						const downloadUrl = await ref.getDownloadURL();
						const dir = `${
							RNFS.CachesDirectoryPath
						}/${DeviceInfo.getBundleId()}/${ref.parent.fullPath}/${fileExtension}`;
						console.log("dir",dir)
						// ${DeviceInfo.getBundleId()}/images/${type}/${index}
						await RNFS.mkdir(dir);
						const process = RNFS.downloadFile({
							fromUrl: downloadUrl,
							toFile: filePath
						});
						await process.promise;
						stat = await RNFS.stat(filePath);
						return filePath;
					}
				
					if(stat.isFile()) {
						const encodedData = await RNFS.readFile(await filePath, 'base64');
						return `data:image/png;base64,${encodedData}`;
					}
				})
			)
			setImages(images);
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