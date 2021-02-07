import * as React from 'react';
import { View, Text } from 'react-native';
import { Thumbnail } from 'native-base';

interface Props {
	display_name : string,
	imageUri? : string,
	size? : 'small' | 'large',
}

export default (props : Props) => {
	const {display_name , imageUri, size } = props;

	if(imageUri) {
		return (
			<Thumbnail small source={{uri: imageUri}}/>
		);
	};
	
	const thumbnailSize = size == 'small' ? 30 : 60;
	
	return (
		<View style={{
			justifyContent : "center",
			alignItems : "center",
			width : thumbnailSize,
			height : thumbnailSize,
			borderRadius : thumbnailSize / 2,
			backgroundColor : createColor()
			
		}}>
			{/* <Text>{display_name}</Text> */}
		</View>
	);

}

const createColor =  () : string => {
	// 色は完全にランダム。
	const fontTypes="abcdef0123456789"
	const length=6;
	return `#${Array.from(Array(length)).map(()=>fontTypes[Math.floor(Math.random()*fontTypes.length)]).join('')}`;
}