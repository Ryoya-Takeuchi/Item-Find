import {StyleSheet} from 'react-native';


const styles =  StyleSheet.create({
	wrap_area : {
		flex : 1,
	},
	photo_area : {
		flex : 1,
		backgroundColor : "#E2E2E2",
		flexDirection : "row",
		alignItems : 'center',
		justifyContent : 'space-around',
	},
	form_area : {
		flex : 5,
		backgroundColor : "#ffffff"
	},
	button_area : {
		justifyContent : 'space-around'
	},
	button_reset_color : {
		backgroundColor : '#DB5A5A'
	},
	button_success_color : {
		backgroundColor : '#7863D3'
	},
	text_error : {
		color : '#DB5A5A'
	}
})

export default styles;