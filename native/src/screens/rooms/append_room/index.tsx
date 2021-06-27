import * as React from "react";
import { View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Container, Tab, Tabs, ScrollableTab, Icon } from "native-base";
import { List, ListItem, Text, Input, Form, Item, Button } from "native-base";
import styles from "./styles";
import useRooms from "../../../modules/hooks/useForSelectRooms";
import Checkbox from "../../../components/Checkbox";
import PhotoImage from "../../../components/PhotoImage";
import { familyCode, userId } from "../../../modules/firebase/app";
import PickerSelect from "../../../components/PickerSelect";
import useValidation, {
  TFormRoomProps,
  TFormHierarchyProps,
} from "../../../modules/hooks/useValidation";
import useForSelectDomain from "../../../modules/hooks/useForSelectHierarchys";
import { useNavigation } from "react-navigation-hooks";
import * as Screens from "../../../navigations/Screens";
import { IRoom } from "src/modules/models/entities/Room";

const initRoom: TFormRoomProps = {
  id: undefined,
  room_name: "",
  is_root: false,
  private_ids: "all",
  image_exetensions: [],
  img_refFromURLs: [],
  hierarchy_id: "",
  parentRoom_id: "",
  isPublic: true,
  isPrivate: false,
};

const initHierarchy: TFormHierarchyProps = {
  hierarchy_name: "",
  order_by: undefined,
};
let navigationType: "room" | "hierarchy" = "room";

