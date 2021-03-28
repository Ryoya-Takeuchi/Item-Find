import * as React from 'react';
import { Icon, Picker } from "native-base";
import MultiSelect,{MultiSelectProps} from 'react-native-multiple-select';

interface item {
	id : string
	name : string
}

type pickMultiSelectProps = Pick<MultiSelectProps , 'items' | 'onSelectedItemsChange' | 'uniqueKey'>

interface Props extends  pickMultiSelectProps{
	items : item[],
	onChange?  : (value) => void,
	value? : string,
	placeholder? : string,
	
}

export default function MultipleSelect(props : Props) {
	const {items , onChange , value , placeholder , onSelectedItemsChange , uniqueKey} = props
	return (
		<MultiSelect
		hideTags
		items={items}
		uniqueKey={uniqueKey}
		onSelectedItemsChange={onSelectedItemsChange}
		// selectedItems={selectedItems}
		selectText="Pick Items"
		searchInputPlaceholderText="Search Items..."
		onChangeInput={ (text)=> console.log(text)}
		altFontFamily="ProximaNova-Light"
		tagRemoveIconColor="#CCC"
		tagBorderColor="#CCC"
		tagTextColor="#CCC"
		selectedItemTextColor="#CCC"
		selectedItemIconColor="#CCC"
		itemTextColor="#000"
		displayKey="name"
		searchInputStyle={{ color: '#CCC' }}
		submitButtonColor="#CCC"
		submitButtonText="Submit"
	  />
		);
}