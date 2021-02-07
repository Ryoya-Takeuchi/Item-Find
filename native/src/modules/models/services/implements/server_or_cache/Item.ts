import { ItemsService } from '../../Items';
import ItemServiceFromServer from '../from_server/server_item';

export default class ItemServiceFromServerOfCache implements ItemsService {
	constructor(
		private itemService : ItemServiceFromServer
	) {}

	async getAllItems(hierarchy) {
		return this.itemService.getAllItems(hierarchy);
	}

	async getItem(hierarchy , itemId) {
		return await this.getItem(hierarchy,itemId);
	}

	async getBelongItems(hierarchy , room) {
		return await this.getBelongItems(hierarchy,room);
	}
}