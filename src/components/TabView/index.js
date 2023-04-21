import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";

import equals from "react-fast-compare";
import {
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";

import { colors } from "../../constants";
import { verticalScale } from "../Scale";
import Scenes from "./Scenes";
import Tabbar from "./Tabbar";

const { width } = Dimensions.get("window");
 
 interface ScrollTabViewProps {
   containerWidth?: Number;
   locked?: Boolean;
   initialPage?: Number;
   ladyLoad?: Boolean;
   tabletZoom?: Boolean;
   onChangeTab?: (tab: any) => void;
   children: React.ReactElement[]
 }
 
 function ScrollTabViewComponent(props?: ScrollTabViewProps, ref) {
   const { children, locked, initialPage, ladyLoad, tabletZoom, onChangeTab } = props;
   const [containerWidth, setContainerWidth] = useState(props.containerWidth);
   const translateX = useSharedValue(0);
   const isScrolling = useSharedValue(0);
   const currentTab = useSharedValue(0);
   const pageScrollRef = useAnimatedRef();
 
   const _children = useCallback(() => {
     return React.Children.map(children, child => child);
   });
 
   const scrollToPage = position => {
     pageScrollRef.current && pageScrollRef.current.scrollTo({ x: position, animated: false });
   };
 
   const onLayout = event => {
     const { layout } = event.nativeEvent;
     if (layout && layout.width > 0) {
       setContainerWidth(layout.width);
     }
   };
 
   useImperativeHandle(ref, () => ({
     goToPage: page => {
       scrollToPage(page * containerWidth);
     },
   }), [containerWidth]);
 
   useAnimatedReaction(() => {
     return currentTab.value;
   }, (newTab, oldTab) => {
     if (newTab !== oldTab && onChangeTab) {
       runOnJS(onChangeTab)({ i: newTab });
     }
   });
 
   return (
     <View onLayout={onLayout} style={styles.container}>
       <Tabbar
         tabs={_children()}
         containerWidth={containerWidth}
         translateX={translateX}
         currentTab={currentTab}
         scrollToPage={scrollToPage}
         tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
         tabBarBackgroundColor={"transparent"}
         tabBarActiveTextColor={"black"}
         tabBarInactiveTextColor={"black"}
         tabBarTextStyle={{ fontSize: verticalScale(13) }}
         tabsContainerStyle={styles.tabsContainerStyle}
       />
       <Scenes
         tabs={_children()}
         containerWidth={containerWidth}
         translateX={translateX}
         isScrolling={isScrolling}
         currentTab={currentTab}
         pageScrollRef={pageScrollRef}
         locked={locked}
         initialPage={initialPage}
         ladyLoad={ladyLoad}
       />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   tabBarUnderlineStyle: {
     height: verticalScale(2),
     backgroundColor: colors.mainColor,
   },
   tabsContainerStyle: {
     borderBottomWidth: 1,
     borderBottomColor: colors.borderGreyColor,
     height: verticalScale(60),
   }
 });
 
 const ScrollTabView = forwardRef(ScrollTabViewComponent);
 
 ScrollTabView.defaultProps = {
   containerWidth: width,
   locked: false,
   initialPage: 0,
   ladyLoad: true,
   tabletZoom: false,
 };
 
 export default React.memo(ScrollTabView, equals);
 