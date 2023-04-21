import React, { useRef } from 'react';

import equals from 'react-fast-compare';
import {
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface TabLabelButtonProps {
   currentTab: Animated.SharedValue<Number>;
   index: Number;
   onPress: () => void;
   tabBarBackgroundColor: String;
   tabBarActiveTextColor: String;
   tabBarInactiveTextColor: String;
   tabBarTextStyle?: TextStyle;
 }
 
 TabLabelButton.defaultProps = {
   tabBarActiveTextColor: 'skyblue',
   tabBarInactiveTextColor: 'white',
 };
 
 const IS_IOS = Platform.OS === 'ios';
 
 function TabLabelButton(props?: TabLabelButtonProps) {
   const {
     label,
     currentTab,
     index,
     onPress,
     onTablabelLayout,
     tabBarBackgroundColor,
     tabBarActiveTextColor,
     tabBarInactiveTextColor,
     tabBarTextStyle,
   } = props;
   const refButton = useAnimatedRef();
   const buttonLayout = useRef();
   const labelLayout = useRef();
 
   const onLayoutButton = event => {
     const { layout } = event.nativeEvent;
     buttonLayout.current = layout;
 
     if (labelLayout.current) {
       onTablabelLayout({
         index,
         data: {
           x: layout.x + labelLayout.current.x,
           width: labelLayout.current.width,
         },
       });
     }
   };
 
   const onLayoutLabel = event => {
     const { layout } = event.nativeEvent;
     labelLayout.current = layout;
     if (buttonLayout.current) {
       onTablabelLayout({
         index,
         data: {
           x: buttonLayout.current.x + layout.x,
           width: layout.width,
         },
       });
     }
   };
 
   const titleStyle = useAnimatedStyle(() => {
     const isActive = currentTab.value === index;
 
     return {
       color: isActive ? tabBarActiveTextColor : tabBarInactiveTextColor,
     };
   });
 
   return (
     <TouchableOpacity
       onPress={onPress}
       style={[styles.container, { backgroundColor: tabBarBackgroundColor }]}
       ref={refButton}
       onLayout={onLayoutButton}
     >
       <View onLayout={onLayoutLabel} style={styles.viewTitle}>
         <Animated.Text
           style={[styles.title, tabBarTextStyle, titleStyle]}
         >
           {label}
         </Animated.Text>
       </View>
     </TouchableOpacity>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     justifyContent: 'center',
     alignItems: 'center',
     paddingHorizontal: 10,
   },
   viewTitle: {
 
   },
   title: {
     color: 'white',
     fontSize: 16,
     fontWeight: '400',
   }
 });
 
 export default React.memo(TabLabelButton, equals);
 