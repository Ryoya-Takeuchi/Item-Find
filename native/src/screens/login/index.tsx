/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
  Image
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Button,Text, Icon } from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from 'react-navigation-hooks';
import * as Screens from '../../navigations/Screens';

const window = Dimensions.get("window");

const LoginScreen = () => {

	const {navigate} = useNavigation();

	const login = () => {
		navigate({routeName : 'AuthenticatedNavigation'})
	}

  return (
    <>
		{/* <AppContainer /> */}
		<SafeAreaView style={styles.body}>
			<View style={styles.top}>
				<View style={{flexDirection : "row" , alignItems : "center"}}>
					<Image resizeMode='contain' source={require('../../images/enpitsu.png')} style={{transform: [{ rotate: "180deg" }] , width : window.width * 0.05 , height : window.width * 0.15}} />
					<Text style={{fontSize: RFValue(window.width * 0.1) ,  color : '#ffffff' , fontFamily: 'American Typewriter' , fontWeight: 'bold'}}>tem_Find</Text>
				</View>
				<Icon name='archive' type="FontAwesome" style={{fontSize: window.width * 0.3, color: '#ffffff'}}/>
			</View>
			<View style={styles.bottom}>
				<Form style={styles.from_area}>
					<Item floatingLabel>
						<Label>Username</Label>
						<Input />
						</Item>
						<Item floatingLabel last>
						<Label>Password</Label>
						<Input />
					</Item>
					<Button rounded full style={styles.login_but} onPress={login}>
						<Text style={{color : "#ffffff"}}>ログインして始める</Text>
					</Button>
				</Form>
				<View style={styles.new_area}>
					<Text>新規登録されていない場合は</Text>
					<TouchableHighlight onPress={() => alert("新規登録！！")}>
						<Text style={{color : "#CE6C6C"}}>こちら</Text>
					</TouchableHighlight>
					<Text>から</Text>
				</View>
			</View>
		</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
	body : {
		flex : 1
	},
	top : {
		flex : 2,
		backgroundColor : "#7863D3",
		justifyContent : "center",
		alignItems : "center"
	},
	bottom: {
		flex : 1.5,
		backgroundColor : "#ffffff"
	},
	from_area : {
		margin : window.width * 0.10
	},
	login_but : {
	  backgroundColor : "#7863D3",
	  marginTop : window.width * 0.05,
	  borderRadius : window.width * 0.01
	},
	new_area : {
		flexDirection : "row" ,
		justifyContent : "center"}
});

export default LoginScreen;
