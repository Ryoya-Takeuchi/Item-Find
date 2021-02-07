import * as React from 'react';
import {
	View,
	StyleSheet,
	Text,
	Dimensions
} from 'react-native';

import { Icon } from 'native-base';
const window = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex : 1,
        justifyContent: 'center',
		alignItems: 'center',
		position : "relative",
		backgroundColor : "#ffffff",
		margin : window.width /15,
	},
	photoNumber : {
		width :  "30%",
		height : "30%",
		backgroundColor : "#E2E2E2",
		alignItems : "center",
		justifyContent : "center",
		position : "absolute",
		top : 0,
		left : 0,
	},
	shadow : {
		shadowColor: "#ccc",
		shadowOffset: {
		width: 5,
		height: 2,
		},
		shadowRadius: 5,
		shadowOpacity: 1,
	},
	photo_number_text : {
		color : "#ffffff"
	}
});

interface Props {
	photoNumber : number,
}

export default function (props : Props) {
	const {photoNumber} = props;
    return (
        <View style={[styles.container, styles.shadow]}>
			<View style={styles.photoNumber}>
				<Text style={styles.photo_number_text}>{photoNumber}</Text>
			</View>
			<Icon type="AntDesign" name="camera" style={{fontSize: window.width / 20, color: '#E2E2E2'}}/>
        </View>
    );
}
