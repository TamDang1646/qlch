import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import BaseButton from '../../components/BaseButton';
import HeaderView from '../../components/HeaderView';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import NavigationService from '../../navigation/NavigationService';
import userService from '../../services/UserService';

interface Props {
    route: any
}
const CustomerEdit = (props: Props) => {
    const { item, callback } = props.route.params;
    const [customerName, setCustomerName] = React.useState<string>('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = React.useState<string>('');
    const [customerAddress, setCustomerAddress] = React.useState<string>('');
    React.useEffect(() => {
        if (item?.id) {
            setCustomerName(item?.name)
            setCustomerPhoneNumber(item?.phoneNumber)
            setCustomerAddress(item?.address)
        }
    }, [])
    const onNextPress = async () => {
        let data = {
            name: customerName,
            phoneNumber: customerPhoneNumber,
            address: customerAddress
        }

        if (item?.id) {
            console.log('update', data);
            const res = await userService.updateUserInfo(item.id, data);
            if (!res.errorCode) {
                showMessage({
                    message: 'Update succes!',
                    type: 'success',
                    icon: 'success',
                    autoHide: true
                })
                callback?.(res.userInfo);
                NavigationService.back()
            } else {
                showMessage({
                    message: res.errorMsg,
                    type: 'danger',
                    icon: 'danger',
                    autoHide: true
                })
            }

        } else {
            console.log('addd', data);
            const res = await userService.createUser(data);
            if (!res.errorCode) {
                showMessage({
                    message: 'Thêm mới thành công!',
                    type: 'success',
                    icon: 'success',
                    autoHide: true
                })
                callback?.();

                NavigationService.back()
            } else {
                showMessage({
                    message: res.errorMsg,
                    type: 'danger',
                    icon: 'danger',
                    autoHide: true
                })
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderView title='Chỉnh sửa khách hàng' />
            <View style={{ flex: 1, margin: verticalScale(16) }}>
                {/* <View style={styles.customerInfo}> */}
                <TextBase title={'Khách hàng'} style={{
                    fontSize: verticalScale(18),
                    marginBottom: verticalScale(10)
                }} />
                <TextBase title={'Họ tên khách hàng:'} style={{
                    fontSize: verticalScale(15),
                    marginBottom: verticalScale(10)
                }} />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setCustomerName(text)}
                    placeholderTextColor={colors.grayColor}
                    value={customerName}
                    placeholder='Nhập Họ tên Khách hàng'
                />
                <TextBase title={'Số điện thoại:'} style={{
                    fontSize: verticalScale(15),
                    marginBottom: verticalScale(10)
                }} />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setCustomerPhoneNumber(text)}
                    value={customerPhoneNumber}
                    placeholder='Số điện thoại'
                    placeholderTextColor={colors.grayColor}

                />
                <TextBase title={'Địa chỉ:'} style={{
                    fontSize: verticalScale(15),
                    marginBottom: verticalScale(10)
                }} />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text => setCustomerAddress(text)}
                    value={customerAddress}
                    placeholder='Địa chỉ'
                    placeholderTextColor={colors.grayColor}
                />
            </View>
            <BaseButton title={item?.id ? 'Cập nhật' : 'Thêm mới'} style={{
                width: verticalScale(150),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: verticalScale(10)
            }}
                onPress={onNextPress}
            />
        </SafeAreaView>
    )
}

export default CustomerEdit
const styles = StyleSheet.create({
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
        color: colors.inputColor
    },
})