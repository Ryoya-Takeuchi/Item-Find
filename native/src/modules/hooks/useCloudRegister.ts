import * as React from 'react';
import firestore from '@react-native-firebase/firestore';
import {IItem} from '../../modules/models/entities/Item'

type State = 'start' | 'done' | 'error' | 'init';
interface ICloudRegisterHook {

}
export default function useCloudRegister(familyCode : string) {
	const [state , setState] = React.useState<State>('init');

	const itemRegister = React.useCallback(async(hierarchyId : string,item : IItem) => {
		try {
			const res = await firestore()
			.collection('home')
			.doc(familyCode)
			.collection('hierarchys')
			.doc(hierarchyId)
			.collection('items')
			.add({
				...item
			})
	
			await firestore()
			.doc(`home/${familyCode}/hierarchys/${hierarchyId}/items/${res.id}`)
			.update({
				...item, id : res.id
			})
			return res.id
		} catch (error) {
			return new Error('登録処理でエラーが発生しました。')
		}
		
	},[state,setState]);



	return {
		itemRegister
	}
}