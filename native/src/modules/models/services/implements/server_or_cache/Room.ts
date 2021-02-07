import { RoomsService } from '../../Rooms';
import RoomServiceFromServer from '../from_server/server_room';

export default class RoomServiceFromServerOrCache implements RoomsService {
	constructor(
		private roomServiceFromServer : RoomServiceFromServer
	){}

	async getChildRooms(hierarchy , room){
		return await this.roomServiceFromServer.getChildRooms(hierarchy , room);
	}

	async getFindRootRooms(hierarchy) {
		return await this.roomServiceFromServer.getFindRootRooms(hierarchy);
	}

	async getRoom(hierarchy , roomId) {
		return await this.roomServiceFromServer.getRoom(hierarchy , roomId)
	};

}