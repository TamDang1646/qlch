import React, { useState } from 'react';

import equals from 'react-fast-compare';
import {
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { verticalScale } from '../Scale';
import TabLabelButton from './components/TabLabelButton';

interface TabbarProps {
   tabs: any[];
   containerWidth: Number;
   translateX: Animated.SharedValue<Number>;
   currentTab: Animated.SharedValue<Number>;
 }
 
 Tabbar.defaultProps = {
 
 };
 
 function Tabbar(props?: TabbarProps) {
   const {
     tabs,
     containerWidth,
     translateX,
     currentTab,
     scrollToPage,
     tabBarUnderlineStyle,
     tabBarBackgroundColor,
     tabBarActiveTextColor,
     tabBarInactiveTextColor,
     tabBarTextStyle,
     tabsContainerStyle,
   } = props;
   const tabsLength = tabs.length;
   const [tabsLayout, setTabLayout] = useState(() => {
     const tabsData = {};
     tabs.forEach((_, idx) => {
       tabsData[idx] = { x: 0, width: 0 };
     });
 
     return tabsData;
   });
 
   const tabScrollRef = useAnimatedRef();
   const tabTranslateX = useSharedValue(0);
 
   const onPressTab = (_, index) => {
     scrollToPage(containerWidth * index);
   };
 
   const onTablabelLayout = ({ index, data }) => {
     setTabLayout(preState => {
       return {
         ...preState,
         [index]: data
       };
     });
   };
 
   const tabbarScrollTo = position => {
     tabScrollRef.current && tabScrollRef.current.scrollTo({ x: position, animated: true });
   };
 
   useAnimatedReaction(() => {
     return currentTab.value;
   }, tab => {
     const tabLayout = tabsLayout[tab];
     if (tabLayout) {
       const position = tabLayout.x + tabLayout.width / 2;
       if (position > containerWidth / 2) {
         const nextScroll = position - containerWidth / 2;
         runOnJS(tabbarScrollTo)(nextScroll);
       } else if (tabTranslateX.value > 0) {
         runOnJS(tabbarScrollTo)(0);
       }
     }
   });
 
   const scrollHandler = useAnimatedScrollHandler({
     onScroll: event => {
       tabTranslateX.value = event.contentOffset.x;
     },
   });
 
   const indicatorStyle = useAnimatedStyle(() => {
     if (translateX.value % containerWidth === 0 && tabsLayout[currentTab.value]) {
       return {
         left: tabsLayout[currentTab.value].x,
         width: tabsLayout[currentTab.value].width,
       };
     }
 
     const nextTab = translateX.value > currentTab.value * containerWidth ? currentTab.value + 1 : currentTab.value - 1;
     const toTab = Math.min(tabsLength - 1, Math.max(0, nextTab));
     const currentTabLeft = tabsLayout[currentTab.value] ? tabsLayout[currentTab.value].x : 0;
     const currentTabWidth = tabsLayout[currentTab.value] ? tabsLayout[currentTab.value].width : 0;
     const nextTabLeft = tabsLayout[toTab] ? tabsLayout[toTab].x : 0;
     const nextTabWidth = tabsLayout[toTab] ? tabsLayout[toTab].width : 0;
     const left = interpolate(translateX.value, [currentTab.value * containerWidth, toTab * containerWidth], [currentTabLeft, nextTabLeft]);
     const width = interpolate(translateX.value, [currentTab.value * containerWidth, toTab * containerWidth], [currentTabWidth, nextTabWidth]);
 
     return {
       left,
       width,
     };
   }, [tabsLayout]);
 
   const indicatorScrollStyle = useAnimatedStyle(() => {
     return {
       transform: [
         { translateX: -tabTranslateX.value }
       ]
     };
   });
 
   return (
     <View style={[styles.container, tabsContainerStyle]}>
       <Animated.ScrollView
         horizontal
         scrollEventThrottle={16}
         showsHorizontalScrollIndicator={false}
         onScroll={scrollHandler}
         ref={tabScrollRef}
         contentContainerStyle={styles.viewContent}
       >
         {
           tabs.map((tab, index) => (
             <TabLabelButton
               key={`index_${index}`}
               label={tab.props.tabLabel || ''}
               currentTab={currentTab}
               index={index}
               onPress={() => onPressTab(tab, index)}
               onTablabelLayout={onTablabelLayout}
               tabBarBackgroundColor={tabBarBackgroundColor}
               tabBarActiveTextColor={tabBarActiveTextColor}
               tabBarInactiveTextColor={tabBarInactiveTextColor}
               tabBarTextStyle={tabBarTextStyle}
             />
           ))
         }
       </Animated.ScrollView>
       <Animated.View
         style={[
           styles.indicator,
           tabBarUnderlineStyle,
           indicatorStyle,
           indicatorScrollStyle
         ]}
       />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     height: verticalScale(44),
   },
   indicator: {
     position: 'absolute',
     height: verticalScale(2),
     width: verticalScale(1),
     backgroundColor: 'white',
     bottom: 0,
   },
   viewContent: {
     paddingHorizontal: verticalScale(6),
   }
 });
 
 export default React.memo(Tabbar, equals);
 