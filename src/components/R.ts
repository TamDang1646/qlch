import { Dimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const TABBAR_HEIGHT = 60;
const Loading: any = null;
const Popup: any = null;
const Alert: any = null;
const R = {
    DEVICE_HEIGHT,
    TABBAR_HEIGHT,
    DEVICE_WIDTH,
    Loading,
    showMessage,
    Popup,
    Alert
}
export default R