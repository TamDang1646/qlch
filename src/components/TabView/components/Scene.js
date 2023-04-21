import React, { useState } from "react";

import equals from "react-fast-compare";
import {
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";

interface SceneProps {
   ladyLoad: Boolean;
   tab: Object;
   index: Number;
 }
 
 Scene.defaultProps = {
   ladyLoad: false,
 };
 
 function Scene(props?: SceneProps) {
   const { tab, ladyLoad, currentTab, index } = props;
   const [isLoad, setIsLoad] = useState(!ladyLoad);
 
   useAnimatedReaction(() => {
     return currentTab.value === index;
   }, isForcustab => {
     if (isForcustab && !isLoad) {
       runOnJS(setIsLoad)(true);
     }
   }, [isLoad, index]);
 
   return isLoad && tab;
 }
 
 export default React.memo(Scene, equals);
 