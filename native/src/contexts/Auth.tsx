import * as React from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as Auth from '../modules/firebase/auth';

interface Context {
	currentUser?: FirebaseAuthTypes.User;
	singnout : () => void;
}

const defaultContext : Context = {
	currentUser : undefined,
	singnout : undefined
}

const AuthContext = React.createContext<Context>(defaultContext);
const { Provider } = AuthContext;

const AuthProvider = ({children} : any) => {
	const [currentUser , setCurrentUser] = React.useState(undefined);

	const singnout = () => {
		Auth.logout().then(() => {
			setCurrentUser(undefined);
		})
	}

	return (
		<Provider value={{currentUser, singnout}}>
			{children}
		</Provider>
	);
}

export {AuthContext};
export default AuthProvider;