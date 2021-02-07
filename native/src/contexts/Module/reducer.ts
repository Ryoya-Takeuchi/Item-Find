import { HierarchysService } from '../../modules/models/services/Hierarchys';
import { ItemsService } from '../../modules/models/services/Items';
import { RoomsService } from '../../modules/models/services/Rooms';

import HierarchyServiceFromServer from '../../modules/models/services/implements/from_server/server_hierarchy';
import ItemServiceFromServer from '../../modules/models/services/implements/from_server/server_item';
import RoomServiceFromServer from '../../modules/models/services/implements/from_server/server_room';

import HierarchyServiceFromServerOrCache from '../../modules/models/services/implements/server_or_cache/Hierarchy';
import RoomServiceFromServerOrCache from '../../modules/models/services/implements/server_or_cache/Room';
import ItemServiceFromServerOrCache from '../../modules/models/services/implements/server_or_cache/Item';



import { Actions , ReducerAction} from './types';

interface ReducerState {
	hierarchyService : HierarchysService,
	itemService : ItemsService,
	roomService : RoomsService
}

export default (state : ReducerState , action : ReducerAction) =>  {
	switch(action.type){
		case Actions.INIT : {
			return {
				...state,
				hierarchyService : new HierarchyServiceFromServerOrCache(
					new HierarchyServiceFromServer('0ox1deWark6YVFRSwLJS')
				),
				itemService : new ItemServiceFromServerOrCache(
					new ItemServiceFromServer('0ox1deWark6YVFRSwLJS')
				), 
				roomService : new RoomServiceFromServerOrCache(
					new RoomServiceFromServer('0ox1deWark6YVFRSwLJS')
				)
			};
		}
		default : 
			return state;
	}
};