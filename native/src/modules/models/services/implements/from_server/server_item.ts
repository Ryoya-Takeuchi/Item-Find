import FromServer from '../from_server/from_server';
import { ItemsService } from '../../Items';
import { IItem , isItem } from '../../../entities/Item';
import { IHierarchy } from '../../../entities/Hierarchy';
import { IRoom } from '../../../entities/Room';

export default class ItemServiceFromServer extends FromServer implements ItemsService {
	constructor(familyCode : string) {
		super(familyCode);
	}

	async getAllItems(hierarchy : IHierarchy) {
		const query = super.itemQuery(hierarchy.id);
		const items = await super.getServerQuery<IItem>(query);
		return items;
	};

	async getItem(hierarchy : IHierarchy , itemId : string) {
		const doc = super.itemRef(hierarchy.id).doc(itemId);
		const data =  await super.getServerDoc<Partial<IItem>>(doc);
		return data;
	}

	async getBelongItems( hierarchy : IHierarchy , room : IRoom) {
		const items = await this.getAllItems(hierarchy);
		return items.filter((i) => i.room_ids.indexOf(room.id) >=  0)
	}
}