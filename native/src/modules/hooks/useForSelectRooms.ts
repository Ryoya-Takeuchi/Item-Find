import * as React from 'react';
import firestore from '@react-native-firebase/firestore';
import {IHierarchy} from '../models/entities/Hierarchy';
import { IRoom } from '../models/entities/Room';

interface IHook {
	getAllRoom : () => void,
	roomList : IFormTemp[],
	getRoom : (roomId) => void
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

export default function useRooms(familyCode : string) : IHook {
	const [roomList , setRoomList] = React.useState<IFormTemp[]>([]);

	const getAllRoom = React.useCallback(() => {
		async function process() { 
			const ref = await firestore().collection('home').doc(familyCode).collection('hierarchys');
			const snapshot = await ref.get();
			const hierarchys = await Promise.all(
				(snapshot).docs.map((value) => value.data() as IHierarchy )
			)
			const rooms = await Promise.all(
				hierarchys.map(async(hierarchy) => {
					const roomSnapshot =  await ref.doc(hierarchy.id).collection('rooms').get();
					return (roomSnapshot).docs.map((doc) => {
						const room = doc.data() as IRoom;
						return {label : room.room_name,value: room.id}
					})
				})
			);
			return rooms.reduce((acc, val) => acc.concat(val), []);
		};

		process()
		.then((result) => {
			setRoomList(result);
		})
	},[roomList]);

	const getRoom = React.useCallback((roomId : string) => {
		const process = async() => {
			const doc = await firestore().collectionGroup('rooms').get();
			const snapshot = doc.docs.filter((snapshot) => (snapshot.data()).id ==  roomId);
			const refs = await snapshot[0].ref.path.split('/');
			const targetIndex = refs.indexOf('hierarchys');
			const historyId = refs[targetIndex  + 1];
			console.log("historyId",historyId);

		}

		process()
		.then(() => {

		})
		.catch(() => {

		})

	},[roomList]);

	

	return{
		getAllRoom,
		roomList,
		getRoom
	}
}