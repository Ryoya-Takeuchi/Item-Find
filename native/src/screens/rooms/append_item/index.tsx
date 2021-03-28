import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
	List,
	ListItem,
	Text,
	Input,
	Form,
	Item,
	Button
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import PickerSelect from '../../../components/PickerSelect';
import DatePicker from '../../../components/DatePicker';
// import useItemAppendForm from '../../../modules/hooks/useItemAppendForm';
import useValidation,{TFromDateProps} from '../../../modules/hooks/useValidation';
import useFamilys from '../../../modules/hooks/useForSelectFamilys';
import useRooms from '../../../modules/hooks/useForSelectRooms';
import {familyCode} from '../../../modules/firebase/app';
import PhotoImage from '../../../components/PhotoImage';
import { useNavigation } from 'react-navigation-hooks';
import Checkbox from '../../../components/Checkbox';
import * as Screens from '../../../navigations/Screens';

export default () => {
	const [values , setValues] = React.useState<TFromDateProps>({
		item_name : '',
		owners : [],
		room_ids : [],
		money : '',
		buy_shop : {label  : '',url : ''},
		private_ids : 'all',
		private : false,
		public : true,
		buy_date : firestore.Timestamp.fromDate(new Date()),
		image_exetensions : [undefined,undefined,undefined,undefined]
	});
	const {requiredValidation,itemError,numberValidation,itemValidation,status} = useValidation();
	const {getAllFamilys,familyList} = useFamilys(familyCode);
	const {getAllRoom,roomList} = useRooms(familyCode);
	const {navigate} = useNavigation();


	React.useEffect(() => {
		// FIXME 正直いらないと思うがテストしやすい
		getAllFamilys();
		getAllRoom();
	},[]);

	React.useEffect(() => {
		console.log(status);
		if (status == 'done') {
			navigate({
				routeName: Screens.CLOUD_REGISTER,
				key: 'cloud_register',
				params : {
					type :  'items',
					values
				}
			});

		}else if(status == 'error') {

		}
	},[status])



	const onDateChange = (selectDate : string) => {
		const dateObj = {['buy_date'] : firestore.Timestamp.fromDate(new Date(selectDate))};
		setValues({...values,...dateObj});
	}
	const change = (value :string | boolean | Date, type : string) => {
		let keyOnValue : any;
		console.log(value);
		if ( typeof value == 'boolean') {
			if(type == 'private') {
				keyOnValue = { private : true,public : false};
			}else {
				keyOnValue = { private : false,public : true};
			}
			setValues({...values,...keyOnValue});
			return;
		}

		if (typeof value == 'string') {
			if( type == 'owners') {
				values[type] = [value];
				keyOnValue = {type : [value]} 
				setValues({...values,...keyOnValue});
				return;
			}

			if ( type == 'room_ids') {
				values[type] = [value];
				keyOnValue = {type : [value]} 
				setValues({...values,...keyOnValue});
				return;
			}
			// item_name
			console.log(type , value);
			values[type] = value;
			keyOnValue = {type : value} 
			setValues({...values,...keyOnValue});
			return;
		}
	}

	const submit = () => {
		itemValidation(values);
		// itemRegister("E7ZPPyUkL4kcduniX3NT",values);
	}

	const setImage = (index : number,imageUri : string) => {
		values.image_exetensions[index] = imageUri as any;
		setValues({...values , image_exetensions : values.image_exetensions});
	}

	const imageUnSet  = (index : number) => {
		values.image_exetensions[index] = undefined;
		setValues({...values , image_exetensions : values.image_exetensions})
	}

	return (
		// <itemAppendForm.ItemForm/>
		<View style={styles.wrap_area}>
			<View style={styles.photo_area}>
				{values.image_exetensions.map((value , index) => 
					<PhotoImage
						cloudImageUrl={values.image_exetensions[index]}
						photoNumber={index}
						setValue={setImage}
						index={index}
						imageUnSet={imageUnSet}/>
				)}
			</View>
			<View style={styles.form_area}>
				<ScrollView>
					<Form>
						<List>
							<ListItem itemDivider>
								<Text>商品名</Text>
							</ListItem>
							<ListItem>
								<Item fixedLabel>
									<Input
										defaultValue={values.item_name}
										onChangeText={(text) => change(text , 'item_name')}
										onBlur={() => {requiredValidation(values.item_name , 'item_name')}}
										style={{flex : 1 }}
										/>
									{itemError.item_name.isError ? <Text style={styles.text_error}>{itemError.item_name.message}</Text> : null}
								</Item>
							</ListItem>
							<ListItem itemDivider>
								<Text>商品所有者</Text>
							</ListItem>
							<ListItem>
								<Item fixedLabel style={{borderColor : 'white'}}>
									<PickerSelect
										placeholder={"例) 父　、　母など"}
										items={familyList}
										type={"owners"}
										value={values.owners[0]}
										onChange={change}
										/>
								</Item>
							</ListItem>
							<ListItem itemDivider>
								<Text>商品購入費</Text>
							</ListItem>
							<ListItem>
								<Item fixedLabel style={{flexDirection : 'row'}}>
									<Input
										defaultValue={`${values.money}`}
										onChangeText={(text) => change(text , 'money')}
										keyboardType={'numbers-and-punctuation'}
										onBlur={() => {numberValidation(values.money , 'money')}}
										/>
									{itemError.money.isError ? <Text style={styles.text_error} >{itemError.money.message}</Text> : null}
								</Item>
							</ListItem>
							<ListItem itemDivider>
								<Text>階層又はルーム選択</Text>
							</ListItem>
							<ListItem>
								<Item fixedLabel style={{borderColor : 'white'}}>
									<PickerSelect
										placeholder={"例) 1階 、 リビングなど"}
										items={roomList}
										type={"room_ids"}
										onChange={change}
										value={values.room_ids[0]}
										/>
								</Item>
							</ListItem>
							<ListItem itemDivider>
								<Text>商品購入先</Text>
							</ListItem>
							<ListItem>
								<Item>
									<Input
										defaultValue={values.buy_shop.label}
										onChangeText={(text) => change(text , 'buy_shop')}
										/>
								</Item>
							</ListItem>
							<ListItem itemDivider>
								<Text>購入日選択</Text>
							</ListItem>
							<ListItem>
								<Item style={{borderColor : 'white'}}>
									<DatePicker
										selectDate={(values.buy_date).toDate()}
										onDateChange={onDateChange}
										/>
								</Item>
							</ListItem>
							<ListItem itemDivider>
								<Text>公開範囲</Text>
							</ListItem>
							<ListItem>
								<Item style={{borderColor : 'white'}}>
									<Checkbox
										label={'家族公開'}
										type={'public'}
										setToggleCheckBox={change}
										isCheck={values.public}
										/>
									<Checkbox
										label={'自分のみ'}
										type={'private'}
										setToggleCheckBox={change}
										isCheck={values.private}
										/>
								</Item>
							</ListItem>
							<ListItem style={styles.button_area}>
								<Button onPress={submit} style={styles.button_reset_color}>
									<Text>リセット</Text>
								</Button>

								<Button onPress={submit} style={styles.button_success_color}>
									<Text> 登 録 </Text>
								</Button>

							</ListItem>
						</List>
					</Form>
				</ScrollView>
			</View>
		</View>
	);
}