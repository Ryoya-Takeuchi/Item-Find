import * as React from 'react';
import {
	ListItem,
	Left,
	Right,
	Text,
	Icon,
	Thumbnail,
	Body
} from 'native-base';
import ImageThumbnail from '../container/ItemThumbnail';

interface Props {
	onPress : () => void,
	data : {
		item_name : string
		uri : string
	}
}

export default function ItemList(props : Props) {
	const {onPress , data} = props;
	return (
		<ListItem onPress={() => onPress()}>
			<Left>
				<ImageThumbnail display_name={data.item_name} />
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