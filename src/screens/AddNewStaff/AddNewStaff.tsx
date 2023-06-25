import React from 'react';

import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import {
    faEye,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import BaseButton from '../../components/BaseButton';
import HeaderView from '../../components/HeaderView';
import R from '../../components/R';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import { colors } from '../../constants';
import NavigationService from '../../navigation/NavigationService';
import authServices from '../../services/AuthServices';

interface Props {
    route: any
}
const AddNewStaffScreen = (props: Props) => {
    // const DEVICE_WIDTH = Dimensions.get('window').width;
    const { item } = props.route?.params;
    const [sdt, setSdt] = React.useState<any>('');
    const [password, setPassword] = React.useState<any>('');
    const [showPass, setShowPass] = React.useState(true);
    const [type, setType] = React.useState<any>(0)

    React.useEffect(() => {
        if (item?.id) {
            setSdt(item.phoneNumber)
            setPassword(item.password)
            setType(item.role)
        }
    }, [item])
    console.log('ite', sdt);

    const registerPress = async () => {
        console.log('registerPress');
        if (!sdt || sdt.trim().length < 10) {
            R.showMessage({
                message: 'Số điện thoại không đúng',
                type: 'danger',
                icon: 'danger',
                autoHide: true,
            });
            return;
        }
        if (!password || password.trim().length < 8) {
            R.showMessage({
                message: 'Mật khẩu không phù hợp',
                type: 'danger',
                icon: 'danger',
                autoHide: true,
            });
            return;
        }
        const data = {
            phoneNumber: sdt,
            password,
            rePassword: password,
            role: type
        }
        R.Loading.show()
        if (!item?.id) {
            const registerRes = await authServices.register(data);
            if (registerRes.errorCode) {
                R.Loading.hide()
                if (registerRes.errorCode != 2005) {
                    R.showMessage({
                        message: registerRes.errorMsg,
                        type: 'danger',
                        icon: 'danger',
                        autoHide: true,
                    });

                } else {
                    R.showMessage({
                        message: 'Số điện thoại đã được đăng ký bởi người khác',
                        type: 'danger',
                        icon: 'danger',
                        autoHide: true,
                    });
                }
            } else {
                R.showMessage({
                    message: 'Thêm mới thành công',
                    type: 'success',
                    icon: 'success',
                    autoHide: true,
                });
                NavigationService.back()
                R.Loading.hide()
            }
            return
        } else {
            const registerRes = await authServices.updatePassword({ ...data, newPassword: data.password });
            if (registerRes.errorCode) {
                R.showMessage({
                    message: registerRes.errorMsg,
                    type: 'danger',
                    icon: 'danger',
                    autoHide: true,
                });
                R.Loading.hide()
            } else {
                R.showMessage({
                    message: 'Cập nhật thành công',
                    type: 'success',
                    icon: 'success',
                    autoHide: true,
                });
                NavigationService.back()
                R.Loading.hide()
            }



        }
    }

    const types = ['Admin', 'Nhân viên']
    const renderForm = () => {
        return
    }
    return (
        <SafeAreaView style={styles.safeView}>
            <HeaderView title={!item?.id ? 'Thêm nhân viên' : 'Cập nhật tài khoản'} />

            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                    <View style={styles.inputView}>
                        {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                        <TextBase style={styles.inputText}>Số điện thoại</TextBase>
                        <View style={styles.inputStyleView}>
                            <FontAwesomeIcon icon={faLock} style={styles.itemLableIcon} color='green' />
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={setSdt}
                                value={sdt}
                                placeholder='Nhập SDT'
                                placeholderTextColor={colors.grayColor}
                                editable={item?.id ? false : true}
                            />
                        </View>
                        <TextBase style={styles.inputText}>Mật khẩu</TextBase>
                        <View style={styles.inputStyleView}>
                            <FontAwesomeIcon icon={faLock} style={styles.itemLableIcon} color='green' />
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={setPassword}
                                value={password}
                                placeholder='Nhập mật khẩu'
                                placeholderTextColor={colors.grayColor}
                                secureTextEntry={showPass}
                            />
                            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                                <FontAwesomeIcon icon={faEye} style={styles.itemLableIcon} color='green' />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

                            <TextBase title={'Tài khoản:'} style={{
                                fontSize: verticalScale(18),
                                marginBottom: verticalScale(8),
                                marginRight: verticalScale(16)
                            }} />
                            <SelectDropdown
                                data={types}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setType(index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                                defaultButtonText='Chọn loại tài khoản'
                                defaultValue={types[type]}
                            />
                        </View>
                        {/* <TouchableOpacity
                            style={styles.touchableOpacity}
                            onPress={forgotPassPress}
                        >
                            <TextBase
                                title='Quên mật khẩu?'
                                style={styles.forgot}
                            />
                        </TouchableOpacity> */}
                        {/* </KeyboardAvoidingView> */}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.actionView}>
                    <BaseButton
                        title={!item?.id ? 'Đăng ký' : 'Cập nhật'}
                        style={styles.login}
                        titleStyle={styles.titleStyle}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onPress={registerPress}
                    />
                    {/* <View style={styles.view3}>
                                <TextBase title={'Đăng nhập bằng'} style={styles.textStyle} />
                                <TouchableOpacity style={styles.ggPress} onPress={ggPress}>
                                    <SvgImage xml={GGSvg} width={40} height={40} />
                                </TouchableOpacity>
                            </View> */}
                </View>
            </View>
        </SafeAreaView>
    )
}
export default AddNewStaffScreen;

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(60),
        // borderWidth: 1,
    },
    logo: {
        flex: 2.5,
        alignSelf: 'center',
        justifyContent: 'center',
        // marginTop: verticalScale(100)
    },
    inputView: {
        // flex: 3,
        marginHorizontal: verticalScale(16),
        // borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    actionView: {
        // flex: 3,
        alignItems: 'center',
    },
    inputText: {
        fontSize: verticalScale(20),
        // fontWeight: '100',
        fontFamily: 'Pattaya-Regular',
        marginVertical: verticalScale(10)
    },
    inputStyle: {
        flex: 1,
        // borderWidth: 1,
        paddingVertical: 0,
        fontSize: verticalScale(16),
        marginVertical: 0
        // marginHorizontal: 0,
        // marginBottom: verticalScale(20),
        // marginTop: verticalScale(16),
    },
    inputStyleView: {
        flexDirection: 'row',
        height: verticalScale(46),
        marginBottom: verticalScale(16),
        borderColor: colors.mainGreyColor,
        borderWidth: 1,
        borderRadius: 10,
        padding: verticalScale(8),
        alignItems: 'center',
        textAlign: 'center',
        width: verticalScale(343)

    },
    forgot: {
        // marginTop: verticalScale(20),
        fontSize: verticalScale(16),
        fontWeight: 'bold',
        color: '#85DAFF'
    },
    touchableOpacity: {
        alignSelf: 'flex-end',
    },
    login: {
        width: verticalScale(315),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    titleStyle: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',
    },
    view3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(20),
        marginTop: verticalScale(50)
        // borderWidth: 1,
    },
    ggPress: {
        marginLeft: verticalScale(16),
        // width: verticalScale(40),
        // height: verticalScale(40),
        // borderWidth: 1,
        // borderRadius: verticalScale(20),
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    signin: {
        fontSize: verticalScale(16),
        fontWeight: 'bold',
        color: '#FF7DC3'
    },
    textStyle: {
        fontSize: verticalScale(16),
        color: '#9A9999'
    },
    itemLableIcon: {
        marginRight: verticalScale(8)
    }
}) 