import * as React from 'react';
import {StyleSheet} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
	container : {
		flex : 1,
	},
	title_area : {
		flex : 0.5,
		backgroundColor : "#E2E2E2",
		justifyContent : "center"
	},
	title_font : {
		fontSize : scale(20)
	},
	image_area : {
		flex : 3,
	},
	item_info_area : {
		flex : 4
	},
	text_align : {
		alignItems : "center"
	}

})

export default styles;