import * as React from 'react';
import { SliderBox } from "react-native-image-slider-box";
import useCloudImage from '../modules/hooks/useCloudImage';
import SimpleIndicator from '../components/SimpleIndicator';
import {View , Dimensions} from 'react-native';

interface Props {
	uid : string,
	isImage? : boolean
}

export default (props : Props) => {
	const {uid, isImage=false } = props;
	Dimensions.get('window').width; // Window width
	const cloudImage = useCloudImage(uid , 'items');

	React.useEffect(() => {
		if(isImage) {
			cloudImage.run();
		}
	},[uid]);
	

	if(cloudImage.images == undefined) {
		return(
			<View style={{flex : 1 , backgroundColor : "#eee"}}>

			</View>
		);
	}

	console.log("not undefined",cloudImage.images);

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

	// return (
	// 	<SliderBox images={cloudImage.images} />
	// );

}