import FromServer from './from_server';
import { HierarchysService } from '../../Hierarchys';
import { IHierarchy , isHierarchy} from '../../../entities/Hierarchy';

export default class HierarchyServiceFromServer extends FromServer implements HierarchysService {
	public constructor(familyCode : string) {
		super(familyCode);
	}

	async getHierarchys() {
		const query = super.hierarchyQuery();
		const hierarchy = await super.getServerQuery<IHierarchy>(query);
		return hierarchy;
	}

	async getHierarchy(hierarchyId : string) {
		const doc = super.hierarchyRef().doc(hierarchyId).get();
		const data = (await doc).data();
		if(isHierarchy(data)) { return data }
		return undefined
	}
}