import * as React from 'react';
import { View , SafeAreaView,Dimensions} from 'react-native';
import {
	List,
	ListItem,
	Text,
	Input,
	Form,
	Item,
	Icon
} from 'native-base';
import styles from './styles';

const window = Dimensions.get('window');

export default () => {

	return (
		<View style={styles.wrap_area}>
			<View style={styles.photo_area}>
				<Icon type="AntDesign" name="camera" style={{fontSize : window.width / 3, color: '#E2E2E2'}}/>
			</View>
			<View style={styles.form_area}>
				<Form>
					<List>
						<ListItem itemDivider>
							<Text>ルーム名又は階層名</Text>
						</ListItem>
						<ListItem>
							<Item>
								<Input placeholder="例)　リビング , キッチン など" />
							</Item>
						</ListItem>
						<ListItem itemDivider>
							<Text>階数選択　</Text>
						</ListItem>
						<ListItem>
							
						</ListItem>
						<ListItem itemDivider>
							<Text>ルーム選択</Text>
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