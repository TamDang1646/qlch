import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  setItem = async (name: string, obj: any) => {
    try {
      await AsyncStorage.setItem(name, obj);
    } catch (e) {
      console.log('[YixiiDev] LocalStorage Save Error: ' + name, obj);
    }
  };

  getItem = async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value) {
        // value previously stored
        return value;
      }
      return '';
    } catch (e) {
      // error reading value
      console.log('[YixiiDev] LocalStorage Read Error: ' + name);
    }
    return '';
  };
  getItemAsyn = (name: string) => {
    return AsyncStorage.getItem(name);
  };

  removeItem = async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.log('[YixiiDev] LocalStorage removeItem Error: ' + name);
    }
  };
}

const _localStorage = new LocalStorage();

export default _localStorage;
