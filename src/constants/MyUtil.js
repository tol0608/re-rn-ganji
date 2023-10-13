import axios from 'axios';
import {Alert, Platform, StatusBar} from 'react-native';
import Config from './Config';
import Layout from './Layout';

export let fcmSentTime;

export async function _httpReq(methodName, data) {
  let result = '';
  let url = Config.API_URL + methodName;

  _consoleLog(
    '============ >>>>>> ' + url + ' () 요청 - ' + JSON.stringify(data),
  );

  try {
    let response = await axios({
      method: 'post',
      url: url,
      headers: {'Content-Type': 'application/json'},
      data: data,
    });

    let responseOK = response && response.status === 200;
    if (responseOK) {
      result = response.data.resObject;
      _consoleLog(
        '============ <<<<<< ' +
          methodName +
          '() 정상 result : ' +
          JSON.stringify(result),
      );

      return {
        IS_SUCCESS: true,
        DATA_RESULT: result,
      };
    } else {
      result = response.error;
      _consoleLog(
        '============ <<<<<< ' +
          methodName +
          '() 응답 status error : ' +
          result,
      );
      Alert.alert(
        '',
        `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n${methodName}\n(${result})`,
      );

      return {
        IS_SUCCESS: false,
        DATA_RESULT: result,
      };
    }
  } catch (error) {
    _consoleLog(
      '============ <<<<<< ' + methodName + '() 네트워크 error : ' + error,
    );
    Alert.alert(
      '',
      `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n${methodName}\n(${error.message})`,
    );

    return {
      IS_SUCCESS: false,
      DATA_RESULT: error,
    };
  }
}

export async function _httpGetReq(reqURL) {
  let result = '';

  _consoleLog('============ >>>>>> ' + reqURL + ' () 요청 - ');

  try {
    let response = await axios({
      method: 'get',
      url: reqURL,
    });

    let responseOK = response && response.status === 200;
    if (responseOK) {
      result = response.data;
      _consoleLog(
        '============ <<<<<< ' + '() 정상 result : ' + JSON.stringify(result),
      );

      return {
        IS_SUCCESS: true,
        DATA_RESULT: result,
      };
    } else {
      result = response.error;
      _consoleLog('============ <<<<<< ' + '() 응답 status error : ' + result);
      Alert.alert(
        '',
        `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n(${result})`,
      );

      return {
        IS_SUCCESS: false,
        DATA_RESULT: result,
      };
    }
  } catch (error) {
    _consoleLog('============ <<<<<< ' + '() 네트워크 error : ' + error);
    Alert.alert(
      '',
      `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n(${error.message})`,
    );

    return {
      IS_SUCCESS: false,
      DATA_RESULT: error,
    };
  }
}

export async function _multiPartReq(methodName, formData) {
  let result = {result: true};
  let url = Config.API_URL + methodName;

  _consoleLog(
    '============ >>>>>> ' + url + '() 요청 - ' + JSON.stringify(formData),
  );

  let response = await axios({
    method: 'post',
    url: url,
    headers: {'content-type': 'multipart/form-data'},
    data: formData,
  });

  _consoleLog(
    '============ << ' +
      methodName +
      '() response : ' +
      JSON.stringify(response),
  );

  let responseOK = response && response.status === 200;
  if (responseOK) {
    result = response.data;
    _consoleLog(
      '============ <<<<<< ' +
        methodName +
        '() 정상 result : ' +
        JSON.stringify(result),
    );

    return {
      IS_SUCCESS: true,
      DATA_RESULT: result,
    };
  } else {
    result = response.error;
    _consoleError(
      '============ <<<<<< ' + methodName + '() 응답 status error : ' + result,
    );

    return {
      IS_SUCCESS: false,
      DATA_RESULT: result,
    };
  }
}

export function _stateToKor(obj) {
  if (obj === '0') {
    return '입금확인중';
  } else if (obj === '1') {
    return '입금확인';
  } else if (obj === '2') {
    return '배송준비';
  } else if (obj === '3') {
    return '배송시작';
  } else if (obj === '5') {
    return '배송완료';
  } else if (obj === '9') {
    return '주문';
  } else {
    return '...';
  }
}

export function _numberFormat(inputNumber) {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function _dateFormat(date) {
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let min =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let result = hour + ':' + min;

  return result;
}

export function getNotchHight() {
  let notchHeight = 0;
  if (Platform.OS == 'ios') {
    if (StatusBar.currentHeight() == 20) {
      notchHeight = 25;
    } else if (StatusBar.currentHeight() > 20) {
      notchHeight = StatusBar.currentHeight() + 34;
    }
  } else if (Platform.OS == 'android') {
    if (StatusBar.currentHeight() > 25) {
      notchHeight = 0;
    } else {
      notchHeight = StatusBar.currentHeight();
    }
  }
  return notchHeight;
}

export function _toThousandsCommas(num) {
  if (typeof num === 'undefined') {
    return '0';
  } else if (num === null) {
    return '0';
  } else if (num === '0') {
    return '0';
  } else {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export function _isNull(obj) {
  if (typeof obj === 'undefined') {
    return true;
  } else if (obj === null) {
    return true;
  } else if (obj === 'null') {
    return true;
  } else if (obj === '') {
    return true;
  } else if (obj.length === 0) {
    return true;
  } else if (obj.length === '0.0') {
    return true;
  } else {
    return false;
  }
}
export function _isUndefined(obj) {
  if (typeof obj === 'undefined') {
    return true;
  } else if (obj === null) {
    return true;
  } else if (obj === 'null') {
    return true;
  } else {
    return false;
  }
}

export function _consoleLog(text) {
  if (Config.IS_LOG) {
    console.log('** (myLog) ** \n' + text);
  }
}

export function _consoleError(text) {
  if (Config.IS_LOG) {
    console.error('** (myLog) ** \n' + text);
  }
}
