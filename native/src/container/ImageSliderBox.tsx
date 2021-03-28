import * as React from 'react';
import { SliderBox } from "react-native-image-slider-box";
import useCloudImage from '../modules/hooks/useCloudImage';
import SimpleIndicator from '../components/SimpleIndicator';
import {View , Dimensions} from 'react-native';

interface Props {
	uid : string,
	type : 'items' | 'rooms'
	img_refFromURLs? : string[]
}

export default (props : Props) => {
	const {uid,img_refFromURLs, type } = props;
	Dimensions.get('window').width; // Window width
	const cloudImage = useCloudImage(uid , type, img_refFromURLs);

	

	React.useEffect(() => {
		if(img_refFromURLs) {
			cloudImage.run();
		}
	},[]);
	

	if(cloudImage.images == undefined) {
		return(
			<View style={{flex : 1 , backgroundColor : "#red"}}>
				
			</View>
		);
	}

	return (
			<SliderBox
				images={cloudImage.images}
				// parentWidth={Dimensions.get('window').width}
				// sliderBoxHeight={250}
				dotColor="#7863D3"
				circleLoop
				inactiveDotColor="#90A4AE"
				/>
	);

}