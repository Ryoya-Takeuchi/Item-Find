import * as React from 'react';
import firestore from '@react-native-firebase/firestore';
import {IHierarchy} from '../models/entities/Hierarchy';
import { IRoom } from '../models/entities/Room';

interface IHook {
	// getAllRoom : () => void,
	roomList : IHRoom[],
	setRooms : (roomId) => void,
	status : Status
}

type Status = 'start' | 'init' | 'done';

export interface IHRoom extends IRoom {
	historyId : string
}

export default function useRooms(familyCode : string) : IHook {
	const [roomList , setRoomList] = React.useState<IHRoom[]>([]);
	const [status , setStatus ] = React.useState<Status>('init')

	// const getAllRoom = React.useCallback(() => {
	// 	async function process() { 
	// 		const ref = await firestore().collection('home').doc(familyCode).collection('hierarchys');
	// 		const snapshot = await ref.get();
	// 		const hierarchys = await Promise.all(
	// 			(snapshot).docs.map((value) => value.data() as IHierarchy )
	// 		)
	// 		const rooms = await Promise.all(
	// 			hierarchys.map(async(hierarchy) => {
	// 				const roomSnapshot =  await ref.doc(hierarchy.id).collection('rooms').get();
	// 				return (roomSnapshot).docs.map((doc) => {
	// 					const room = doc.data() as IRoom;
	// 					return {label : room.room_name,value: room.id}
	// 				})
	// 			})
	// 		);
	// 		return rooms.reduce((acc, val) => acc.concat(val), []);
	// 	};

	// 	process()
	// 	.then((result) => {
	// 		setRoomList(result);
	// 	})
	// },[roomList]);

	const setRooms = React.useCallback((roomId : string) => {
		const process = async() => {
			const doc = await firestore().collectionGroup('rooms').get();
			const snapshot = doc.docs.filter((snapshot) => (snapshot.data()).id ==  roomId);
			const refs = await snapshot[0].ref.path.split('/');
			const targetIndex = refs.indexOf('hierarchys');
			const historyId = refs[targetIndex  + 1];
			const room = {...(snapshot[0].data()) , historyId : historyId} as IHRoom
			setRoomList([room]);
		}

		setStatus('start');
		process()
		.then(() => {
			setStatus('done');
		})
		.catch(() => {

		})

	},[roomList]);

	

	return{
		// getAllRoom,
		roomList,
		setRooms,
		status
	}
}