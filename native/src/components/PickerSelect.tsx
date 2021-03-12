import * as React from 'react';
import { Icon, Picker } from "native-base";

interface item {
	label : string,
	value : string
}

interface Props {
	items : item[],
	onChange?  : (value, type) => void,
	value? : string,
	placeholder? : string,
	type : string
}

export default function PickerSelect(props : Props) {
	const {items , onChange , value , placeholder, type} = props

	return (
		<Picker
			mode="dropdown"
			iosHeader="所有者選択"
			iosIcon={<Icon name="chevron-down" />}
			placeholder={placeholder}
			selectedValue={value}
			onValueChange={(value) => onChange(value,type)}
		>
			{items.map((item) => <Picker.Item label={item.label} value={item.value} />)}
		</Picker>
		);
}