import * as React from 'react';
import firestore from '@react-native-firebase/firestore';

interface IHook {
	getAllFamilys : () => void,
	familyList
}

export interface IFamily {
	avatar_uri : string,
	email : string,
	family_id : string,
	family_name : string,
	given_name : string,
	id : string,
	nick_name : string
};

interface IFormTemp {
	label : string,
	value : string
}

export default function useFamily(familyCode : string) : IHook {
	const [familyList , setFamilyList] = React.useState<IFormTemp[]>([]);

	const getAllFamilys = React.useCallback(() => {
		async function process() {
			const snapshot = await firestore().collection('family').doc(familyCode).collection('list').get();
			const familyList = await Promise.all(
				(snapshot).docs.map((value) => {
					const user = value.data() as IFamily; 
					return { label : user.nick_name != '' ?  user.nick_name : `${user.family_name} ${user.given_name}` , value : user.id}
				})
			)
			return familyList;
		};

		process()
		.then((result) => {
			setFamilyList(result)
		})
	},[familyList])

	return{
		getAllFamilys,
		familyList
	}
}