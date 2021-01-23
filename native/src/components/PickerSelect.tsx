import * as React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';
import {Icon} from 'native-base';

interface item {
	label : string,
	value : string
}

interface Props {
	items : item[],
	setValue  : (value) => void
}5

export default function PickerSelect(props : Props) {
	const {items , setValue} = props

	return (
		<RNPickerSelect
            onValueChange={(value) => setValue(value)}
			items={items}
			placeholder={{ label: '選択してください', value: '' }}
			style={pickerSelectStyles}
			Icon={() => <Icon name="chevron-down" color="gray" />}
         />
	);
}

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
	  borderColor: '#8E8C8C',
	  marginLeft: 20,
	  marginRight: 30,
	  marginBottom: 10,
	  padding: 5,
	  paddingRight: 20,
	},
  });