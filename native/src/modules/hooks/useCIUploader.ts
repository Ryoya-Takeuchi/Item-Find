import * as React from 'react';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';


type TStatus = 'init' | 'start' | 'done' | 'error';
type TType = 'items' | 'rooms' | 'thumbnails';
interface ClUploaderHook {
	imgUpload : () => void,
	Status : TStatus
}

const createFireStorageFilePath = (familyCode : string, uid : string , uploadType : TType , fileName : string) => {
	return (`${familyCode}/images/${uploadType}/${uid}/${fileName}`)
}

export default (familyCode : string , uploadType : TType) => {
	const [Status , setStatus] = React.useState<TStatus>('init')

	const imgUpload = React.useCallback((imageUris : string[] , uid : string) => {
		async function process() {
			
			// console.log("imageUri" ,  imageUri);
			const ImagesGsUrls = await Promise.all(
				imageUris.map(async(imageUri) => {
					const fileExtension = imageUri.match(/\.(jpg|png)$/i)[1];
					const imagePathSplit = imageUri.split('/');
					const fileName = (imagePathSplit[imagePathSplit.length - 1]).split('.')[0];
					const ref = storage().ref(createFireStorageFilePath(familyCode,uid ,uploadType,fileName));
					const contentType = `image/${fileExtension}`;
					await ref.putFile(imageUri,{ contentType });
					return `gs://${ref.bucket}/${ref.fullPath}`
				})
			)
			const query = await firestore().collectionGroup(uploadType).get();
			const doc =query.docs.find(doc =>  (doc.data()).id == uid);
			doc.ref.set({
				img_refFromURLs : ImagesGsUrls
			},{merge : true})
		}

		setStatus('start');
		process()
		.then(() => {
			setStatus('done');

		})
		.catch(() => {
			console.log("error")
			setStatus('error');
		})
	},[])

	return {
		imgUpload,
		Status
	}

}