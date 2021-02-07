import FromServer from '../from_server/from_server';
import { RoomsService } from '../../Rooms';
import {IRoom} from '../../../entities/Room'
import { IHierarchy } from '../../../entities/Hierarchy';

export default class RoomServiceFromServer extends FromServer implements RoomsService {
	constructor(familyCode : string) {
		super(familyCode);
	}

	async getFindRootRooms(hierarchy : IHierarchy) {
		const query = super.roomQuery(hierarchy.id)
		.where('is_root' , '==' , true)
		.orderBy('order_by','asc');
		const rooms = await super.getServerQuery<IRoom>(query);
		return rooms
	}

	async getRoom(hierarchy : IHierarchy , roomId : string) {
		const ref = super.roomRef(hierarchy.id);
		const room =  await super.getServerDoc<Partial<IRoom>>(ref.doc(roomId));
		return room;
	}

	async getChildRooms(hierarchy : IHierarchy , room : IRoom) {
		const childRoomPromise = room.room_ids.map(roomId => this.getRoom(hierarchy , roomId));
		const rooms = await Promise.all(childRoomPromise);
		return rooms;
	}
}