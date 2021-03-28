import * as React from 'react';
import { View, ScrollView, StyleSheet, TextInput} from 'react-native';
import {
	List,
	ListItem,
	Text,
	Form,
	Item,
	Button
} from 'native-base';
import { useForm, Controller} from "react-hook-form";
import PickerSelect from '../../components/PickerSelect';
import multipleSelect from '../../components/multipleSelect';
import PhotoImage from '../../components/PhotoImage';
import { RHFInput } from 'react-hook-form-input';
import MultipleSelect from '../../components/multipleSelect';

const styles =  StyleSheet.create({
	wrap_area : {
		flex : 1,
	},
	photo_area : {
		flex : 1,
		backgroundColor : "#E2E2E2",
		flexDirection : "row"
	},
	form_area : {
		flex : 5,
		backgroundColor : "#ffffff"
	},
})

interface FormData {
	item_name : string,
	owners : string,
	rooms : string,
	money : string,
	buy_shop : string
}

export default function useItemAppnedForm() {
	const {control, handleSubmit, errors, register, setValue} = useForm<FormData>();
	const [state, setState] = React.useState()
	

	const items=[
		{ label: '家族全員', value: '家族全員' },
		{ label: '父', value: '父' },
		{ label: '母', value: '母' },
		{ label: 'お兄ちゃん', value: 'お兄ちゃん' },
		{ label: 'おねぇちゃん', value: 'おねぇちゃん' },
		{ label: '妹', value: '妹' },
	];

	const roomItems=[
		{ label: 'キッチン', value: '1234' },
		{ label: 'リビング', value: '5678' },
		{ label: 'トイレ', value: '91011' },
		{ label: '応接間', value: '121314' },
	];

	const roomItemsTest=[
		{ id : 'キッチン', name: '1234' },
		{ id : 'リビング', name: '5678' },
		{ id : 'トイレ', name: '91011' },
		{ id : '応接間', name: '121314' },
	];
	  // submit時処理
	  const onSubmit = (data: FormData) => {
		console.log(data);
		alert("test")
	  };

	const onChange = args => {
		console.log("args",args)
		console.log("args",args[0].nativeEvent.text);
		return {
			value: args[0].nativeEvent.text,
		}
	};

	const selectOnChange = args => {
		console.log(args)
		return {
			value: args[0]
		}
	}

	  const onSelectedItemsChange = selectedItems => {
		console.log("selectedItems",selectedItems.currentTarget.isFocused);
	  };

	const ItemForm = () => {
		return (
			<View style={styles.wrap_area}>
				<View style={styles.photo_area}>
					{[1,2,3,4].map((values , index) => <PhotoImage photoNumber={index}/>)}
				</View>
				<View style={styles.form_area}>
					<ScrollView>
						<Form>
							<List>
								<ListItem itemDivider>
									<Text>商品名</Text>
								</ListItem>
								<ListItem>
									<RHFInput
										register={register}
										setValue={setValue}
										as={
											<TextInput 
												placeholder={'例)　ハサミ , コップなど'}
												style={{flex : 1,backgroundColor : "red"}}/>
										}
										onChangeEvent={onChange}
										name="item_name"
										/>
									{errors.item_name && errors.item_name.type === 'required' && (
										<Text style={{color: 'red'}}>Nameは必須です。</Text>
									)} 
								</ListItem>
								<ListItem itemDivider>
									<Text>商品所有者</Text>
								</ListItem>
								<ListItem>
									<RHFInput
										register={register}
										setValue={setValue}
										type={'select'}
										// rules={{required : true, validate : (value) => {return (typeof value != 'number')}}}
										as={<PickerSelect
											placeholder={"例) 父　、　母など"}
											items={items}
											// onChange={setValue}
											/>}
										onChangeEvent={onChange}
										name="owners"
									/>
									{errors.owners && errors.owners.type === 'required' && (
										<Text style={{color: 'red'}}>Nameは必須です。</Text>
									)}
								</ListItem>
								<ListItem itemDivider>
									<Text>商品購入費</Text>
								</ListItem>
								<ListItem style={{alignItems : 'flex-start' }}>
									<View>
										<RHFInput
											register={register}
											setValue={setValue}
											rules={{required : true, validate : (value) => {return (typeof value != 'number')}}}
											as={<TextInput placeholder={'例)　120　、 1000など'} />}
											onChangeEvent={selectOnChange}
											name="money"
										/>
										{errors.money && errors.money.type === 'required' && (
											<Text style={{color: 'red' , }}>金額は必須です。</Text>
										)}
										{errors.money && errors.money.type === 'validate' && (
											<Text style={{color: 'red'}}>金額は数値である必要があります。</Text>
										)}
									</View>
								</ListItem>
								{/* <ListItem itemDivider>
									<Text>グループ選択</Text>
								</ListItem>
								<ListItem>
									<Controller
										control={control}
										render={({onChange, onBlur, value}) => (
											<PickerSelect
												placeholder={"例) キッチン　、　リビングなど"}
												items={roomItems}
												setValue={onChange}
												value={value}
												/>
										)}
										name="rooms"
										rules={{
										required: true,
										}}
										defaultValue=""
									/>
									{errors.rooms && errors.rooms.type === 'required' && (
										<Text style={{color: 'red'}}>Nameは必須です。</Text>
									)}
								</ListItem> */}
								<ListItem itemDivider>
									<Text>購入先選択</Text>
								</ListItem>
								<ListItem style={{flexDirection : 'column' , alignItems : 'flex-start'}}>
									<RHFInput
										register={register}
										setValue={setValue}
										rules={{required : true}}
										as={<TextInput placeholder={'例)　amazon , 楽天など'}/>}
										onChangeEvent={onChange}
										name="buy_shop"
									/>
									{errors.buy_shop && errors.buy_shop.type === 'required' && (
										<Text style={{color: 'red'}}>購入先は必須です。</Text>
									)}
								</ListItem>
								{/* <ListItem itemDivider>
									<Text>商品所有者</Text>
								</ListItem>
								<ListItem>
									<RHFInput
										register={register}
										setValue={setValue}
										type={'select'}
										// rules={{required : true, validate : (value) => {return (typeof value != 'number')}}}
										as={<MultipleSelect
											placeholder={"例) 父　、　母など"}
											items={roomItemsTest}
											onSelectedItemsChange={onSelectedItemsChange}
											// onChange={setValue}
											/>}
										onChangeEvent={onChange}
										name="owners"
									/>
									{errors.owners && errors.owners.type === 'required' && (
										<Text style={{color: 'red'}}>Nameは必須です。</Text>
									)}
								</ListItem> */}
								<ListItem  style={{ alignItems : 'center' , justifyContent : 'space-evenly' ,  flexDirection : 'row'}}>
									<Button rounded style={{backgroundColor : '#CE6C6C'}}>
										<Text> ク リ ア </Text>
									</Button>
									<Button onPress={handleSubmit(onSubmit)} rounded style={{backgroundColor : '#7863D3'}}>
										<Text>    保 存    </Text>
									</Button>
								</ListItem>
							</List>
						</Form>
					</ScrollView>
				</View>
	
			</View>
		);
	}

	return {
		ItemForm,
	}
	
}