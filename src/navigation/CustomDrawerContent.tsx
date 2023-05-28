// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';

import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

import { verticalScale } from '../components/Scales';
import TextBase from '../components/TextBase';
import { images } from '../constants/images';
import {
    useAppDispatch,
    useAppSelector,
} from '../stores';
import * as AuthActions from '../stores/Auth/Actions';
import NavigationService from './NavigationService';
import { routes } from './Routes';

const CustomSidebarMenu = () => {
    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch();
    return (
        <SafeAreaView style={styles.container}>
            {/*Top Large Image */}
            {/* <View style={styles.user}> */}
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.linearGradient}>
                {/* Nội dung của component */}
                <View style={styles.userRole}>
                    <Image
                        source={images.img_default_avatar}
                        style={styles.sideMenuProfileIcon}
                    />
                    <Text style={styles.userText}>{state.auth.user?.role == 0 ? 'admin' : 'staff'}</Text>
                </View>
                <TextBase style={styles.userName}>{state.auth.user?.phoneNumber}</TextBase>
            </LinearGradient>
            {/* </View> */}
            <DrawerContentScrollView style={{
                marginTop: verticalScale(16)
            }}>
                <DrawerItem
                    label="Dashboard"
                    onPress={() => NavigationService.navigate(routes.HOME_SCREEN)}
                    style={styles.dashboard}
                    labelStyle={styles.lableStyle}
                />
                <DrawerItem
                    label="Products"
                    onPress={() => { NavigationService.navigate(routes.PRODUCT_SCREEN) }}
                    style={styles.dashboard}
                    labelStyle={styles.lableStyle}
                />
                <DrawerItem
                    label="Bills"
                    onPress={() => { NavigationService.navigate(routes.BILL_SCREEN) }}
                    style={styles.dashboard}
                    labelStyle={styles.lableStyle}
                />
                <DrawerItem
                    label="Customers"
                    onPress={() => { NavigationService.navigate(routes.CUSTOMER_SCREEN) }}
                    style={styles.dashboard}
                    labelStyle={styles.lableStyle}
                />
                <DrawerItem
                    label="Log Out"
                    onPress={() => { dispatch(AuthActions.logoutCompleted()) }}
                    style={styles.dashboard}
                    labelStyle={styles.lableStyle}
                />

            </DrawerContentScrollView>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: 'grey'
                }}>
                Q-Fashion
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC'
    },
    linearGradient: {
        height: verticalScale(200),
        // flex: 1
    },
    userRole: {
        flexDirection: 'row',
        // borderWidth: 1,
        flex: 1
    },
    userText: {
        // marginVertical: verticalScale(16),
        fontSize: verticalScale(16),
        alignSelf: 'center',
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Pattaya-Regular'

    },
    userName: {
        marginHorizontal: verticalScale(16),
        marginBottom: verticalScale(16),
        fontSize: verticalScale(20),
        color: 'white',
        fontFamily: 'Pattaya-Regular'

    },
    sideMenuProfileIcon: {
        resizeMode: 'stretch',
        width: verticalScale(120),
        height: verticalScale(120),
        borderRadius: verticalScale(120) / 2,
        borderColor: 'black',
        margin: verticalScale(16)
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dashboard: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'white'
    },
    lableStyle: {
        fontSize: verticalScale(18),
        // fontWeight: 'bold',
        fontFamily: 'Pattaya-Regular'
    }
});

export default CustomSidebarMenu;