export default () => {
  const [inputRoom, setInputRoom] = React.useState<TFormRoomProps>({
    ...initRoom,
  });
  const [
    inputHierarchy,
    setInputHierarchy,
  ] = React.useState<TFormHierarchyProps>({
    ...initHierarchy,
  });
  const { run, selectHierarchies } = useForSelectDomain();
  const { roomValidation, hierarchyValidation, status } = useValidation();
  const { getAllRoom, roomList } = useRooms(familyCode);
  const { navigate, getParam } = useNavigation();
  const hierarchyId = getParam("hierarchy_id");
  const roomId = getParam("room_id");

  React.useEffect(() => {
    run();
    getAllRoom();
    // 更新処理
    const fn = async () => {
      const snapshots = await firestore()
        .doc(`home/${familyCode}/hierarchys/${hierarchyId}/rooms/${roomId}`)
        .get();
      const {
        room_name,
        img_refFromURLs,
        id,
        is_root,
        room_ids,
        private_ids,
      } = snapshots.data() as IRoom;
      console.log("snapshots", snapshots.data());
      if (is_root) {
        setInputRoom((room) => ({
          ...room,
          room_name,
          id,
          hierarchy_id: hierarchyId,
          image_exetensions: img_refFromURLs,
          private_ids,
          is_root,
        }));
      }
    };
    fn();
  }, []);

  React.useEffect(() => {
    if (status == "done") {
      let subType = undefined;
      if (inputRoom.parentRoom_id == "") {
        subType = "root";
      }
      if (roomId == null) {
        navigate({
          routeName: Screens.CLOUD_REGISTER,
          key: `${hierarchyId}-${roomId}`,
          params: {
            type: "rooms",
            subType: subType,
            values: inputRoom,
          },
        });
      } else {
        navigate({
          routeName: Screens.CLOUD_UPDATER,
          key: `${hierarchyId}-${roomId}`,
          params: {
            familyCode,
            hierarchyId,
            uuid: inputRoom.id,
            collectionType: "rooms",
            value: inputRoom,
          },
        });
      }
    } else if (status == "done") {
      navigate({
        routeName: Screens.CLOUD_REGISTER,
        key: "cloud_register",
        params: {
          type: "hierarchy",
          subType: undefined,
          values: inputHierarchy,
        },
      });
    } else if (status == "error") {
    }
  }, [status]);

  const imageUnSet = (index: number) => {
    setInputRoom({ ...inputRoom, image_exetensions: [] });
  };

  const setImage = (index: number, imageUri: string) => {
    inputRoom.image_exetensions[index] = imageUri as any;
    setInputRoom({
      ...inputRoom,
      image_exetensions: inputRoom.image_exetensions,
    });
  };

  const change = (inputValue: string | boolean | Date, key: string) => {
    let keyOnValue: any;
    if (key == "private_ids") {
      if (inputRoom.private_ids == "all") {
        keyOnValue = { private_ids: [userId] };
      } else {
        inputRoom.private_ids = "all";
      }
      setInputRoom({ ...inputRoom, ...keyOnValue });
      return;
    }

    if (typeof inputValue == "string") {
      // ルーム内容
      if (key == "hierarchy_id") {
        inputRoom[key] = inputValue;
        keyOnValue = { key: inputValue, parentRoom_id: "" };
        setInputRoom({ ...inputRoom, ...keyOnValue });
        return;
      }
      if (key == "parentRoom_id") {
        inputRoom[key] = inputValue;
        keyOnValue = { key: [inputValue], hierarchy_id: "" };
        setInputRoom({ ...inputRoom, ...keyOnValue });
        return;
      }

      if (key == "room_name") {
        inputRoom[key] = inputValue;
        keyOnValue = { key: inputValue };
        setInputRoom({ ...inputRoom, ...keyOnValue });
        return;
      }

      //階層内容
      if (key == "hierarchy_name") {
        inputRoom[key] = inputValue;
        keyOnValue = { key: inputValue };
        setInputHierarchy({ ...inputRoom, ...keyOnValue });
        return;
      }

      if (key == "order_by") {
        inputRoom[key] = inputValue;
        keyOnValue = { key: inputValue };
        setInputHierarchy({ ...inputRoom, ...keyOnValue });
        return;
      }
    }
  };

  const setCloudRegister = (registerType: "room" | "hierarchy") => {
    if (registerType == "room") {
      // ルーム情報をfirebaseに登録する
      roomValidation(inputRoom);
    }
    if (registerType == "hierarchy") {
      // ルーム情報をfirebaseに登録する
      hierarchyValidation(inputHierarchy);
    }
  };

  const onScroll = (scrollVolume) => {
    if ((scrollVolume = 0)) {
      console.log("room");
      navigationType = "room";
    } else if ((scrollVolume = 1)) {
      console.log("hierarchy");
      navigationType = "hierarchy";
    }
  };

  return (
    <Container>
      <Tabs
        onScroll={(scrollVolume) => {
          onScroll(scrollVolume);
        }}
        renderTabBar={() => <ScrollableTab />}
      >
        <Tab heading="ルーム追加">
          <View style={styles.wrap_area}>
            <View style={styles.photo_area}>
              {inputRoom.image_exetensions.map((url, index) => (
                <PhotoImage
                  photoNumber={1}
                  cloudImageUrl={inputRoom.image_exetensions[index]}
                  imageUnSet={() => imageUnSet(0)}
                  index={0}
                  setValue={setImage}
                />
              ))}
              {/* <Icon type="AntDesign" name="camera" style={{fontSize : window.width / 3, color: '#E2E2E2'}}/> */}
            </View>
            <View style={styles.form_area}>
              <Form>
                <List>
                  <ListItem itemDivider>
                    <Text>ルーム名又は階層名</Text>
                  </ListItem>
                  <ListItem>
                    <Item fixedLabel>
                      <Input
                        defaultValue={inputRoom.room_name}
                        onChangeText={(text) => change(text, "room_name")}
                        placeholder={"キッチン、お風呂場など"}
                        // onBlur={() => {requiredValidation(values.item_name , 'item_name')}}
                        style={{ flex: 1 }}
                      />
                      {/* {itemError.item_name.isError ? <Text style={styles.text_error}>{itemError.item_name.message}</Text> : null} */}
                    </Item>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>階数選択　</Text>
                  </ListItem>
                  <ListItem>
                    <Item fixedLabel style={{ borderColor: "white" }}>
                      <PickerSelect
                        placeholder={"例) 1階、B1Fなど"}
                        items={selectHierarchies}
                        type={"hierarchy_id"}
                        enabled={inputRoom.parentRoom_id == ""}
                        value={inputRoom.hierarchy_id}
                        onChange={change}
                      />
                    </Item>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>親ルーム選択</Text>
                  </ListItem>
                  <ListItem>
                    <Item fixedLabel style={{ borderColor: "white" }}>
                      <PickerSelect
                        placeholder={"例) キッチン 、 リビングなど"}
                        items={roomList}
                        type={"parentRoom_id"}
                        onChange={change}
                        enabled={inputRoom.hierarchy_id == ""}
                        value={inputRoom.parentRoom_id}
                      />
                    </Item>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>公開範囲</Text>
                  </ListItem>
                  <ListItem>
                    <Item style={{ borderColor: "white" }}>
                      <Checkbox
                        label={"家族公開"}
                        type={"private_ids"}
                        setToggleCheckBox={change}
                        isCheck={inputRoom.private_ids == "all"}
                      />
                      <Checkbox
                        label={"自分のみ"}
                        type={"private_ids"}
                        setToggleCheckBox={change}
                        isCheck={inputRoom.private_ids[0] == userId}
                      />
                    </Item>
                  </ListItem>
                  <ListItem style={styles.button_area}>
                    <Button
                      onPress={() => setCloudRegister("room")}
                      style={styles.button_reset_color}
                    >
                      <Text>リセット</Text>
                    </Button>

                    <Button
                      onPress={() => setCloudRegister("room")}
                      style={styles.button_success_color}
                    >
                      <Text>{hierarchyId ? " 更 新 " : " 登 録 "}</Text>
                    </Button>
                  </ListItem>
                </List>
              </Form>
            </View>
          </View>
        </Tab>

        {/* 階層追加 */}
        <Tab heading="階層追加">
          <View style={styles.wrap_area}>
            <View style={styles.form_area}>
              <Form>
                <List>
                  <ListItem itemDivider>
                    <Text>階層名</Text>
                  </ListItem>
                  <ListItem>
                    <Item fixedLabel>
                      <Input
                        defaultValue={inputHierarchy.hierarchy_name}
                        onChangeText={(text) => change(text, "hierarchy_name")}
                        placeholder={"1階、２階など"}
                        // onBlur={() => {requiredValidation(values.item_name , 'item_name')}}
                        style={{ flex: 1 }}
                      />
                      {/* {itemError.item_name.isError ? <Text style={styles.text_error}>{itemError.item_name.message}</Text> : null} */}
                    </Item>
                  </ListItem>
                  <ListItem itemDivider>
                    <Text>表示順</Text>
                  </ListItem>
                  <ListItem>
                    <Item fixedLabel>
                      <Input
                        defaultValue={
                          inputHierarchy.order_by
                            ? inputHierarchy.order_by.toString()
                            : "0"
                        }
                        onChangeText={(text) => change(text, "order_by")}
                        placeholder={"1,10など"}
                        // onBlur={() => {requiredValidation(values.item_name , 'item_name')}}
                        style={{ flex: 1 }}
                      />
                      {/* {itemError.item_name.isError ? <Text style={styles.text_error}>{itemError.item_name.message}</Text> : null} */}
                    </Item>
                  </ListItem>
                  <ListItem style={styles.button_area}>
                    <Button
                      onPress={() => setCloudRegister("hierarchy")}
                      style={styles.button_reset_color}
                    >
                      <Text>リセット</Text>
                    </Button>

                    <Button
                      onPress={() => setCloudRegister("hierarchy")}
                      style={styles.button_success_color}
                    >
                      <Text>{hierarchyId ? " 更 新 " : " 登 録 "}</Text>
                    </Button>
                  </ListItem>
                </List>
              </Form>
            </View>
          </View>
        </Tab>
      </Tabs>
    </Container>
  );
};
