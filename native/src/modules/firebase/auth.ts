import {} from 'react';
import firebase from '@react-native-firebase/app';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export async function logout() {
	try {
		await firebase.auth().signOut();
		return true;
	} catch (error) {
		return error;
	}
}