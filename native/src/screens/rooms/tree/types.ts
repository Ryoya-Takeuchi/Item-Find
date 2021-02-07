import { SectionListRenderItemInfo, SectionListData } from 'react-native';
import { IHierarchy } from '../../../modules/models/entities/Hierarchy';
import { IItem } from '../../../modules/models/entities/Item'
import { IRoom } from '../../../modules/models/entities/Room'

namespace ItemType {
	export const ITEM = 'item';
	export const ROOM = 'room';
}

export interface IItemOfITemType extends IItem {
	item_type : 'item'
}

export interface IRoomOfITemType extends IRoom {
	item_type : 'room'
}

export type ItemT  = IItemOfITemType | IRoomOfITemType;

export const isIItemOfItemType = (
	info : SectionListRenderItemInfo<ItemT>
) : info is SectionListRenderItemInfo<IItemOfITemType> => info.item.item_type === ItemType.ITEM
export const toIItemOfItemType = (item : IItem ) : IItemOfITemType => ({...item,item_type : 'item'});
export const toIItemOItemTypes = (items : IItem[]) : IItemOfITemType[] => {
	return items.map(item => toIItemOfItemType(item));
};
export const isIRoomOfItemType = (
	info : SectionListRenderItemInfo<ItemT>
) :  info is SectionListRenderItemInfo<IRoomOfITemType> => info.item.item_type === ItemType.ROOM;
export const toIRoomOfItemType = (room : IRoom) : IRoomOfITemType => ({...room,item_type : 'room'});
export const toIRoomOfItemTypes = (rooms : IRoom[]) : IRoomOfITemType[] => {
	return rooms.map(room => toIRoomOfItemType(room))
}

export interface SectionItem extends SectionListData<ItemT> {
	hierarchy : IHierarchy
}

export interface State {
	section_data: SectionItem[];
}