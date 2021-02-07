import  * as React from 'react';
import { NavigationRouteConfigMap } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import * as Screens from '../Screens';

// screens
import Setting from '../../screens/rooms/setting';

const headerStyle = {
    backgroundColor: '#7863D3'
};
const headerTintColor = '#F5F5F5';

/**
 * room tree container
 */
const SettingContainer: NavigationRouteConfigMap<any, any> = {};

SettingContainer[Screens.SETTING] = {
	screen : Setting,
	navigationOptions :  () => ({
		title : '設定',
		headerStyle,
        headerTintColor
	})
}

export default SettingContainer;