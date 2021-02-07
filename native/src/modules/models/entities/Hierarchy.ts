import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import {
    Decoder,
    object,
    string,
    array,
    anyJson,
    optional,
    DecoderError,
	number
} from '@mojotech/json-type-validation';

export interface IHierarchy {
	hierarchy_name : string,
	id : string,
	order_by : number,
	create_at?: FirebaseFirestoreTypes.Timestamp,
	update_at?: FirebaseFirestoreTypes.Timestamp
}

const hierarchyDecoder : Decoder<IHierarchy> = object({
	hierarchy_name : string(),
	id : string(),
	order_by : number()
});

export const validationHierarchy = (obj : any) : boolean | DecoderError => {
	try {
		hierarchyDecoder.runWithException(obj);
		return true;
	} catch (error) {
		return error;
	}
}

export const isHierarchy = (obj : any) : obj is IHierarchy => {
	const validationResult = validationHierarchy(obj);
	if(validationResult === true) {
		return true;
	}
	return false;
}