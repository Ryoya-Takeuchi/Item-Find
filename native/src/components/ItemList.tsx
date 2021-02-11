import * as React from 'react';
import {
	ListItem,
	Left,
	Right,
	Text,
	Icon,
	Thumbnail,
	Body,
	Item
} from 'native-base';
import ImageThumbnail from '../container/ItemThumbnail';
import {ItemT} from '../screens/rooms/tree/types';

interface Props {
	onPress : () => void,
	data : {
		item_name : string
		uri : string,
		item : ItemT
	}
}

export default function ItemList(props : Props) {
	const {onPress , data} = props;
	return (
		<ListItem onPress={() => onPress()}>
			<Left>
				<ImageThumbnail
					display_name={data.item_name}
					type={data.item.item_type == 'room' ? 'rooms' : 'items'}
					uid={data.item.id}
					isImage={data.item.is_image}
					imageExetensions={data.item.image_exetensions}
					/>
			</Left>
			<Body>
				<Text>{data.item_name}</Text>
			</Body>
			<Right>
				<Icon type="Ionicons" name="ios-chevron-forward"/>
			</Right>
		</ListItem>

	);
}