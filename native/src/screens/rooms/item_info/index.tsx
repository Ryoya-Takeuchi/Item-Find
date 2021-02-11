import * as React from 'react';
import { View , Text , SafeAreaView,TouchableHighlight} from 'react-native';
import {List , ListItem, Left, Body, Right} from 'native-base';
import * as moment from 'moment';
import { useNavigation } from 'react-navigation-hooks';
import * as utiles from '../../../modules/utiles';
import useCloudImage from '../../../modules/hooks/useCloudImage';
import {ModuleContext} from '../../../contexts/Module';
import SimpleIndicator from '../../../components/SimpleIndicator';
import ImageSliderBox from '../../../container/ImageSliderBox';
import {IItem} from '../../../modules/models/entities/Item';
import styles from './style';

export default () => {
	const navigation = useNavigation();
	const [item , setItem] = React.useState<IItem>(undefined);
	const hierarchyId: string = navigation.getParam('hierarchy_id')
	const roomName: string = navigation.getParam('room_name')
	const itemId: string = navigation.getParam('room_id')
	const {itemService , hierarchyService} = React.useContext(ModuleContext);
	
	React.useEffect(() => {
		async function fn() {
			const hierarchy = await hierarchyService.getHierarchy(hierarchyId);
			if(hierarchy == null) {

			}
			const items = await itemService.getAllItems(hierarchy);
			// fixed itemService.getItemがうまく挙動しない
			const item = items.find((item) => item.id === itemId);
			setItem(item);
		}
		fn();
	},[
		navigation,
		item,
		hierarchyId,
		itemId,
		roomName
	])


	const onPress = () => {
		utiles.openURL("com.amazon.mobile.shopping:///")
	}

	if (item == undefined) return <SimpleIndicator />

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<View style={styles.title_area}>
					<Text style={styles.title_font}>{item.item_name}</Text>
				</View>
				<View style={styles.image_area}>
					<ImageSliderBox
						uid={item.id}
						isImage={item.is_image}/>
				</View>
				<View style={styles.item_info_area}>
					<List>
						<ListItem>
							<Left>
								<Text>購入日 : </Text>
							</Left>
							<Body>
								<Text >{JSON.stringify(item.buy_date.toDate())}</Text>
							</Body>
							<Right/>
						</ListItem>
						<ListItem>
							<Left>
								<Text>購入先 : </Text>
							</Left>
							<Body>
								<TouchableHighlight style={styles.image_area}  onPress={() => {onPress()}}><Text>{item.buy_shop.label}</Text></TouchableHighlight>
							</Body>
							<Right/>
						</ListItem>
						<ListItem>
							<Left>
								<Text>所有者 : </Text>
							</Left>
							<Body>
								<TouchableHighlight style={styles.image_area} onPress={() => {onPress()}}><Text>妹</Text></TouchableHighlight>
							</Body>
							<Right/>
						</ListItem>
					</List>
				</View>
			</View>
		</SafeAreaView>
	);
}

