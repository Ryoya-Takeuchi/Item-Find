import * as React from 'react';
import storage from '@react-native-firebase/storage';

type State =  'start' | 'done' | 'error';
export type refType = 'rooms' | 'items' | 'thumbnails'

export default function useCloudImage(uuid : string , type : refType) {
	const [images , setImages] = React.useState<string[]>(undefined);
	const [state , setState] = React.useState<State>(undefined);

	const run = React.useCallback(async() => {
		
		async function process() {
			const ref = await storage().ref('0ox1deWark6YVFRSwLJS');
			const listRef = ref.child(`images/${type}/${uuid}`);
			const list =  await listRef.listAll();
			const imageUris = await Promise.all(
				list.items.map(async(itemRef) => {
					return storage().ref(itemRef.fullPath).getDownloadURL();
				})
			)
			return imageUris
		}

		setState('start');
		process().
		then((res) => {
			setImages(res)
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