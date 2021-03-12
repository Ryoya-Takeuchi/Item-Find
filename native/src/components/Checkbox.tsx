import * as React from 'react';
import {View,Text,Dimensions} from 'react-native';
import {CheckBox} from 'native-base';

interface Props {
	setToggleCheckBox : (bool : boolean , type : string ) =>void,
	type : string,
	label : string,
	isCheck : boolean
}

const windows = Dimensions.get('window')

export default function Checkbox(props : Props) {
	const { setToggleCheckBox,type,label,isCheck} = props;

	return (
		<View style={{flexDirection : 'row', alignItems : 'center'}}>
			<View style={{width : windows.width / 10}}>
				<CheckBox
					disabled={false}
					checked={isCheck}
					onPress={() => setToggleCheckBox(isCheck,type)}
					color={'#7863D3'}
				/>
			</View>
			<View>
				<Text>{label}</Text>
			</View>
		</View>
	)

}