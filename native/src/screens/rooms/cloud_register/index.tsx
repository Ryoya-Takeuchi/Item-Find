import * as React from "react";
import { Text } from "react-native";
import SimpleIndicator from "../../../components/SimpleIndicator";
import { useNavigation } from "react-navigation-hooks";
import useCloudRegister from "../../../modules/hooks/useCloudRegister";
import useCIUploader from "../../../modules/hooks/useCIUploader";
import { familyCode } from "../../../modules/firebase/app";
import useRooms from "../../../modules/hooks/useRoomList";
import { IItem } from "../../../modules/models/entities/Item";
import {
  TFormRoomProps,
  TFormHierarchyProps,
} from "../../../modules/hooks/useValidation";

export default () => {
  const { getParam, goBack } = useNavigation();
  const registerType = getParam("type") as "items" | "rooms";
  const registerSubType = getParam("subType") as "root" | undefined;
  const registerValue = getParam("values") as IItem | TFormRoomProps;
  const { itemRegister, roomRegister, hierarchyRegister } = useCloudRegister(
    familyCode
  );
  const { imgUpload } = useCIUploader(familyCode, registerType);
  const { setRooms, roomList, status } = useRooms(familyCode);

  React.useEffect(() => {
    const fn = async () => {
      if (registerType == "items") {
        if (typeGuardIItem(registerValue)) {
          setRooms(registerValue.room_ids[0]);
        }
      } else if (registerType == "rooms" && !registerSubType) {
        if (typeGuardIRoom(registerValue)) {
          setRooms(registerValue.parentRoom_id);
        }
      }
    };
    fn();
  }, []);

  // itemガード
  function typeGuardIItem(arg: any): arg is IItem {
    return arg !== null && typeof arg === "object";
  }

  // roomタイプガード
  function typeGuardIRoom(arg: any): arg is TFormRoomProps {
    return arg !== null && typeof arg === "object";
  }

  // タイプガード
  function typeGuardIHierarchy(arg: any): arg is TFormHierarchyProps {
    return arg !== null && typeof arg === "object";
  }

  React.useEffect(() => {
    if (status == "done") {
      const logic = async () => {
        switch (registerType) {
          case "items":
            // item登録処理
            if (typeGuardIItem(registerValue)) {
              const registerResult = await itemRegister(
                roomList[0].historyId,
                registerValue
              );
              if (registerResult instanceof Error) {
                return goBack();
              }
              const localImgPaths = registerValue.image_exetensions.filter(
                (uri) => uri != null
              );
              imgUpload(localImgPaths, registerResult.itemId);
            }
            goBack();
            break;
          case "rooms":
            // room登録処理
            if (typeGuardIRoom(registerValue)) {
              const historyId =
                registerValue.parentRoom_id != ""
                  ? roomList[0].historyId
                  : registerValue.hierarchy_id;
              const registerResult = await roomRegister(
                historyId,
                registerValue
              );
              if (registerResult instanceof Error) {
                //下の画面に戻す
                return goBack();
              }
              const localImgPaths = registerValue.image_exetensions.filter(
                (uri) => uri != null
              );
              imgUpload(localImgPaths, registerResult.roomId);
              goBack();
            }
            break;
          default:
            goBack();
        }
      };
      logic();
    } else if (registerType == "rooms" && registerSubType == "root") {
      const run = async () => {
        if (typeGuardIRoom(registerValue)) {
          const historyId = registerValue.hierarchy_id;
          const registerResult = await roomRegister(historyId, registerValue);
          if (registerResult instanceof Error) {
            //下の画面に戻す
            return goBack();
          }
          const localImgPaths = registerValue.image_exetensions.filter(
            (uri) => uri != null
          );
          imgUpload(localImgPaths, registerResult.roomId);
          goBack();
        }
      };
      run();
    } else if ((registerType as "hierarchy") == "hierarchy") {
      const run = async () => {
        if (typeGuardIHierarchy(registerValue)) {
          console.log("registerValue", registerValue);
          const registerResult = await hierarchyRegister(registerValue);
          if (registerResult instanceof Error) {
            //下の画面に戻す
            return goBack();
          }
          goBack();
        }
      };
      run();
    } else if (status == "error") {
      goBack();
    }
  }, [status, roomList]);

  return (
    <SimpleIndicator>
      <Text>データを登録中...</Text>
    </SimpleIndicator>
  );
};
