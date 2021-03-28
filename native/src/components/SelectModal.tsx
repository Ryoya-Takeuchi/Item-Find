import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { Text, Button, Icon } from "native-base";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const window = Dimensions.get("window");

interface Props {
  isVisible: boolean;
  close: () => void;
  title?: string;
  children: JSX.Element;
  size: "hight" | "low";
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
    // position : 'relative',
    // flexDirection : 'column'
  },
  cross_area: {
    // flex : 0.25,
    flexDirection: "column",
  },
  header: {
    flex: 0.1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#7863D3",
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title_text: {
    color: "#e2e2e2",
    fontSize: RFValue(15),
    fontWeight: "bold",
    height: 100,
  },
  contents: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 20,
  },
});

export default (props: Props) => {
  const { isVisible, close, title = "写真選択", children, size = "" } = props;
  const modalSize = size == "low" ? 0.25 : 0.5;

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={"#000"}
      style={styles.modal}
      scrollHorizontal={true}
      coverScreen={true}
      onBackdropPress={close}
    >
      <View style={[styles.cross_area, { flex: modalSize }]}>
        <View style={styles.header}>
          <Text style={styles.title_text}>{title != "" ? title : null}</Text>
          <Text onPress={close} style={styles.title_text}>
            閉じる
          </Text>
        </View>
        <View style={styles.contents}>{children}</View>
      </View>
    </Modal>
  );
};
