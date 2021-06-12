import * as React from "react";
import { Button, Text } from "native-base";
import { NavigationRouteConfigMap } from "react-navigation";
import { NavigationStackScreenProps } from "react-navigation-stack";
import * as Screens from "../Screens";

// screens
import RoomTree from "../../screens/rooms/tree";
import AppendRoom from "../..//screens/rooms/append_room";
import AppendItem from "../../screens/rooms/append_item";
import ItemInfo from "../../screens/rooms/item_info";
import CloudRegister from "../../screens/rooms/cloud_register";
import CloudUpdater from "../../screens/rooms/cloud_update";

const headerStyle = {
  backgroundColor: "#7863D3",
};
const headerTintColor = "#F5F5F5";

/**
 * room tree container
 */
const roomTreeContainer: NavigationRouteConfigMap<any, any> = {};

const buttonComp = (text: string, onPress: () => void) => (
  <Button transparent onPress={onPress}>
    <Text style={{ color: headerTintColor }}>{text}</Text>
  </Button>
);

interface treeUpNavigationOptionsParams {
  onTreeUp: () => void;
  isTreeUp: boolean;
}

roomTreeContainer[Screens.ROOM_TREE] = {
  screen: RoomTree,
  navigationOptions: ({
    navigation,
  }: NavigationStackScreenProps<treeUpNavigationOptionsParams>) => ({
    title: "竹内家",
    defaultNavigationOptions: {
      group_id: "root",
    },
    // headerRight: buttonComp(
    //   navigation.state.params.isTreeUp ? "閲覧" : "更新",
    //   () => navigation.state.params.onTreeUp()
    // ),
    headerStyle,
    headerTintColor,
  }),
};

interface roomChildrenNavigationOptionsParams {
  room_name: string;
  room_id: string;
}

roomTreeContainer[Screens.ROOM_CHILD_TREE] = {
  screen: RoomTree,
  navigationOptions: ({
    navigation,
  }: NavigationStackScreenProps<roomChildrenNavigationOptionsParams>) => ({
    title: navigation.state.params
      ? navigation.state.params.room_name
      : "ルーム配下",
    headerStyle,
    headerTintColor,
  }),
};

roomTreeContainer[Screens.ROOM_ITEM_INFO] = {
  screen: ItemInfo,
  navigationOptions: () => ({
    title: "",
    headerStyle,
    headerTintColor,
  }),
};

roomTreeContainer[Screens.APPEND_ROOM] = {
  screen: AppendRoom,
  navigationOptions: () => ({
    title: "新規登録(ルーム)",
    headerStyle,
    headerTintColor,
  }),
};

roomTreeContainer[Screens.APPEND_ITEM] = {
  screen: AppendItem,
  navigationOptions: () => ({
    title: "新規登録(商品)",
    headerStyle,
    headerTintColor,
  }),
};

roomTreeContainer[Screens.CLOUD_REGISTER] = {
  screen: CloudRegister,
  navigationOptions: () => ({
    title: "新規登録",
    headerStyle,
    headerTintColor,
  }),
};

roomTreeContainer[Screens.CLOUD_UPDATER] = {
  screen: CloudUpdater,
  navigationOptions: () => ({
    title: "更新処理",
    headerStyle,
    headerTintColor,
  }),
};

export default roomTreeContainer;
