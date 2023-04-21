//Setup Tutorial https://www.reactnativeschool.com/install-and-use-reactotron-for-debugging
import Reactotron from 'reactotron-react-native';

const dev = __DEV__;

function configure() {
    Reactotron
        .configure()
        // .configure({host:'192.168.1.65'}) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
    // .use(sagaPlugin())
    // .use(reactotronRedux())
    connectConsoleToReactotron()
    return Reactotron.connect()
}
function connectConsoleToReactotron() {
    console.log = Reactotron.log;
    if (!dev) return
    //  console.log = Reactotron.log;
    // console.warn = Reactotron.warn;
    // console.error = Reactotron.error;
}

export default {
    configure,
}
