import * as React from "react";
import {
  ListItem,
  Content,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Text,
} from "native-base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Modal from "../../components/SelectModal";

export default function useTakePhoto(index : number , callback : (index : number , imageUri : string) => void ) {
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const imgModeSelectModal = () => {
    return (
      <Modal
        isVisible={isModal}
        close={() => setIsModal(false)}
        title="写真選択"
		size='low'
      >
        <Content>
          <ListItem icon onPress={playCamera}>
            <Left>
              <Button style={{ backgroundColor: "#7863D3" }}>
                <Icon active name="camera" />
              </Button>
            </Left>
            <Body>
              <Text>カメラ</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={showImageLibrary}>
            <Left>
              <Button style={{ backgroundColor: "#7863D3" }}>
                <Icon active type="AntDesign" name="jpgfile1" />
              </Button>
            </Left>
            <Body>
              <Text>ライブラリー</Text>
            </Body>
          </ListItem>
        </Content>
      </Modal>
    );
  };
  const showImageLibrary = React.useCallback(() => {
    const libraryOptions = {
      mediaType: 'photo',
	  includeBase64 : true,
	  quality : 0
    };

    launchImageLibrary(libraryOptions as any, (response) => {
		console.log(response);
		if(response.didCancel) {
			imgModeSelectClose()
		}else {
			imgModeSelectClose()
			console.log(`data:${response.type};base64,${response.base64}`);
			console.log(response);
			// callback(index , `data:${response.type};base64,${response.base64}`)
			callback(index , response.uri)
		}
    });
  }, []);
  
  const playCamera = React.useCallback(() => {
    const libraryOptions = {
      mediaType: 'photo',
	  includeBase64 : true,
	  saveToPhotos : true,
	  quality : 1
    };

    launchCamera(libraryOptions as any, (response) => {
		if(response.didCancel) {
			imgModeSelectClose()
		}else {
			imgModeSelectClose()
			callback(index , `data:${response.type};base64,${response.base64}`)
		}
    });
  }, []);
  
  const imgModeSelectClose =  () => {
	setIsModal(false);
  }
  return {
    showImageLibrary,
    imgModeSelectOpen: () => {
      setIsModal(true);
    },
    imgModeSelectClose,
    imgModeSelectModal,
  };
}
