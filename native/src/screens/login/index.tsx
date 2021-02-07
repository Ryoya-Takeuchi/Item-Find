/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Button,Text, Icon } from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useNavigation } from 'react-navigation-hooks';
import * as Screens from '../../navigations/Screens';
import auth from '@react-native-firebase/auth';

const window = Dimensions.get("window");

const LoginScreen = () => {
	const [email , setEmail] = React.useState<string>("trho.26@sample.com");
	const [password , setPassword] = React.useState<string>("password");
	const [rotate , setRotate] = React.useState<number>(-80);
	const {navigate} = useNavigation();

	React.useEffect(() => {
		setInterval(() => {setRotate(rotate => rotate + 10)},5000)
	},[])

	const login = () => {
		if(email == "") {
			return;
		}
		if(password == "") {
			return;
		}
		auth().signInWithEmailAndPassword(email,password)
		.then((user) => {
			console.log(user);
		}).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
		})
	}


  return (
    <>
		{/* <AppContainer /> */}
		<KeyboardAvoidingView style={styles.body} behavior="padding">
			<View style={styles.top}>
				<View style={{flexDirection : "row" , alignItems : "center" , justifyContent : "flex-end"}}>
					<View style={{flexDirection : "column"}}>
						<Image resizeMode='contain' source={require('../../resources/keshigomu.png')} style={{transform: [{ rotate: `${rotate}deg` }] , width : window.width * 0.05 , height : window.width * 0.03}} />
						<Image resizeMode='contain' source={require('../../resources/enpitsu.png')} style={{transform: [{ rotate: "180deg" }] , width : window.width * 0.05 , height : window.width * 0.1}} />
					</View>
					<Text style={{fontSize: RFValue(window.width * 0.1) ,  color : '#ffffff' , fontFamily: 'American Typewriter' , fontWeight: 'bold'}}>tem_Find</Text>
				</View>
				<Icon name='archive' type="FontAwesome" style={{fontSize: window.width * 0.3, color: '#ffffff'}}/>
			</View>
			<View style={styles.bottom}>
				{/* <Form style={styles.from_area}> */}
					{/* <Item floatingLabel> */}
						{/* <Label>email</Label> */}
						<TextInput
							onChangeText={(text) => setEmail(text)}
							value={email}/>
						<FloatingLabelInput
							label={'email'}
							// isPassword
							// togglePassword={show}
							value={email}
							onChangeText={(value) => setEmail(value)}
							// customShowPasswordComponent={<Text>Show</Text>}
							// customHidePasswordComponent={<Text>Hide</Text>}
						/>
						<FloatingLabelInput
							label={'password'}
							isPassword
							// togglePassword={show}
							value={email}
							onChangeText={(value) => setPassword(value)}
							// customShowPasswordComponent={<Text>Show</Text>}
							// customHidePasswordComponent={<Text>Hide</Text>}
						/>
							{/* <Input/> */}
						{/* </Item> */}
						{/* <Item floatingLabel last> */}
						{/* <Label>Password</Label> */}
						<TextInput
							onChangeText={(text) => setPassword(text)}
							value={password}
							defaultValue={""}/>
							{/* <Input/> */}
					{/* </Item> */}
					<Button rounded full style={styles.login_but} onPress={login}>
						<Text style={{color : "#ffffff"}}>ログインして始める</Text>
					</Button>
				{/* </Form> */}
				<View style={styles.new_area}>
					<Text>新規登録されていない場合は</Text>
					<TouchableHighlight onPress={() => alert("新規登録！！")}>
						<Text style={{color : "#CE6C6C"}}>こちら</Text>
					</TouchableHighlight>
					<Text>から</Text>
				</View>
			</View>
		</KeyboardAvoidingView>
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
