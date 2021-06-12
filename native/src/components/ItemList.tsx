import * as React from "react";
import { ListItem, Left, Right, Text, Icon, Body } from "native-base";
import ImageThumbnail from "../container/ItemThumbnail";
import { ItemT } from "../screens/rooms/tree/types";

interface Props {
  onPress: () => void;
  data: {
    item_name: string;
    uri: string;
    item: ItemT;
  };
  isUpdate?: boolean;
}

export default function ItemList(props: Props) {
  const { onPress, data, isUpdate } = props;
  return (
    <ListItem onPress={() => onPress()}>
      <Left>
        <ImageThumbnail
          display_name={data.item_name}
          type={data.item.item_type == "room" ? "rooms" : "items"}
          uid={data.item.id}
          imgRefFromURLs={data.item.img_refFromURLs}
        />
      </Left>
      <Body>
        <Text>{data.item_name}</Text>
      </Body>
      <Right>
        {isUpdate ? (
          <Icon type="AntDesign" name="form" style={{ color: "#7863D3" }} />
        ) : (
          <Icon type="Ionicons" name="ios-chevron-forward" />
        )}
      </Right>
    </ListItem>
  );
}
