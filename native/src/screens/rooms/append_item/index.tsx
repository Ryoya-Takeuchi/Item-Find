import * as React from 'react';
import { View } from 'react-native';
import {
	List,
	ListItem,
	Text,
	Input,
	Form,
	Item
} from 'native-base';
import styles from './styles';
import PickerSelect from '../../../components/PickerSelect';
import PhotoImage from '../../../components/PhotoImage';

export default () => {
	const [values , setValues] = React.useState();

	const items=[
		{ label: 'Football', value: 'football' },
		{ label: 'Baseball', value: 'baseball' },
		{ label: 'Hockey', value: 'hockey' },
		{ label: 'Hockey', value: 'hockey' },
	]

	

	return (
		<View style={styles.wrap_area}>
			<View style={styles.photo_area}>
				{items.map((values , index) => <PhotoImage photoNumber={index}/>)}
			</View>
			<View style={styles.form_area}>
				<Form>
					<List>
						<ListItem itemDivider>
							<Text>商品名</Text>
						</ListItem>
						<ListItem>
							<Item>
								<Input placeholder="例)　ハサミ , コップなど" />
							</Item>
						</ListItem>
						<ListItem itemDivider>
							<Text>商品所有者</Text>
						</ListItem>
						<ListItem>
							<PickerSelect items={items} setValue={setValues} />
						</ListItem>
						<ListItem itemDivider>
							<Text>商品購入費</Text>
						</ListItem>
						<ListItem>
							<Text>商品名</Text>
						</ListItem>
						<ListItem itemDivider>
							<Text>グループ選択</Text>
						</ListItem>
						<ListItem>
							<Text>商品名</Text>
						</ListItem>
						<ListItem itemDivider>
							<Text>購入先選択</Text>
						</ListItem>
						<ListItem>
							<Text>商品名</Text>
						</ListItem>
					</List>
				</Form>
			</View>

		</View>
	);
}