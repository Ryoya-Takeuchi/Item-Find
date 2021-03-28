import * as React from 'react';
import DatePicker from 'react-native-datepicker'

interface Props {
	selectDate : Date,
	onDateChange : (date : string) => void
	placeHolderText ? : string,
	textStyle? : string,
	disabled? : boolean
}

const defTextColor = '#E2E2E2';
const defPlaceHolderText = '購入日を選択してください。';

export default (props : Props) => {
	const {selectDate,onDateChange,placeHolderText=defPlaceHolderText,textStyle=defTextColor,disabled=false} = props;
	return (

		<DatePicker
		// defaultDate={new Date(2021,3,11)}
		// defaultDate={new Date(selectDate.getFullYear(),selectDate.getMonth()+1,selectDate.getDate())}
		// minimumDate={new Date(1900, 1, 1)}
		// maximumDate={new Date(2999, 12, 31)}
		// placeHolderText={placeHolderText}
		// locale={"en"}
		// timeZoneOffsetInMinutes={undefined}
		// modalTransparent={false}
		// placeHolderTextStyle={{ color: textStyle }}
		// animationType={"fade"}
		// textStyle={{ color: "green" }}
			date={`${selectDate.getFullYear()}-${(selectDate.getMonth()+1)}-${selectDate.getDate()}`}
			format="YYYY-MM-DD"
			minDate="1990-01-01"
			maxDate="2999-12-31"
			mode="date"
			confirmBtnText="確定"
			cancelBtnText="キャンセル"
            onDateChange={onDateChange}
            disabled={disabled}
			customStyles={{
				dateIcon: {
				  position: 'absolute',
				  left: 0,
				  top: 4,
				  marginLeft: 0
				},
				dateInput: {
				  marginLeft: 36,
				  borderColor : "#ffffff",
				}
				// ... You can check the source to find the other keys.
			  }}
            />
	);
}