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
export interface IRoom {
	id : string,
	is_root : boolean,
	order_by? : number,
	private_ids : Array<string>,
	room_uri? : string,
	room_ids : Array<string>,
	room_name : string,
	update_at? : FirebaseFirestoreTypes.Timestamp,
	create_at? : FirebaseFirestoreTypes.Timestamp,
}

const roomDecoder : Decoder<IRoom> = object({
	id : string(),
	is_root : boolean(),
	room_name : string(),
	private_ids  :array(anyJson()),
	room_ids : array(anyJson()),
})


export const validationRoom = (obj : any) : boolean | DecoderError => {
	try {
        roomDecoder.runWithException(obj);
        return true;
    } catch (e) {
        return e;
    }
}


export const isRoom = (obj: any): obj is IRoom => {
    const validationResult = validationRoom(obj);
    if (validationResult === true) {
        return true;
    }
    return false;
};