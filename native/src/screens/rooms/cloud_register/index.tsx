import * as React from 'react';
import {Text} from 'react-native';
import SimpleIndicator from '../../../components/SimpleIndicator';
import { useNavigation } from 'react-navigation-hooks';
import useCloudRegister from '../../../modules/hooks/useCloudRegister';
import useCIUploader from '../../../modules/hooks/useCIUploader';
import {familyCode} from '../../../modules/firebase/app';
import useRooms from '../../../modules/hooks/useRoomList';
import {IItem} from '../../../modules/models/entities/Item';
import {IRoom} from '../../../modules/models/entities/Room';


export default () => {
	const { getParam,goBack } = useNavigation();
	const registerType = getParam('type') as 'items' | 'rooms';
	const registerValue = getParam('values') as IItem | IRoom;
	const {itemRegister} = useCloudRegister(familyCode);
	const {imgUpload} = useCIUploader(familyCode,registerType);
	const { setRooms, roomList, status } = useRooms(familyCode);

	React.useEffect(() => {
		const fn = async() => {
			console.log(registerValue.room_ids[0]);
			setRooms(registerValue.room_ids[0]);
		}
		fn();
	},[])

	// ユーザ定義タイプガード
	function implementsIItem(arg: any): arg is IItem {
		return arg !== null &&
		typeof arg === "object" &&
		typeof arg.money === "string"
	}
	
	React.useEffect(() => {
		if(status == 'done') {
			const logic = async() => {
				switch(registerType) {
					case 'items':
						// FIXIM ブサイク直したい (タイプガードはうまくいってるな!!)
						if (implementsIItem(registerValue)) {
							const registerResult = await itemRegister(roomList[0].historyId,registerValue);
							if(registerResult instanceof Error)  {
								console.log("error")
								return goBack();
							}
							const localImgPaths = registerValue.image_exetensions.filter((uri) => uri != null)
							imgUpload (localImgPaths,registerResult.itemID);
						}else {
						}
						goBack();
						break;
					case 'rooms':
						 break;
					default :
						goBack();
				}
			}
			logic();
		}
	},[status, roomList])

	
	
	return (
		<SimpleIndicator>
			<Text>データを登録中...</Text>
		</SimpleIndicator>
	);
	
}