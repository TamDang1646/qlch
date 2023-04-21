import {
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const os = Platform.OS;
const widthScreen = Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height;
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
let heightCustom = 0;
heightCustom = 680 * 375 / 350;
//DeviceInfo.getModel() === 'iPhone X'
if (height === 812) //iphone X,11 Pro,Xs,
{
    heightCustom = 680;
} else if (height === 896) { // 11 pro max, XS max,11,xr
    heightCustom = 740;
} else {
    heightCustom = height;
}
const scale = (size: any) => width / guidelineBaseWidth * size;
// const verticalScale = (size: any) => heightCustom / guidelineBaseHeight * size; 
const verticalScale = (size: any) => size * widthScreen / (os === 'ios' ? 375 : 400)
const horizontalScale = (size: number) => size * height / (os === 'ios' ? 700 : 730.5);
const moderateScale = (size: any, factor: 0.5) => size + (scale(size) - size) * factor;

export {horizontalScale, moderateScale, scale, verticalScale};
