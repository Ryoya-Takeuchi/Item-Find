import * as React from "react";
import { IItem } from "../models/entities/Item";
import { IRoom } from "../models/entities/Room";
import { IHierarchy } from "../models/entities/Hierarchy";

export type TFromDateProps = Partial<
  Pick<
    IItem,
    | "id"
    | "item_name"
    | "owners"
    | "room_ids"
    | "money"
    | "buy_shop"
    | "private_ids"
    | "buy_date"
    | "image_exetensions"
  > & { private: boolean; public: boolean }
>;
export interface TFromErrorProps {
  item_name: IError;
  owners: IError;
  room_ids: IError;
  money: IError;
  buy_shop: IError;
  private_ids: IError;
}

export type TFormRoomProps = Partial<
  Pick<
    IRoom,
    | "room_name"
    | "is_root"
    | "private_ids"
    | "image_exetensions"
    | "img_refFromURLs"
  > & {
    hierarchy_id: string;
    parentRoom_id: string;
    isPrivate: boolean;
    isPublic: boolean;
  }
>;
export interface TFormErrorProps {
  room_name: IError;
  is_root: IError;
  private_ids: IError;
  image_exetensions: IError;
  img_refFromURLs;
  hierarchy_id: IError;
  parentRoom_id: IError;
}

export type TFormHierarchyProps = Partial<
  Pick<IHierarchy, "hierarchy_name" | "order_by">
>;
interface IError {
  message: string;
  isError: boolean;
}
const CError = {
  message: "",
  isError: false,
};

enum errorMessageEnum {
  item_name = "商品名",
  owners = "所有者",
  room_ids = "階層又はルーム",
  money = "商品購入費",
  buy_shop = "商品購入先",
  private_ids = "公開範囲",
}

interface UseValidation {
  requiredValidation: (value: string, type: string) => void;
  itemError: TFromErrorProps;
  numberValidation: (value: string, type: string) => void;
  itemValidation: (item: TFromDateProps) => void;
  roomValidation: (room: TFormRoomProps) => void;
  hierarchyValidation: (hierarchy: TFormHierarchyProps) => void;
  status: Status;
}

type Status = "init" | "validating" | "done" | "error";

export default function useValidation(): UseValidation {
  const [status, setStatus] = React.useState<Status>(undefined);
  const [itemError, setItemError] = React.useState<TFromErrorProps>({
    item_name: CError,
    owners: CError,
    room_ids: CError,
    money: CError,
    buy_shop: CError,
    private_ids: CError,
  });

  const itemValidation = React.useCallback(
    (item: TFromDateProps) => {
      async function logic() {}

      setStatus("validating");
      logic()
        .then(() => {
          setStatus("done");
        })
        .catch(() => {});
    },
    [itemError]
  );

  const roomValidation = React.useCallback((inputRoom: TFormRoomProps) => {
    // ルームの入力情報をバリデーション
    async function run() {}

    setStatus("validating");
    run()
      .then(() => {
        setStatus("done");
      })
      .catch(() => {});
  }, []);

  const hierarchyValidation = React.useCallback(
    (inputRoom: TFormHierarchyProps) => {
      // 階層の入力情報をバリデーション
      async function run() {}

      setStatus("validating");
      run()
        .then(() => {
          setStatus("done");
        })
        .catch(() => {});
    },
    []
  );

  const requiredValidation = (value: string, key: string) => {
    if (value == "") {
      itemError[key] = {
        isError: true,
        message: `${errorMessageEnum[key]}は必須項目です。`,
      };
      const newObj = {
        key: {
          isError: true,
          message: `${errorMessageEnum[key]}は必須項目です。`,
        },
      };
      setItemError({ ...itemError, ...newObj });
    }
  };

  const numberValidation = (value: any, key: string) => {
    if (isNaN(value)) {
      itemError[key] = {
        isError: true,
        message: `${errorMessageEnum[key]}は数値のみです。`,
      };
      const newObj = {
        key: {
          isError: true,
          message: `${errorMessageEnum[key]}は数値のみです。`,
        },
      };
      setItemError({ ...itemError, ...newObj });
    }
  };

  return {
    requiredValidation,
    itemError,
    numberValidation,
    itemValidation,
    roomValidation,
    hierarchyValidation,
    status,
  };
}
