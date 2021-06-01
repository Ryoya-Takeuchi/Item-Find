import * as React from "react";
import { View, Text } from "react-native";
import { Thumbnail } from "native-base";
import useCloudImage, {
  refType,
  TFileExtension,
} from "../modules/hooks/useCloudImage";
import storage from "@react-native-firebase/storage";

interface Props {
  display_name: string;
  size?: "small" | "large";
  uid: string;
  type: refType;
  imgRefFromURLs?: string[];
}

export default (props: Props) => {
  const { display_name, size, uid, type, imgRefFromURLs } = props;
  const [image, setImage] = React.useState("");
  const cloudImage = useCloudImage(uid, type, imgRefFromURLs);

  React.useEffect(() => {
    if (imgRefFromURLs) {
      cloudImage.run();
    }
  }, []);

  if (imgRefFromURLs && cloudImage.state == "done") {
    return <Thumbnail source={{ uri: cloudImage.images[0] }} />;
  }

  const thumbnailSize = size == "small" ? 30 : 60;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: thumbnailSize,
        height: thumbnailSize,
        borderRadius: thumbnailSize / 2,
        backgroundColor: createColor(),
      }}
    />
  );
};

const createColor = (): string => {
  // 色は完全にランダム。
  const fontTypes = "abcdef0123456789";
  const length = 6;
  return `#${Array.from(Array(length))
    .map(() => fontTypes[Math.floor(Math.random() * fontTypes.length)])
    .join("")}`;
};
