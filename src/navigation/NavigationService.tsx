// import { NavigationActions, StackActions } from 'react-navigation';
import * as React from 'react';

import {
  CommonActions,
  StackActions,
  TabActions,
} from '@react-navigation/native';

export const navigationRef: any = React.createRef();
export const isMountedRef: any = React.createRef();

function navigate(routeName: string, params?: any) {
  // console.log("navigate to", routeName, params);
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    // console.log("navigate to", routeName, params, navigationRef.current);
    navigationRef.current.navigate(routeName, params);
    // navigationRef.current.dispatch(StackActions.push(routeName, params));
  } else {
    console.log(
      'can not navigate',
      isMountedRef.current,
      navigationRef.current,
      routeName,
      params
    );
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
function getCurrentRouteName(): string {
  // navigationRef.current.routes
  if (isMountedRef.current && navigationRef.current) {
    let rootState = navigationRef.current.getRootState();
    return getActiveRouteName(rootState);
    // let route = rootState.routes[rootState.index];

    // while (route.state) {
    //   route = route.state.routes[route.state.index];
    // }
    // // console.log('getCurrentRouteName', route);
    // return route.name;
  }
  return '';
}
function canGoBack() {
  if (isMountedRef.current && navigationRef.current) {
    return navigationRef.current.canGoBack();
  }
  console.log('Can not go back.', isMountedRef, navigationRef);
  return false;
  // return _navigator.state.nav.routes[0].index > 0;
}
function back() {
  // navigationRef.current?.back();
  if (canGoBack()) {
    // Perform navigation if the app has mounted
    // console.log('[Tuan Bui] go back from ',getCurrentRouteName());
    navigationRef.current.goBack();
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
  // console.log("[Tuan Bui] going back from: ", _navigator.state.nav, _navigator.state.nav.routes[0].routes[ _navigator.state.nav.routes[0].index].routeName);
  // _navigator.dispatch(
  //   NavigationActions.back()
  // );
}
function replace(routeName: string, params?: any) {
  let currentRoute = getCurrentRouteName();
  console.log('replacing to', routeName, currentRoute, params);
  if (currentRoute == routeName || (params && params.screen == currentRoute)) {
    console.log('replace do nothing.');
    return;
  }
  if (isMountedRef.current && navigationRef.current) {
    // console.log("replace to", routeName, params);
    navigationRef.current.dispatch(StackActions.replace(routeName, params));
  }
}

function reset(routeName: string) {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: routeName },
      ],
    })
  );
}

function popUpToTop() {
  if (isMountedRef.current && navigationRef.current) {
    if (canGoBack()) {
      // console.log("popUpToTop");
      navigationRef.current.dispatch(StackActions.popToTop());
    }
  }
}

function jumpTo(routeName: string, params?: any) {
  if (isMountedRef.current && navigationRef.current) {
    // console.log("jumpTo to", routeName, params);
    navigationRef.current.dispatch(TabActions.jumpTo(routeName, params));
  }
}
// add other navigation functions that you need and export them
// Gets the current screen from navigation state
function getActiveRouteName(state: any): string {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
}

function push(routeName: string, params?: any) {
  // console.log("navigate to", routeName, params);
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    // console.log("navigate to", routeName, params, navigationRef.current);
    // navigationRef.current.navigate(routeName, params);
    navigationRef.current.dispatch(StackActions.push(routeName, params));
  } else {
    console.log(
      'can not navigate',
      isMountedRef.current,
      navigationRef.current,
      routeName,
      params
    );
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export default {
  replace,
  back,
  navigate,
  canGoBack,
  jumpTo,
  getCurrentRouteName,
  getActiveRouteName,
  popUpToTop,
  reset,
  push
};
