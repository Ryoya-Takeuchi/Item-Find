import * as React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import auth from '@react-native-firebase/auth';
import AuthenticatedNavigation from './authenticated';
import { useNavigation } from 'react-navigation-hooks';
import Auth from './AuthNavigation';
import SimpleIndicator from '../components/SimpleIndicator';
import * as  Module from '../modules/firebase/app';
import { AuthContext } from '../contexts/Auth';


function AuthLoading() {
	const {currentUser} = React.useContext(AuthContext);
	const { navigate } = useNavigation();
	React.useEffect(() => {
		const unSubscriber = auth().onAuthStateChanged((user) => {
			if (user) {
				Module.getCollectionGroup(user.uid);
                navigate({ routeName: 'AuthenticatedNavigation' });
            } else {
                navigate({ routeName: 'Auth' });
            }
		});
		return unSubscriber;
	},[currentUser])
	return <SimpleIndicator/>
}


export default createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading,
			Auth,
			AuthenticatedNavigation
			
		},{
			initialRouteName : 'AuthLoading'
		}
	)
)