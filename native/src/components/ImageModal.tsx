import * as React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	Image
} from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, Icon } from 'native-base';

const window = Dimensions.get("window");

interface Props {
	isVisible : boolean,
	uri : string,
	close : () => void
}

const styles = StyleSheet.create({
	modal : {
		alignItems : "center",
		justifyContent : "center"
	},
	cross_area : {
		width : window.width / 2,
		alignItems : "flex-end"
	},
	image_area : {
		flex : 1
	}
})

export default (props : Props) => {
	const {isVisible, uri,close} = props;

	return (
		<Modal isVisible={isVisible} backdropColor={"#FFFFFF"} style={styles.modal}>
			<View>
				<View style={styles.cross_area}>
					<TouchableHighlight onPress={() => close()}>
						<Icon type="Entypo" name="cross" style={{color : "#CE6C6C"}} />
					</TouchableHighlight>
				</View>
				<Image source={{uri : uri}} style={styles.image_area}/>
			</View>
	  </Modal>
	);
}