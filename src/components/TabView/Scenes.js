import React from "react";

import equals from "react-fast-compare";
import {
  ScrollViewProps,
  View,
} from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

import Scene from "./components/Scene";

interface ScenesProps {
   tabs: any[];
   containerWidth: Number;
   translateX: Animated.SharedValue<Number>;
   isScrolling: Animated.SharedValue<Number>;
   currentTab: Animated.SharedValue<Number>;
   locked: Boolean;
   contentProps: ScrollViewProps;
   initialPage: Number;
   ladyLoad: Boolean;
 }
 
 Scenes.defaultProps = {
   locked: false,
   ladyLoad: false,
 };
 
 function Scenes(props?: ScenesProps) {
   const {
     tabs,
     containerWidth,
     translateX,
     isScrolling,
     currentTab,
     pageScrollRef,
     locked,
     contentProps,
     initialPage,
     ladyLoad,
   } = props;
   const numberTab = tabs.length;
 
   const scrollHandler = useAnimatedScrollHandler({
     onScroll: event => {
       translateX.value = event.contentOffset.x;
       if (!isScrolling.value) {
         const tabIndex = Math.round(translateX.value / containerWidth);
         currentTab.value = Math.max(0, Math.min(tabIndex, numberTab));
       }
     },
     onBeginDrag: e => {
       isScrolling.value = true;
     },
     onEndDrag: e => {
       isScrolling.value = false;
     },
   });
 
   return (
     <Animated.ScrollView
       scrollEnabled={!locked}
       ref={pageScrollRef}
       scrollEventThrottle={16}
       onScroll={scrollHandler}
       showsHorizontalScrollIndicator={false}
       snapToInterval={containerWidth}
       bounces
       horizontal
       pagingEnabled
       overScrollMode='never'
       disableIntervalMomentum
       decelerationRate='fast'
       directionalLockEnabled
       alwaysBounceVertical={false}
       scrollsToTop={false}
       contentOffset={{ x: initialPage * containerWidth }}
       {...contentProps}
     >
       {
         tabs.map((tab, index) => (
           <View style={[{ width: containerWidth }]} key={`index_${index}`}>
             <Scene tab={tab} ladyLoad={ladyLoad} currentTab={currentTab} index={index} />
           </View>
         ))
       }
     </Animated.ScrollView>
   );
 }
 
 export default React.memo(Scenes, equals);
 