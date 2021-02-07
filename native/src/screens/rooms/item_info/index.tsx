import * as React from 'react';
import { View , Text , SafeAreaView,TouchableHighlight} from 'react-native';
import {List , ListItem, Left, Body, Right} from 'native-base';
import { useNavigation } from 'react-navigation-hooks';
import { SliderBox } from "react-native-image-slider-box";
import * as utiles from '../../../modules/utiles';
import styles from './style';

export default () => {
	const navigation = useNavigation();
	const roomName: string = navigation.getParam('display_name')
	const images = [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree"
      ]

	const onPress = () => {
		utiles.openURL("googlegmail:///")
	}
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<View style={styles.title_area}>
					<Text style={styles.title_font}>{roomName}</Text>
				</View>
				<View style={styles.image_area}>
					<SliderBox images={images} />
				</View>
				<View style={styles.item_info_area}>
					<List>
						<ListItem>
							<Left>
								<Text>購入日 : </Text>
							</Left>
							<Body>
								<Text >2021 / 01 / 21</Text>
							</Body>
							<Right/>
						</ListItem>
						<ListItem>
							<Left>
								<Text>購入先 : </Text>
							</Left>
							<Body>
								<TouchableHighlight style={styles.image_area}  onPress={onPress}><Text>amazon</Text></TouchableHighlight>
							</Body>
							<Right/>
						</ListItem>
						<ListItem>
							<Left>
								<Text>所有者 : </Text>
							</Left>
							<Body>
								<TouchableHighlight style={styles.image_area} onPress={onPress}><Text>妹</Text></TouchableHighlight>
							</Body>
							<Right/>
						</ListItem>
					</List>
				</View>
			</View>
		</SafeAreaView>
	);
}

