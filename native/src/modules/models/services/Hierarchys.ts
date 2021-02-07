import { IHierarchy } from '../entities/Hierarchy';

export interface HierarchysService {
	getHierarchys() : Promise<IHierarchy[]>;
	getHierarchy(hierarchyId : string) : Promise<IHierarchy>
}