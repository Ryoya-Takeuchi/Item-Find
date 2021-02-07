import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

const data = {
	name: 'Los Angeles',
	state: 'CA',
	country: 'USA'
  };

//   var database = firebase.database();
export const  getData = async() => {
	const usersCollection = firestore().collection('family');
	const snap = await firestore()
	.collection('family')
	.get();
	(await snap).docs.map((doc) => {
		console.log(doc.data());
	})
}

export const getCollectionGroup = async(uid : string) => {
	const snapshot = firestore().collectionGroup("list").get();
	// .where('uid' , '==' , uid).get();
	console.log((await snapshot).docs[0].data());
	// const user = (await snapshot).docs[0].data();
	// console.log("get",user);
}
