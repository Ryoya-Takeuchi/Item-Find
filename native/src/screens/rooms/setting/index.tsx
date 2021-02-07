import * as React from 'react';
import { Text , SafeAreaView} from 'react-native';
import {
	Content,
	List,
	ListItem,
	Button
} from 'native-base';
import ItemThumbnail from '../../../container/ItemThumbnail';
import {AuthContext} from '../../../contexts/Auth'
import {styles} from './styles'; 


export default () => {
	const {singnout , currentUser} = React.useContext(AuthContext)

	return (
		<List>
			<ListItem itemDivider style={styles.itemDivider}>
				<Text>ユーザ情報</Text>
			</ListItem>
			<ListItem>
				<ItemThumbnail display_name={''} />
				<Text style={styles.current_user_font}>{'田中　太郎'}</Text>
			</ListItem>
			<ListItem itemDivider style={styles.itemDivider}>
				<Text>家族名</Text>
			</ListItem>
			<ListItem>
				<Text>{'田中家'}</Text>
			</ListItem>
			<ListItem itemDivider style={styles.itemDivider}>
				<Text>サインアウト</Text>
			</ListItem>
			<ListItem>
				<Button onPress={singnout} transparent>
					<Text style={styles.singnout_button}>サインアウト</Text>
				</Button>
			</ListItem>
		</List>
	);
}