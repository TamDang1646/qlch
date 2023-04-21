import React from 'react';

import {
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StatusBarStyle,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../constants/colors';
import NavigationService from '../navigation/NavigationService';
import { routes } from '../navigation/Routes';
import { verticalScale } from './Scales';
import TextBase from './TextBase';

const DEVICE_HEIGHT = Dimensions.get('window').height

interface Props {
    iconLeft?: string
    onPressLeft?: Function
    iconRight?: string
    onPressRight?: Function
    title: string,
    titleStyle?: TextStyle,
    safeAreaViewStyle?: ViewStyle,
    iconLeftStyle?: ViewStyle,
    iconRightStyle?: ViewStyle,
    barStyle?: StatusBarStyle,
    renderRight?: Function,
    isER?: boolean;
    iconLeftColor?: string;
}

function HeaderView(props: Props) {
    const { iconLeft, iconLeftColor, onPressLeft, iconRight, onPressRight, title, titleStyle, safeAreaViewStyle, iconLeftStyle, iconRightStyle, barStyle, renderRight, isER = true } = props;
    const navigation = useNavigation();

    const goBack = () => {
        if (onPressLeft) {
            onPressLeft?.();
        } else {
            try {
                NavigationService.back();
            } catch (error) {
                NavigationService.replace(routes.HOME_SCREEN, { screen: 'HOME_SCREEN' });
            }
        }
    }
    return (
        <View style={[styles.safeAreaViewStyle, { borderBottomWidth: 1, borderBottomColor: colors.inputBorderColor }, safeAreaViewStyle]}>
            <StatusBar barStyle={barStyle || 'dark-content'} translucent={true} hidden={false} backgroundColor={'transparent'} />
            <SafeAreaView style={[styles.container, DeviceInfo.isTablet() ? { alignItems: 'center' } : {}]}>
                {
                    // iconLeft ? (
                        <TouchableOpacity onPress={goBack} style={{ width: verticalScale(30), height: verticalScale(30), paddingTop: verticalScale(5),alignItems:'center' }}>
                            {/* <Icon name={iconLeft} size={verticalScale(15)} color={iconLeftColor ? iconLeftColor : 'black'} style={iconLeftStyle} /> */}
                            <FontAwesomeIcon icon={faAngleLeft} size={30} color='black'/>
                        </TouchableOpacity>
                    // ) : null
                }
                <TextBase title={title} style={[styles.title, { color: 'black' }, titleStyle]} ellipsizeMode={'tail'} numberOfLines={1} />
                {
                    renderRight ? renderRight() : (
                        <TouchableOpacity onPress={() => onPressRight?.()}>
                            {/* <Icon name={iconRight || ''} size={verticalScale(15)} color={isER ? 'white' : 'black'} style={iconRightStyle} /> */}
                        </TouchableOpacity>
                    )
                }
            </SafeAreaView>
        </View>
    );
}
export default React.memo(HeaderView)
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: verticalScale(10),
        height: Platform.OS == 'android' ? verticalScale(60) + verticalScale(StatusBar.currentHeight) : DEVICE_HEIGHT > 780 ? verticalScale(80) : verticalScale(60)
    },
    safeAreaViewStyle: {
        paddingTop: Platform.OS == 'android' ? verticalScale(StatusBar.currentHeight) + verticalScale(15) : 0,
        height: Platform.OS == 'android' ? verticalScale(60) + verticalScale(StatusBar.currentHeight) : DEVICE_HEIGHT > 780 ? verticalScale(80) : verticalScale(60),
    },
    iconLeft: {
        width: verticalScale(20),
        height: verticalScale(15),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    iconRight: {
        width: verticalScale(20),
        height: verticalScale(15),
        resizeMode: 'contain',
    },
    title: {
        fontSize: verticalScale(18),
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
})
