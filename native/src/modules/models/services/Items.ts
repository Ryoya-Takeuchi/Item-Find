import { IItem } from '../entities/Item';
import { IRoom } from '../entities/Room';
import { IHierarchy } from '../entities/hierarchy';


export interface ItemsService {
	/**
	 * @param hierarchy 
	 * @param roomId 
	 */
	getItem(hierarchy : IHierarchy, itemId : string) : Promise<IItem | undefined>
	/**
	 * @param hierarchy
	 */
	getAllItems(hierarchy : IHierarchy) : Promise<IItem[]>

	getBelongItems(hierarchy : IHierarchy , room : IRoom) : Promise<IItem[]>
}