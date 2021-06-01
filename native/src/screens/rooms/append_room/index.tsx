import * as React from "react";
import { View } from "react-native";
import { List, ListItem, Text, Input, Form, Item, Button } from "native-base";
import styles from "./styles";
import useRooms from "../../../modules/hooks/useForSelectRooms";
import Checkbox from "../../../components/Checkbox";
import PhotoImage from "../../../components/PhotoImage";
import { familyCode, userId } from "../../../modules/firebase/app";
import PickerSelect from "../../../components/PickerSelect";
import { TFormRoomProps } from "../../../modules/hooks/useValidation";
import useForSelectDomain from "../../../modules/hooks/useForSelectHierarchys";
import useValidation from "../../../modules/hooks/useValidation";
import { useNavigation } from "react-navigation-hooks";
import * as Screens from "../../../navigations/Screens";

export default () => {
  const [inputRoom, setInputRoom] = React.useState<TFormRoomProps>({
    room_name: "",
    is_root: false,
    private_ids: "all",
    image_exetensions: [],
    img_refFromURLs: [],
    hierarchy_id: "",
    parentRoom_id: "",
    isPublic: true,
    isPrivate: false,
  });
  const { run, selectHierarchies } = useForSelectDomain();
  const { roomValidation, status } = useValidation();
  const { getAllRoom, roomList } = useRooms(familyCode);
  const { navigate } = useNavigation();

  React.useEffect(() => {
    run();
    getAllRoom();
  }, []);

  React.useEffect(() => {
    if (status == "done") {
      let subType = undefined;
      if (inputRoom.parentRoom_id == "") {
        subType = "root";
      }
      navigate({
        routeName: Screens.CLOUD_REGISTER,
        key: "cloud_register",
        params: {
          type: "rooms",
          subType: subType,
          values: inputRoom,
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
      inputRoom[key] = inputValue;
      keyOnValue = { key: inputValue };
      setInputRoom({ ...inputRoom, ...keyOnValue });
      return;
    }
  };

  const roomInfoRegister = () => {
    // ルーム情報をfirebaseに登録する
    roomValidation(inputRoom);
  };

  return (
    <View style={styles.wrap_area}>
      <View style={styles.photo_area}>
        <PhotoImage
          photoNumber={1}
          cloudImageUrl={inputRoom.image_exetensions[0]}
          imageUnSet={() => imageUnSet(0)}
          index={0}
          setValue={setImage}
        />
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
                onPress={roomInfoRegister}
                style={styles.button_reset_color}
              >
                <Text>リセット</Text>
              </Button>

              <Button
                onPress={roomInfoRegister}
                style={styles.button_success_color}
              >
                <Text> 登 録 </Text>
              </Button>
            </ListItem>
          </List>
        </Form>
      </View>
    </View>
  );
};
