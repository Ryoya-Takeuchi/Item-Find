import * as React from "react";
import firestore from "@react-native-firebase/firestore";
import { IRoom } from "../models/entities/Room";

interface IHook {
  roomList: IHRoom[];
  setRooms: (roomId) => void;
  status: Status;
}

type Status = "start" | "init" | "done" | "error";

export interface IHRoom extends IRoom {
  historyId: string;
}

export default function useRooms(familyCode: string): IHook {
  const [roomList, setRoomList] = React.useState<IHRoom[]>([]);
  const [status, setStatus] = React.useState<Status>("init");

  const setRooms = React.useCallback(
    (roomId: string) => {
      const process = async () => {
        const doc = await firestore().collectionGroup("rooms").get();
        const snapshot = doc.docs.filter(
          (snapshot) => snapshot.data().id == roomId
        );
        if (snapshot.length < 1) {
          throw new Error(
            `collectionGroupで該当するroomを検索できませんでした。`
          );
        }
        const refs = await snapshot[0].ref.path.split("/");
        const targetIndex = refs.indexOf("hierarchys");
        const historyId = refs[targetIndex + 1];
        const room = { ...snapshot[0].data(), historyId: historyId } as IHRoom;
        setRoomList([room]);
      };

      setStatus("start");
      process()
        .then(() => {
          setStatus("done");
        })
        .catch((e) => {
          console.log(e);
          setStatus("error");
        });
    },
    [roomList]
  );

  return {
    // getAllRoom,
    roomList,
    setRooms,
    status,
  };
}
