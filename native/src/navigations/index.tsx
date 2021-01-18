import * as React from 'react';
import { View , Text} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthenticatedNavigation from './authenticated';
import Auth from './AuthNavigation';


function AuthLoading() {


}


export default createAppContainer(
	createSwitchNavigator(
		{
			Auth,
			AuthenticatedNavigation
		},{
			initialRouteName : 'Auth'
		}
	)
)