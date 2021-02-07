import * as React from 'react';
import Login from '../screens/login';
// import AuthCallback from 'src/screens/auth/Callback';
import { createStackNavigator } from 'react-navigation-stack';

const AuthNavigation = createStackNavigator(
    {
		Login: { screen: Login }
        // Callback: { screen: AuthCallback, path: 'auth/callback'}
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
);
 
export default AuthNavigation;
