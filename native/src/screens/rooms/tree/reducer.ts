import { IHierarchy } from '../../../modules/models/entities/Hierarchy';
import {State , SectionItem , ItemT} from './types';

export const INIT = 'INIT';
export const ADD_SECTION_ITEMS = 'ADD_SECTION_ITEMS'

interface ActionInit {
	type : 'INIT'
}

interface ActionAddSectionItems {
	type : 'ADD_SECTION_ITEMS',
	hierarchy : IHierarchy,
	add_sectionItems : ItemT[]
}

type Actions = ActionInit | ActionAddSectionItems;

const mergeSectionItems = (
    prev: SectionItem[],
    hierarchy: IHierarchy,
    addSectionItems: ItemT[]
): SectionItem[] => {
    let findHierarchySecItem = prev.find(
        (section) => section.domain.id === hierarchy.id
    );
    if (findHierarchySecItem == null) {
        findHierarchySecItem = {
            hierarchy,
            data: addSectionItems
        };
        prev.push(findHierarchySecItem);
    } else {
        findHierarchySecItem.data = [
            ...findHierarchySecItem.data,
            ...addSectionItems
        ];
    }
    findHierarchySecItem.data = findHierarchySecItem.data
        // groupは先頭に表示するため、order byを調整
        .map((i) => {
            return {
                ...i,
                order_by:
                    i.item_type === 'item' ? i.order_by + 10000 : i.order_by
            };
        })
        // 並び順
		.sort((a, b) => (a.order_by > b.order_by ? 1 : -1));
	console.log("findHierarchySecItem",findHierarchySecItem);
    return prev.sort((a, b) => {
        if (a.domain.order_by == null) return 0;
        if (b.domain.order_by == null) return 0;
        return a.domain.order_by > b.domain.order_by ? 1 : -1;
    });
};

export default (state : State ,action : Actions) => {
	switch(action.type) {
		case INIT:
			return {
				section_data : []
			}
		case ADD_SECTION_ITEMS:
			return {
				section_data : mergeSectionItems(
					state.section_data,
					action.hierarchy,
					action.add_sectionItems
				)
			}
	}
}