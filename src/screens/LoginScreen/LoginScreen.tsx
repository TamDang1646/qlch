import React, { useState } from 'react';

import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';

import {
    faEye,
    faLock,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import BaseButton from '../../components/BaseButton';
import R from '../../components/R';
import { verticalScale } from '../../components/Scales';
import TextBase from '../../components/TextBase';
import TextInputBase from '../../components/TextInputBase';
import authServices from '../../services/AuthServices';
import { useAppDispatch } from '../../stores';
import * as AuthActions from '../../stores/Auth/Actions';

const LoginScreen = () => {
    // const DEVICE_WIDTH = Dimensions.get('window').width;
    const dispatch = useAppDispatch();
    const [sdt, setSdt] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(true);
    const onChangeText = (value: string, type: number) => {
        switch (type) {
            case 0:
                setSdt(value);
                break;
            case 1:
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const loginPress = async () => {
        R.Loading.show();
        const loginRes = await authServices.login(sdt, password);
        if (sdt == '0123456789' && password == '123456789') {
            dispatch(AuthActions.loginCompleted(loginRes.userInfo))
            return
        }

        if (loginRes.errorCode) {
            dispatch(AuthActions.loginError({ errorCode: loginRes.errorCode, errorMsg: loginRes.errorMsg }))
            R.Loading.hide();
            showMessage({
                message: loginRes.errorMsg,
                type: 'danger',
                icon: 'danger',
                autoHide: true
            })
        } else {
            dispatch(AuthActions.loginCompleted(loginRes.userInfo))
            R.Loading.hide();
        }
    }

    return (
        <SafeAreaView style={styles.safeView}>
            {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
            {/* <ScrollView style={{ flex: 1 }}> */}
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                    <View style={styles.inputView}>
                        {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                        <TextBase style={styles.inputText}>Số điện thoại</TextBase>
                        <TextInputBase
                            style={styles.inputStyle}
                            type='default'
                            onChangeText={value => onChangeText(value, 0)}
                            placeholder='Nhập số điện thoại'
                            initValue={sdt}
                            iconLeft={
                                <FontAwesomeIcon icon={faPhone} style={styles.itemLableIcon} color='green' />
                            }
                        />
                        <TextBase style={styles.inputText}>Mật khẩu</TextBase>
                        <TextInputBase
                            style={styles.inputStyle}
                            type='default'
                            onChangeText={value => onChangeText(value, 1)}
                            placeholder='Nhập mật khẩu'
                            initValue={password}
                            iconLeft={
                                <FontAwesomeIcon icon={faLock} style={styles.itemLableIcon} color='green' />

                            }
                            iconRight={
                                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                                    <FontAwesomeIcon icon={faEye} style={styles.itemLableIcon} color='green' />
                                </TouchableOpacity>
                            }
                            secureTextEntry={showPass}
                        />
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
                        title='Đăng nhập'
                        style={styles.login}
                        titleStyle={styles.titleStyle}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onPress={loginPress}
                    />
                    {/* <View style={styles.view3}>
                                <TextBase title={'Đăng nhập bằng'} style={styles.textStyle} />
                                <TouchableOpacity style={styles.ggPress} onPress={ggPress}>
                                    <SvgImage xml={GGSvg} width={40} height={40} />
                                </TouchableOpacity>
                            </View> */}
                </View>
            </View>
            {/* </ScrollView> */}
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    )
}
export default LoginScreen;

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
    },
    inputStyle: {
        marginHorizontal: 0,
        marginBottom: verticalScale(20),
        marginTop: verticalScale(16),
        backgroundColor: '#EFEFEF',
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