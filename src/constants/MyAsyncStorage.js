import AsyncStorage from '@react-native-async-storage/async-storage';
import MyUtil from './MyUtil';

const _getAsyncStorage = async key => {
  try {
    MyUtil._consoleLog(`Getting data from AsyncStorage - key: ${key}`);
    const itemStr = await AsyncStorage.getItem(key);
    MyUtil._consoleLog(`Received data from AsyncStorage - itemStr: ${itemStr}`);

    if (itemStr !== null) {
      const item = JSON.parse(itemStr);
      return item;
    } else {
      return null;
    }
  } catch (error) {
    MyUtil._consoleLog(
      `Error while getting data from AsyncStorage - error: ${error}`,
    );
    throw error; // 에러를 호출하는 곳에서 처리
  }
};

const _writeAsyncStorage = async (key, data) => {
  try {
    MyUtil._consoleLog(`Writing data to AsyncStorage - key: ${key}`);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    MyUtil._consoleLog(
      `Written data to AsyncStorage - data: ${JSON.stringify(data)}`,
    );
  } catch (error) {
    MyUtil._consoleLog(
      `Error while writing data to AsyncStorage - error: ${error}`,
    );
    throw error; // 에러를 호출하는 곳에서 처리
  }
};

export {_getAsyncStorage, _writeAsyncStorage};
