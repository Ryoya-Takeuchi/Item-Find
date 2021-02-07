import { HierarchysService } from '../../Hierarchys';
import HierarchyServiceFromServer from '../from_server/server_hierarchy';

export default class HierarchyServiceFromServerOrCache implements HierarchysService {
	constructor(
		private hierarchyService : HierarchyServiceFromServer
	) {}

	async getHierarchy(hierarchyId : string) {
		const fromServer = await this.hierarchyService.getHierarchy(hierarchyId);
		return fromServer;
	}

	async getHierarchys() {
		const fromServer = await this.hierarchyService.getHierarchys();
		return fromServer;
	}
}

