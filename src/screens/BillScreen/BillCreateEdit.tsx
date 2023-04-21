import * as React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    faAdd,
    faClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import BaseButton from '../../components/BaseButton';
import DropdownListNew from '../../components/DropdownListNew';
import HeaderView from '../../components/HeaderView';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import { products } from '../../mockData/product';
import {
    converTimeStamp,
    getMoneyFormat,
} from '../../utils/Utils';

interface Props {
    navigation: any,
    route: any;
}
const BillCreateEdit = (props: Props) => {
    const dropRef = React.createRef();
    const { bill, type } = props.route.params;    
    const [customerName, setCustomerName] = React.useState<string>('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = React.useState<string>('');
    const [customerAddress, setCustomerAddress] = React.useState<string>('');
    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const [deposit, setDeposit] = React.useState<number>(0);
    const [itemsList, setItemsList] = React.useState<any>([]);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    React.useEffect(() => {
        let totalP:number = itemsList?.reduce((total:number, item:any) => total + item.price*item.quantity,0);
        setTotalPrice(totalP - deposit)
    }, [itemsList,deposit])
    React.useEffect(() => {
        if(type=='edit'&&bill){
            setCustomerName(bill?.customer?.name)
            setCustomerPhoneNumber(bill?.customer?.phoneNumber)
            setCustomerAddress(bill?.customer?.address)
            setItemsList(bill?.items)
            setStartDate(bill?.startDate)
            setEndDate(bill?.endDate)
            setDeposit(bill?.deposit)
        }
    }, [type])
    
    const deleteEr = async(index: number) => {
        await setItemsList(itemsList.filter((_: any, idx: number) => idx !== index))
    }
    const onChangeItems = (text: string, field: string, index: number) => {
        setItemsList(itemsList.map((item: any, idx: number) => idx == index ? {
            ...item,
            [field]: text
        } : item))
    }
    const onSelectItem = (index:number) => {
        setItemsList([...itemsList, {
            id:products[index].id,
            name: products[index].name,
            type: products[index].type,
            price: products[index].price,
            quantity: '',
            size:''
        }])
    }
    const onPressAddItem = () => {
        dropRef?.current?.drop({
            data: products,//.filter((i) => i.parentId === 0),
            onSelect: onSelectItem,
            title: 'Chọn đồ',
            placeholderText: 'Tìm kiếm',
        })
    }
    const renderERCard = (item: {
        id:number,
        name: string,
        size: string,
        quantity: string,
        price: string,
        type:string,
    }, index: number) => {    
        console.log('itemSte',item);
        
        return (<View key={`item-${item.name}-${index}`} style={{
            //   width: verticalScale(343),
            borderWidth: 1,
            borderRadius: 16,
            borderColor: '#FF8500',
            //   marginHorizontal: verticalScale(16),
            paddingTop: verticalScale(40),
            marginBottom: verticalScale(10)
        }}>
            <TouchableOpacity
                onPress={() => deleteEr(index)}
                style={{ position: 'absolute', top: verticalScale(16), right: verticalScale(16) }}
            >
                <FontAwesomeIcon icon={faClose} size={20} />
                {/* <Icon name="No" size={verticalScale(14)} color={colors.borderColor} /> */}
            </TouchableOpacity>
            <View style={[styles.erCard]}>
                <TextBase title={'Tên hàng: '} style={[styles.text,{flex:0}]}/>
                <TextInput
                    autoCorrect={false}
                    placeholderTextColor={colors.grayColor}
                    value={`${item.name}`}
                    editable={false}    
                    placeholder={'Chọn đồ'}
                    style={styles.text} />
            </View>
            <View style={[styles.erCard]}>
            <TextBase title={'Size: '} style={[styles.text,{flex:0}]}/>

                <TextInput
                    autoCorrect={false}
                    placeholderTextColor={colors.grayColor}
                    value={`${item.size}`}
                    onChangeText={text => onChangeItems(text, 'size', index)}
                    placeholder={'Size'}
                    style={styles.text} />
            </View>
            <View style={[styles.erCard, { borderColor: styles.erCard.borderColor }]}>
            <TextBase title={'Số lượng: '} style={[styles.text,{flex:0}]}/>

                <TextInput
                    autoCorrect={false}
                    keyboardType="number-pad"
                    placeholderTextColor={colors.grayColor}
                    value={`${item.quantity}`}
                    onChangeText={text => onChangeItems(text, 'quantity', index)}
                    placeholder={'Số lượng'}
                    style={styles.text} />
            </View>
            <View style={[styles.erCard, { borderColor: styles.erCard.borderColor }]}>
            <TextBase title={'Giá: '} style={[styles.text,{flex:0}]}/>

            <TextInput
                    autoCorrect={false}
                    placeholderTextColor={colors.grayColor}
                    value={`${getMoneyFormat(item.price)} VND/cái`}
                    editable={false}
                    placeholder={'Giá'}
                    style={styles.text} />
            </View>

        </View>)
    }
    const onSelectTime = (index: number) => {
        switch (index) {
          case 0:
            break;
          case 1:
            break;
          default:
            break;
        }
      }
    const renderForm = () => {
        return (<View style={{ flex: 1, margin: verticalScale(16) }}>
            {/* <View style={styles.customerInfo}> */}
            <TextBase title={'Khách hàng'} style={{
                fontSize: verticalScale(18),
                marginBottom: verticalScale(10)
            }} />
            <TextInput
                style={styles.inputStyle}
                onChangeText={text => setCustomerName(text)}
                placeholderTextColor={colors.grayColor}
                value={customerName}
                placeholder='Nhập Họ tên Khách hàng'
            />
            <TextInput
                style={styles.inputStyle}
                onChangeText={text => setCustomerPhoneNumber(text)}
                value={customerPhoneNumber}
                placeholder='Số điện thoại'
                placeholderTextColor={colors.grayColor}

            />
            <TextInput
                style={styles.inputStyle}
                onChangeText={text => setCustomerAddress(text)}
                value={customerAddress}
                placeholder='Địa chỉ'
                placeholderTextColor={colors.grayColor}
            />
            {/* </View> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextBase title={'Hàng thuê'} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(10)
                }} />
                <TouchableOpacity onPress={onPressAddItem}>
                    <FontAwesomeIcon icon={faAdd} size={30} />
                </TouchableOpacity>
            </View>
            {itemsList.map((item: any, index: number) => renderERCard(item, index))}
            {/** */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: verticalScale(20), marginBottom: verticalScale(16) }}>
                <TouchableOpacity
                  style={{ ...styles.timePicker, marginLeft: 0 }}
                  onPress={() => onSelectTime(0)}
                >
                
                    <TextBase title={'Thuê từ ngày'} style={{ position: 'absolute', top: -15, left: 7, flexDirection: 'row' }} />

                  {startDate?.length > 0
                    ? <TextBase title={converTimeStamp(startDate)} style={styles.time} />
                    : <TextBase title={'DD/MM/YYYY'} style={[styles.time, { color: colors.inputBorderColor }]} />
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.timePicker, marginRight: 0 }}
                  onPress={() => onSelectTime(1)}
                >
                    <TextBase title={'Đến ngày'} style={{ position: 'absolute', top: -15, left: 7, flexDirection: 'row' }} />
                  {endDate && endDate?.length > 0
                    ? <TextBase title={converTimeStamp(endDate)} style={styles.time} />
                    : <TextBase title={'DD/MM/YYYY'} style={[styles.time, { color: colors.inputBorderColor }]} />
                  }
                </TouchableOpacity>
              </View>
                {/** */}
                <TextBase title={'Đã thanh toán'} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(10)
                }} />
                <TextInput
                style={styles.inputStyle}
                onChangeText={text => setDeposit(parseFloat(text))}
                value={`${getMoneyFormat(deposit.toString())} VND`}
                placeholder='Đặt cọc'
                placeholderTextColor={colors.grayColor}
            />
            <TextBase title={'Tổng hoá đơn:   '} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(10)
                }} >
                    <TextBase title={`${getMoneyFormat(totalPrice.toString())} VND`} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(10)
                }} />
                </TextBase>
        </View>)
    }
    const onNextPress=()=>{
        console.log('data', {
            customer: {
                name: customerName,
                phoneNumber:customerPhoneNumber,
                address: customerAddress
            },
            items: itemsList,
            totalPrice,
            startDate,
            endDate,
            deposit
        });
        
    }
    return (
        <SafeAreaView style={styles.container}>
            <DropdownListNew ref={dropRef} />
            <HeaderView title='Hoá đơn' />
            <ScrollView style={{ flex: 1 }}>
                {renderForm()}
            </ScrollView>

            <BaseButton title={type == 'edit' ? 'Cập nhật' : 'Tạo mới'}  style={{
                width: verticalScale(150),
                alignSelf:'center',
                alignItems: 'center',
                justifyContent:'center',
                marginVertical:verticalScale(10)
            }}
            onPress={onNextPress}
            />
        </SafeAreaView>
    );
}
export default BillCreateEdit;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    menu: {
        width: verticalScale(50),
        height: verticalScale(50),
        overflow: 'hidden',
        margin: verticalScale(16)
    },
    customerInfo: {
        // flexDirection:'row'
    },
    inputStyle: {
        backgroundColor: 'white',
        marginBottom: verticalScale(20),
        paddingHorizontal: verticalScale(8),
        flexDirection: 'row',
        height: verticalScale(40),
        borderColor: colors.mainGreyColor,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: verticalScale(15),
        fontFamily: 'Pattaya-Regular',
        fontWeight: '500',
        color:colors.inputColor
    },
    erCard: {
        marginHorizontal: verticalScale(12),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.borderColor,
        width: verticalScale(319),
        height: verticalScale(44),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(10),
        backgroundColor: 'white',
        paddingHorizontal: verticalScale(8)
    },
    text: {
        fontSize: verticalScale(15),
        fontFamily: 'Pattaya-Regular',
        fontWeight: '500',
        flex: 1,
        color:colors.inputColor
    },
    categoriesView: {
        backgroundColor: 'white',
        marginHorizontal: verticalScale(16),
        marginTop: verticalScale(10),
    },
    textContentFourView: {
        backgroundColor: 'white',
        borderRadius: verticalScale(6),
        borderWidth: 1,
        borderColor: 'rgb(214, 214, 214)',
        borderStyle: 'solid',
        minHeight: verticalScale(60),
        maxHeight: verticalScale(75)
    },
    tenDoanhNghiepText: {
        fontSize: verticalScale(15),
        fontWeight: 'bold',
        marginLeft: verticalScale(4),
        marginRight: verticalScale(2),
        marginBottom: verticalScale(8),
        marginTop: verticalScale(6),
    },
    row:{
        flexDirection:'row'
    },
    timePicker: {
        flex: 1,
        height: verticalScale(50),
        borderWidth: verticalScale(1),
        marginHorizontal: verticalScale(8),
        marginLeft: 0,
        borderRadius: verticalScale(8),
        borderColor: colors.inputBorderColor,
        backgroundColor:'white'
      },
      time: {
        margin: verticalScale(16),
        marginHorizontal: verticalScale(24)
    },
    datePickerStyle: {
        width: 230,
      },
})