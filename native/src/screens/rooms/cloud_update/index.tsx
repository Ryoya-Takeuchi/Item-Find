import * as React from "react";
import { Text } from "native-base";
import SimpleIndicator from "../../../components/SimpleIndicator";
import { useNavigation } from "react-navigation-hooks";
import useClUpdater from "../../../modules/hooks/useClUpdater";
import useCIUploader from "../../../modules/hooks/useCIUploader";
import { IItem } from "../../../modules/models/entities/Item";
import { IRoom } from "../../../modules/models/entities/Room";

type TCollectionType = "items" | "rooms" | "hierarchys";

export default () => {
  const { getParam, goBack } = useNavigation();
  const familyCode = getParam("familyCode");
  const hierarchyId = getParam("hierarchyId");
  const uuid: string = getParam("uuid");
  const collectionType: TCollectionType = getParam("collectionType");
  const updateValue = getParam("value");

  const { status, imgUpload } = useCIUploader(familyCode, collectionType);
  const { itemUpdate, roomUpdate } = useClUpdater(
    familyCode,
    hierarchyId,
    collectionType,
    uuid,
    updateValue
  );

  React.useEffect(() => {
    if (status == "done") {
      //  更新処理終了の場合は前画面へ
      goBack();
    }
  }, [status]);

  // 型ガード
  function typeGuard<T>(arg: any): arg is T {
    return arg !== null && typeof arg === "object";
  }

  React.useEffect(() => {
    const fn = async () => {
      if (typeGuard<IItem>(updateValue) && collectionType == "items") {
        await itemUpdate();
        const ImgUrls = updateValue.image_exetensions.filter(
          (imgUrl) => imgUrl != null
        );
        imgUpload(ImgUrls, uuid);
      }

      if (typeGuard<IRoom>(updateValue) && collectionType == "rooms") {
        await roomUpdate();
        const ImgUrls = updateValue.image_exetensions.filter(
          (imgUrl) => imgUrl != null
        );
        if (ImgUrls.length > 0) {
          imgUpload(ImgUrls, uuid);
        }
      }
    };
    fn();
  }, []);

  return (
    <SimpleIndicator>
      <Text>データを登録中...</Text>
    </SimpleIndicator>
  );
};
