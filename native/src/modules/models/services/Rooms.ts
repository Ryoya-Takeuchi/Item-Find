import { IHierarchy } from '../entities/Hierarchy';
import { IRoom } from '../entities/Room';

export interface RoomsService {
	/**
	 * @param hierarchy 
	 */
	getFindRootRooms(hierarchy : IHierarchy) : Promise<IRoom[]>;
	/**
	 * 
	 * @param hierarchy 
	 * @param roomId 
	 */
	getRoom(hierarchy : IHierarchy , roomId : string) :Promise<IRoom>;
	/**
	 * 
	 * @param hierarchy 
	 * @param room 
	 */
	getChildRooms(hierarchy : IHierarchy , room : IRoom) : Promise<IRoom[]>
}