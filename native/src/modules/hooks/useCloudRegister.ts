import * as React from 'react';
import firestore from '@react-native-firebase/firestore';
import {IItem} from '../../modules/models/entities/Item'

type State = 'start' | 'done' | 'error' | 'init';
interface ICloudRegisterHook {

}
export default function useCloudRegister(familyCode : string) {
	const [state , setState] = React.useState<State>('init');

	const itemRegister = React.useCallback((hierarchyId : string,item : IItem) => {
		firestore()
		.collection('home')
		.doc(familyCode)
		.collection('hierarchys')
		.doc(hierarchyId)
		.collection('items')
		.add({
			...item
		})
		.then((res) => {
			firestore()
			.doc(`home/${familyCode}/hierarchys/${hierarchyId}/items/${res.id}`)
			.update({
				...item,id:res.id
			})
			.then(() => {
				console.log('User updated! ' + res.id);
			})
			

		});
	},[state,setState]);



	return {
		itemRegister
	}
}