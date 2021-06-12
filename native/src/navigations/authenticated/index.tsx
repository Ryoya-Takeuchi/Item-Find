import * as React from "react";
import { Icon } from "native-base";
import {
  NavigationRouteConfigMap,
  createSwitchNavigator,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as Screens from "../Screens";
import roomTreeContainer from "./room_tree";
import settingContainer from "./setting";

const headerStyle = {
  backgroundColor: "#7863D3",
};
const headerTintColor = "#F5F5F5";

const bottomTabConfigMap: NavigationRouteConfigMap<any, any> = {};
bottomTabConfigMap[Screens.ROOM_TREE_CONTAINER] = {
  screen: createStackNavigator(roomTreeContainer, {
    initialRouteName: Screens.ROOM_TREE,
  }),
  navigationOptions: ({ navigation }) => ({
    title: "ルーム",
    tabBarIcon: ({ tintColor }: { tintColor: string }) => {
      return (
        <Icon
          type="FontAwesome5"
          name="door-open"
          style={{ color: tintColor }}
        />
      );
    },
    headerStyle,
    headerTintColor,
  }),
};

bottomTabConfigMap[Screens.SETTING_CONTAINER] = {
  screen: createStackNavigator(settingContainer, {
    initialRouteName: Screens.SETTING,
  }),
  navigationOptions: () => ({
    title: "設定",
    tabBarIcon: ({ tintColor }: { tintColor: string }) => {
      return (
        <Icon type="Ionicons" name="settings" style={{ color: tintColor }} />
      );
    },
    headerStyle,
    headerTintColor,
  }),
};

const AuthenticatedNavigation = createBottomTabNavigator(bottomTabConfigMap, {
  initialRouteName: Screens.ROOM_TREE_CONTAINER,
});

export default AuthenticatedNavigation;
