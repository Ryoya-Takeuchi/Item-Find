import * as React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Text, Button, Icon } from "native-base";

const window = Dimensions.get("window");

interface Props {
  isVisible: boolean;
  onPress: { item: () => void; room: () => void };
  close: () => void;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7863D3",
    width: window.width / 2,
    height: window.width / 4,
    marginBottom: 10,
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  cross_area: {
    width: window.width / 2,
    alignItems: "flex-end",
  },
});

export default (props: Props) => {
  const { isVisible, onPress, close } = props;

  return (
    <Modal isVisible={isVisible} backdropColor={"#FFFFFF"} style={styles.modal}>
      <View>
        <View style={styles.cross_area}>
          <TouchableOpacity onPress={() => close()}>
            <Icon type="Entypo" name="cross" style={{ color: "#CE6C6C" }} />
          </TouchableOpacity>
        </View>
        <View>
          <Button onPress={onPress.room} iconLeft style={styles.button}>
            <Icon type="FontAwesome5" name="door-open" />
            <Text>{`ルーム又は階層追加`}</Text>
			
          </Button>
        </View>
        <View>
          <Button onPress={onPress.item} iconLeft style={styles.button}>
            <Icon type="FontAwesome" name="bicycle" />
            <Text>購入品追加</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};
