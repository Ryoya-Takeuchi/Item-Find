import * as React from "react";
import firestore from "@react-native-firebase/firestore";
import { IItem } from "../../modules/models/entities/Item";
import { IHierarchy } from "../../modules/models/entities/Hierarchy";
import { IRoom } from "../../modules/models/entities/Room";

interface ClUpdaterHook {
  itemUpdate: () => void;
}

type Status = "init" | "done" | "error";

export default function useClUpdater(
  familyCode: string,
  hierarchyId: string,
  collectionType: "items" | "rooms" | "hierarchys",
  docId: string,
  updateData: IItem | IHierarchy | IRoom
): ClUpdaterHook {
  const [status, setStatus] = React.useState<Status>(undefined);

  const itemUpdate = React.useCallback(() => {
    const run = async () => {
      const {
        create_at,
        image_exetensions,
        ...clUpdateData
      } = updateData as IItem;
      await firestore()
        .doc(
          `home/${familyCode}/hierarchys/${hierarchyId}/${collectionType}/${docId}`
        )
        .set(
          {
            ...clUpdateData,
            update_at: firestore.Timestamp.fromDate(new Date()),
          },
          { merge: true }
        );
    };

    setStatus("init");
    run()
      .then(() => {
        setStatus("done");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [familyCode, hierarchyId, docId]);

  return { itemUpdate };
}
