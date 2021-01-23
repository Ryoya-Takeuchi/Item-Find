import * as React from 'react';
import {
	SafeAreaView,
	View,
	Text,
	SectionList,
	StyleSheet,
	TouchableHighlight
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import {
	Container,
	Fab,
	Icon
} from 'native-base'

import ItemList from '../../../components/ItemList' 
import * as Screens from '../../../navigations/Screens';
import SimpleIndicator from '../../../components/SimpleIndicator';

export default () => {
	const uri = "https://source.unsplash.com/1024x768/?nature";
	const navigation = useNavigation();
	const roomId: string = navigation.getParam('room_id')
        ? navigation.getParam('room_id')
		: 'root';
	console.log("roomId",roomId);


const DATA = [
	{
		title: "１階",
		data: ["リビング", "玄関", "トイレ"]
	},
	{
		title: "２階",
		data: ["子供部屋", "パパの部屋", "ウォークインクローゼット","キッチン"]
	},
	{
		title: "３階",
		data: ["寝室", "屋根裏部屋", "ベランダ"]
	},
	{
		title: "4階",
		data: ["ハサミ", "コップ", "ペン"]
	},
  ];


  function Item({ title }){
	
	const onPress = () => {
		navigation.navigate({
			routeName : Screens.ROOM_ITEM_INFO,
			params : {
				display_name : title
			}
		})
	}
	const data= {
		uri : uri,
		item_name : title
	}
	  
	return(
		<ItemList data={data} onPress={onPress}/>
  )
};

const List = () => {

	return (
		<SectionList
				sections={DATA}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item }) => <Item title={item} />}
				renderSectionHeader={({ section: { title } }) => (
						<Text style={styles.header}>{title}</Text>
				)}
			/>
	);
}

	return (
		<Container>
			{DATA.length === 0 ? <SimpleIndicator /> :  <List/>}
			<Fab
                position="bottomRight"
                onPress={() => {
                    navigation.navigate({
                        routeName: Screens.APPEND_ITEM,
                        key: 'append_item'
                    });
                }}
            >
                <Icon
                    type="MaterialCommunityIcons"
                    name="account-search-outline"
                />
            </Fab>
		</Container>
	);
}


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  marginHorizontal: 16
	},
	item: {
	  padding: 20,
	  flex : 1,
	  flexDirection : 'row',
	  alignItems : 'center',
	  backgroundColor : "#ffffff",
	},
	header: {
	  fontSize: 32,
	  backgroundColor : "#cccccc"
	},
	title: {
	  fontSize: 24
	}
  });