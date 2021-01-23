/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Root } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContainer from './navigations/index';

const App =  () => {

	return (
		<Root>
			<SafeAreaProvider>
				<AppContainer/>
			</SafeAreaProvider>
		</Root>
	);
};


export default App;
