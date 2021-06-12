import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableHighlight,
} from "react-native";
import useTakePhoto from "../modules/hooks/useTakePhoto";
import storage from "@react-native-firebase/storage";
import { Icon } from "native-base";

const window = Dimensions.get("window");
const imageWidth = window.width / 8;
const imageNumberWidth = window.width / 25;

const styles = StyleSheet.create({
  container: {
    width: imageWidth,
    height: imageWidth,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#ffffff",
  },
  photoNumber: {
    width: imageNumberWidth,
    height: imageNumberWidth,
    backgroundColor: "#E2E2E2",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  shadow: {
    shadowColor: "#ccc",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  photo_number_text: {
    color: "#ffffff",
  },
  image_style: {
    width: imageWidth,
    height: imageWidth,
  },
  image_unset: {
    position: "absolute",
    top: -10,
    right: -10,
    width: imageNumberWidth,
    height: imageNumberWidth,
    borderRadius: imageNumberWidth,
    zIndex: 1,
    backgroundColor: "#CE6C6C",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Props {
  photoNumber?: number;
  cloudImageUrl: string | undefined;
  setValue: (index: number, imageUrl: string) => void;
  index: number;
  imageUnSet: (index?) => void;
}

export default function (props: Props) {
  const { photoNumber, cloudImageUrl, setValue, index, imageUnSet } = props;
  const [storageUrl, setStorageUrl] = React.useState(undefined);
  const { imgModeSelectModal, imgModeSelectOpen } = useTakePhoto(
    index,
    setValue
  );

  const PhotoFrame = ({ children }: { children: JSX.Element }): JSX.Element => {
    return (
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.photoNumber}>
          <Text style={styles.photo_number_text}>{photoNumber}</Text>
        </View>
        <View
          style={{
            width: window.width / 10,
            height: window.width / 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </View>
        {imgModeSelectModal()}
        {cloudImageUrl && (
          <View style={styles.image_unset}>
            <Icon
              onPress={() => {
                imageUnSet(index);
              }}
              type="AntDesign"
              name="close"
              style={{ fontSize: window.width / 25, color: "#ffffff" }}
            />
          </View>
        )}
      </View>
    );
  };

  const firebaseStorageCheck = (imageUrl: string) => {
    return /^gs:\/\/.*/.test(imageUrl);
  };

  React.useEffect(() => {
    if (!firebaseStorageCheck(cloudImageUrl)) {
      return setStorageUrl(cloudImageUrl);
    }
    try {
      const run = async () => {
        const ref = storage().refFromURL(cloudImageUrl);
        const storageUrl = await ref.getDownloadURL();
        return setStorageUrl(storageUrl);
      };
      run();
    } catch (error) {
      console.log("error", error);
    }
  }, [cloudImageUrl]);

  if (!cloudImageUrl || !storageUrl) {
    return (
      <PhotoFrame>
        <Icon
          onPress={() => {
            imgModeSelectOpen();
          }}
          type="AntDesign"
          name="camera"
          style={{ fontSize: window.width / 20, color: "#E2E2E2" }}
        />
      </PhotoFrame>
    );
  }

  return (
    <PhotoFrame>
      <TouchableHighlight onPress={imgModeSelectOpen}>
        <Image
          style={styles.image_style}
          source={{
            uri: storageUrl,
          }}
        />
      </TouchableHighlight>
    </PhotoFrame>
  );
}
