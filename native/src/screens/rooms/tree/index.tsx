import * as React from "react";
import {
  StyleSheet,
  SectionList,
  SectionListRenderItem,
  SectionListRenderItemInfo,
} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { Container, Fab, Icon, ListItem, Button, Text } from "native-base";
import { ModuleContext } from "../../../contexts/Module";
import { treeUpContext } from "../../../contexts/treeUp";
import ItemList from "../../../components/ItemList";
import * as Screens from "../../../navigations/Screens";
import SimpleIndicator from "../../../components/SimpleIndicator";
import Modal from "../../../components/Modal";
import reducer, { INIT, ADD_SECTION_ITEMS } from "./reducer";
import { IItemOfITemType, IRoomOfITemType, State } from "./types";
import {
  toIRoomOfItemTypes,
  toIItemOItemTypes,
  ItemT,
  isIItemOfItemType,
  isIRoomOfItemType,
  SectionItem,
} from "./types";
const initState: State = {
  section_data: [],
};

export default () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isActive, setActive] = React.useState(false);
  const { isTreeUp, onTreeUp } = React.useContext(treeUpContext);
  const { hierarchyService, itemService, roomService } = React.useContext(
    ModuleContext
  );
  const uri = "https://source.unsplash.com/1024x768/?nature";
  const [state, dispatch] = React.useReducer(reducer, initState);
  const navigation = useNavigation();
  const toggleVisible = React.useCallback(() => {
    setIsVisible((bool) => !bool);
  }, [isVisible]);
  const appendOnPress = {
    item: () => {
      navigation.navigate({
        routeName: Screens.APPEND_ITEM,
        key: "append_item",
        params: {
          title: "新規登録(商品)",
          type: "item",
        },
      });
      setIsVisible((bool) => !bool);
    },
    room: () => {
      navigation.navigate({
        routeName: Screens.APPEND_ROOM,
        key: "append_room",
        params: {
          title: "新規登録(ルーム)",
        },
      });
      setIsVisible((bool) => !bool);
    },
  };

  const CustomFab = React.useMemo(() => {
    // FIXE カラーリング適当
    return (
      <Fab
        active={isVisible}
        direction="up"
        position="bottomRight"
        onPress={toggleVisible}
        style={{ backgroundColor: "#7863D3" }}
      >
        <Icon type="AntDesign" name="ellipsis1" />
        <Button style={{ backgroundColor: "#449933" }}>
          <Icon type="AntDesign" name="plus" />
        </Button>
        <Button
          onPress={() => onTreeUp()}
          style={{ backgroundColor: "#ffaa22" }}
        >
          <Icon type="AntDesign" name="form" />
        </Button>
        <Button
          onPress={() => {
            setActive((bool) => !bool);
          }}
        >
          <Icon type="Feather" name="search" />
        </Button>
      </Fab>
    );
  }, [isVisible]);

  const roomId: string = navigation.getParam("room_id")
    ? navigation.getParam("room_id")
    : "root";

  React.useEffect(() => {
    dispatch({ type: INIT });
    const fn = async () => {
      if (roomId === "root") {
        const hierarchys = await hierarchyService.getHierarchys();
        if (hierarchys == undefined) {
          return;
        }
        hierarchys.forEach(async (hierarchy) => {
          const rootRooms = await roomService.getFindRootRooms(hierarchy);
          dispatch({
            type: ADD_SECTION_ITEMS,
            hierarchy,
            add_sectionItems: toIRoomOfItemTypes(rootRooms),
          });
        });
      } else {
        const hierarchyId: string = navigation.getParam("hierarchy_id");
        const hierarchy = await hierarchyService.getHierarchy(hierarchyId);
        const room = await roomService.getRoom(hierarchy, roomId);
        const childRooms = await roomService.getChildRooms(hierarchy, room);
        const items = await itemService.getAllItems(hierarchy);
        dispatch({
          type: ADD_SECTION_ITEMS,
          hierarchy,
          add_sectionItems: [
            ...toIRoomOfItemTypes(childRooms),
            ...toIItemOItemTypes(items),
          ],
        });
      }
    };
    fn();
  }, [navigation.state.key]);

  const renderRoom = (
    info: SectionListRenderItemInfo<IRoomOfITemType>
  ): React.ReactElement => {
    const { index, item } = info;
    const onPress = () => {
      if (isTreeUp) {
        navigation.navigate({
          routeName: Screens.APPEND_ROOM,
          key: `${info.section.hierarchy.id}-${item.id}-${index}`,
          params: {
            // title: "更新画面(ルーム)",
            hierarchy_id: info.section.hierarchy.id,
            room_id: item.id,
            room_name: item.room_name,
          },
        });
      } else {
        navigation.navigate({
          routeName: Screens.ROOM_CHILD_TREE,
          key: `${info.section.hierarchy.id}-${item.id}-${index}`,
          params: {
            hierarchy_id: info.section.hierarchy.id,
            room_id: item.id,
            room_name: item.room_name,
          },
        });
      }
    };
    const data = {
      uri: uri,
      item_name: item.room_name,
      item: item,
    };
    return <ItemList data={data} onPress={onPress} isUpdate={isTreeUp} />;
  };

  const renderItem = (
    info: SectionListRenderItemInfo<IItemOfITemType>
  ): React.ReactElement => {
    const { index, item } = info;
    const onPress = () => {
      if (isTreeUp) {
        navigation.navigate({
          routeName: Screens.APPEND_ITEM,
          key: `${info.section.hierarchy.id}-${item.id}-${index}`,
          params: {
            // title: "更新画面(商品)",
            type: "item",
            hierarchy_id: info.section.hierarchy.id,
            item_id: item.id,
            room_name: item.item_name,
          },
        });
      } else {
        navigation.navigate({
          routeName: Screens.ROOM_ITEM_INFO,
          key: `${info.section.hierarchy.id}-${item.id}-${index}`,
          params: {
            hierarchy_id: info.section.hierarchy.id,
            room_id: item.id,
            room_name: item.item_name,
          },
        });
      }
    };
    const data = {
      uri: uri,
      item_name: item.item_name,
      item: item,
    };
    return <ItemList data={data} onPress={onPress} isUpdate={isTreeUp} />;
  };

  const renderItems = (
    info: SectionListRenderItem<ItemT>
  ): React.ReactElement => {
    if (isIRoomOfItemType(info)) {
      return renderRoom(info);
    }

    if (isIItemOfItemType(info)) {
      return renderItem(info);
    }
  };

  const renderHeder = (info: { section: SectionItem }): React.ReactElement => {
    const { section } = info;
    return (
      <ListItem itemDivider>
        <Text>{section.hierarchy.hierarchy_name}</Text>
      </ListItem>
    );
  };

  const List = () => {
    return (
      <SectionList
        sections={state.section_data}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderItems}
        renderSectionHeader={renderHeder}
      />
    );
  };

  return (
    <Container>
      {state.section_data.length === 0 ? <SimpleIndicator /> : <List />}
      {CustomFab}
      <Modal
        isVisible={isActive}
        onPress={appendOnPress}
        close={() => {
          setActive(false);
          setIsVisible(false);
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    padding: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#cccccc",
  },
  title: {
    fontSize: 24,
  },
});
