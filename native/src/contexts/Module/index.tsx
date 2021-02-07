import * as React from 'react';
import { HierarchysService } from 'src/modules/models/services/Hierarchys';
import { ItemsService } from 'src/modules/models/services/Items';
import { RoomsService } from 'src/modules/models/services/Rooms';
import reducer from './reducer';
import { Actions } from './types';

export interface Context {
	hierarchyService : HierarchysService,
	itemService : ItemsService,
	roomService : RoomsService
}

const defaultContexts : Context = {
	hierarchyService : new (class implements HierarchysService{
		async getHierarchy() : Promise<
			import('../../modules/models/entities/Hierarchy').IHierarchy
		>{
			throw new Error('HierarchyService not getHierarchy')
		}
		async getHierarchys() : Promise<
			import('../../modules/models/entities/Hierarchy').IHierarchy[]
		>{
			throw new Error('HierarchyService not getHierarchys')
		}
	}),
	itemService : new (class implements ItemsService{
		async getAllItems() : Promise<
			import('../../modules/models/entities/Item').IItem[]
		>{
			throw new Error('HierarchyService not getAllItems')
		}
		async getItem() : Promise<
			import('../../modules/models/entities/Item').IItem
		>{
			throw new Error('HierarchyService not getItem')
		}
		async getBelongItems() : Promise<
			import('../../modules/models/entities/Item').IItem[]
		>{
			throw new Error('HierarchyService not getBelongItems')
		}
	}),
	roomService : new ( class implements RoomsService {
		async getChildRooms() : Promise<
			import('../../modules/models/entities/Room').IRoom[]
		>{
			throw new Error('HierarchyService not getChildRooms')
		}
		async getFindRootRooms() : Promise<
			import('../../modules/models/entities/Room').IRoom[]
		>{
			throw new Error('HierarchyService not getFindRootRooms')
		}
		async getRoom() : Promise<
			import('../../modules/models/entities/Room').IRoom
		>{
			throw new Error('HierarchyService not getRoom')
		}
	})
}

const ModuleContext = React.createContext<Context>(defaultContexts);
const { Provider } = ModuleContext;

const ModuleProvider = ({children} : any) => {
	const [reducerState, dispatch] = React.useReducer(reducer , {...defaultContexts});

	React.useEffect(() => {
		dispatch({ type : Actions.INIT})
	},[])

	const {
		hierarchyService,
		itemService,
		roomService
	} = reducerState;

	return (
		<Provider value={{hierarchyService,itemService,roomService}}>
			{children}
		</Provider>
	);
};

export { ModuleContext };
export default ModuleProvider;

