import * as React from 'react';
import { Text , SafeAreaView} from 'react-native';
import {
	Content,
	List,
	ListItem,
	Button
} from 'native-base';
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
				<Text>{currentUser}</Text>
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