import {
    Decoder,
    object,
    string,
    array,
    anyJson,
    boolean,
    DecoderError
} from '@mojotech/json-type-validation';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IItem {
	id : string,
	item_name : string,
	order_by? : number,
	room_ids : Array<string>,
	private_ids : "all" | Array<string>,
	owners : "all" | Array<string>,
	is_image : boolean,
	create_at?  : FirebaseFirestoreTypes.Timestamp,
	update_at? : FirebaseFirestoreTypes.Timestamp,
};

const itemDecoder: Decoder<IItem> = object({
    id: string(),
    private_ids: array(anyJson()),
    item_name: string(),
	is_root: boolean(),
	is_image : boolean(),
	room_ids : array(anyJson()),
	owners : array(anyJson())
});

export const validationItem = (obj : any) : boolean | DecoderError => {
	try {
        itemDecoder.runWithException(obj);
        return true;
    } catch (e) {
        return e;
    }
}

export const isItem = (obj: any): obj is IItem => {
    const validationResult = validationItem(obj);
    if (validationResult === true) {
        return true;
    }
    return false;
};
