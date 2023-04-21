import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import R from '../components/R';
import BillCreateEdit from '../screens/BillScreen/BillCreateEdit';
import BillScreen from '../screens/BillScreen/BillScreen';
import CustomerScreen from '../screens/CustomerScreen/CustomerScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import CustomDrawerContent from './CustomDrawerContent';
import { routes } from './Routes';

export const navigationRef: any = React.createRef();
export const isMountedRef: any = React.createRef();
const Drawer = createDrawerNavigator();

const MainStackDrawer = (params:any) => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                swipeEnabled: true,
                overlayColor: '0.7',
                drawerPosition: 'left',
                drawerType: 'front',
                drawerStyle: {
                    width: R.DEVICE_WIDTH * 3 / 4
                }
            }}
            drawerContent={() => <CustomDrawerContent />}
        >
            <Drawer.Screen name={routes.HOME_SCREEN} component={MainStack} initialParams={params.route.params}/>
        </Drawer.Navigator>
    );
}
const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
            {/* <Drawer.Screen name="Article" component={Article} /> */}
        </Stack.Navigator>
    );
}

const MStack = createStackNavigator();
const MainStack = (params:any) => {
    return (
        <MStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            // initialRouteName={routes.HOME_SCREEN}
        >
            <MStack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
            <MStack.Screen name={routes.PRODUCT_SCREEN} component={ProductScreen} />
            <MStack.Screen name={routes.BILL_SCREEN} component={BillScreen} />
            <MStack.Screen name={routes.BILL_CREATE_EDIT_SCREEN} component={BillCreateEdit} />
            <MStack.Screen name={routes.CUSTOMER_SCREEN} component={CustomerScreen} />
        </MStack.Navigator>
    )
}
export { AuthStack, MainStackDrawer };

