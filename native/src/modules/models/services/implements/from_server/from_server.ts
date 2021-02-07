import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


export default class Server {
	private familyCode : string;
	constructor(familyCode) {
		this.familyCode = familyCode;
	}

	protected hierarchyRef() {
		return firestore().collection(`home/${this.familyCode}/hierarchys`)
	}

	protected hierarchyQuery() {
		return this.hierarchyRef();
	}

	protected roomRef(hierarchyId : string) {
		return firestore().collection(`home/${this.familyCode}/hierarchys/${hierarchyId}/rooms`)
	}

	protected roomQuery(hierarchyId : string) {
		return this.roomRef(hierarchyId)
	}

	protected itemRef(hierarchyId : string) {
		return firestore().collection(`home/${this.familyCode}/hierarchys/${hierarchyId}/items`)
	}

	
	protected itemQuery(hierarchyId : string) {
		return this.itemRef(hierarchyId);
	}

	protected async getServerQuery<T>(
		query : FirebaseFirestoreTypes.Query
	) {
		const data = (await query.get()).docs.map(doc => doc.data() as T)
		return data
	}
	
	protected async getServerDoc<T>(
		doc : FirebaseFirestoreTypes.DocumentData
	) {
		return (await doc.get()).data();
	}
}