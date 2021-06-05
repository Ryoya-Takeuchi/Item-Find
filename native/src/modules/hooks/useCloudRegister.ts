import * as React from "react";
import firestore from "@react-native-firebase/firestore";
import { IItem } from "../../modules/models/entities/Item";
import { TFormRoomProps, TFormHierarchyProps } from "../hooks/useValidation";
import { v4 as uuidv4 } from "uuid";

type State = "start" | "done" | "error" | "init";
interface ICloudRegisterHook {
  itemRegister: (
    hierarchyId: string,
    item: IItem
  ) => Promise<{ itemId: string } | Error>;
  roomRegister: (
    hierarchyId: string,
    room: TFormRoomProps
  ) => Promise<{ roomId: string } | Error>;
  hierarchyRegister: (hierarchy: TFormHierarchyProps) => Promise<void | Error>;
}

const cloudRegister = async (
  type: "items" | "rooms",
  familyCode: string,
  hierarchyId: string,
  docId: string,
  createData: any
) => {
  await firestore()
    .collection("home")
    .doc(familyCode)
    .collection("hierarchys")
    .doc(hierarchyId)
    .collection(type)
    .doc(docId)
    .set({ ...createData });
};
const hierarchyClRegister = async (
  familyCode: string,
  hierarchyId: string,
  createData: any
) => {
  await firestore()
    .collection("home")
    .doc(familyCode)
    .collection("hierarchys")
    .doc(hierarchyId)
    .set({ ...createData });
};
const cloudDataUpdate = async (
  type: "items" | "rooms",
  familyCode: string,
  hierarchyId: string,
  rootId: string,
  updateData: any
) => {
  await firestore()
    .doc(`home/${familyCode}/hierarchys/${hierarchyId}/${type}/${rootId}`)
    .set({ ...updateData }, { merge: true });
};
export default function useCloudRegister(
  familyCode: string
): ICloudRegisterHook {
  const [state, setState] = React.useState<State>("init");

  const itemRegister = React.useCallback(
    async (hierarchyId: string, item: IItem) => {
      try {
        //storeでの管理番号
        const uuid = uuidv4();
        await cloudRegister("items", familyCode, hierarchyId, uuid, item);
        return { itemId: uuid };
      } catch (error) {
        return new Error("登録処理でエラーが発生しました。");
      }
    },
    [state, setState]
  );

  const hierarchyRegister = React.useCallback(
    async (inputHierarchy: TFormHierarchyProps) => {
      try {
        //storeでの管理番号生成
        const hierarchyId = uuidv4();
        const { hierarchy_name, order_by } = inputHierarchy;
        const createHierarchy = {
          id: hierarchyId,
          create_at: firestore.Timestamp.fromDate(new Date()),
          update_at: firestore.Timestamp.fromDate(new Date()),
          hierarchy_name,
          order_by,
        };
        await hierarchyClRegister(familyCode, hierarchyId, createHierarchy);
      } catch (error) {
        return new Error("登録処理でエラーが発生しました。");
      }
    },
    [state, setState]
  );

  const roomRegister = React.useCallback(
    async (hierarchyId: string, inputRoom: TFormRoomProps) => {
      // firestoreに登録する形に成形
      const { room_name, hierarchy_id, parentRoom_id, private_ids } = inputRoom;
      //storeでの管理番号
      const uuid = uuidv4();
      try {
        const roomData = {
          id: uuid,
          room_name,
          private_ids,
          is_root: parentRoom_id != "" ? false : true,
          room_ids: [],
          order_by: 10,
          create_at: firestore.Timestamp.fromDate(new Date()),
          update_at: firestore.Timestamp.fromDate(new Date()),
        };
        // fireStoreに新規登録
        await cloudRegister("rooms", familyCode, hierarchyId, uuid, roomData);

        if (parentRoom_id != "") {
          // 親ルームに子ルームを追加
          await cloudDataUpdate(
            "rooms",
            familyCode,
            hierarchyId,
            parentRoom_id,
            {
              room_ids: [uuid],
            }
          );
        }

        return { roomId: uuid };
      } catch (error) {
        return new Error("登録処理でエラーが発生しました。");
      }
    },
    [state, setState]
  );

  return {
    itemRegister,
    roomRegister,
    hierarchyRegister,
  };
}
