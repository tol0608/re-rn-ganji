import axios, {AxiosResponse} from 'axios';
import {Alert, Platform, StatusBar} from 'react-native';
import Config from './Config';

export let fcmSentTime: any;

export async function _httpReq(methodName: string, data: any) {
  try {
    let result: any = '';
    let url: string = Config.API_URL + methodName;

    _consoleLog(
      '============ >>>>>> ' + url + ' () 요청 - ' + JSON.stringify(data),
    );

    const response: AxiosResponse = await axios.post(url, data, {
      headers: {'Content-Type': 'application/json'},
    });

    let responseOK: boolean = response && response.status === 200;
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
      result = response.data; // 오류 정보 가져오기
      _consoleLog(
        '============ <<<<<< ' +
          methodName +
          '() 응답 status error : ' +
          JSON.stringify(result),
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

export async function _httpGetReq(reqURL: string) {
  try {
    let result: any = '';
    _consoleLog('============ >>>>>> ' + reqURL + ' () 요청 - ');

    const response: AxiosResponse = await axios({
      method: 'get',
      url: reqURL,
    });

    let responseOK: boolean = response && response.status === 200;
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
      result = response.data; // 오류 정보 가져오기
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

export async function _multiPartReq(
  methodName: string,
  formData: FormData,
): Promise<any> {
  try {
    let result: any = {result: true};
    let url: string = Config.API_URL + methodName;

    _consoleLog(
      '============ >>>>>> ' + url + '() 요청 - ' + JSON.stringify(formData),
    );

    const response: AxiosResponse = await axios.post(url, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });

    _consoleLog(
      '============ << ' +
        methodName +
        '() response : ' +
        JSON.stringify(response),
    );

    let responseOK: boolean = response && response.status === 200;
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
      result = response.data; // 오류 정보 가져오기
      _consoleError(
        '============ <<<<<< ' +
          methodName +
          '() 응답 status error : ' +
          JSON.stringify(result),
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

export function _stateToKor(obj: string): string {
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

export function _numberFormat(inputNumber: string) {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function _dateFormat(date: Date): string {
  let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let min =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  let result = hour + ':' + min;

  return result;
}

type PlatformType = 'ios' | 'android' | 'web' | 'windows' | 'macos';

export function getNotchHeight(): number {
  const platform: PlatformType = Platform.OS;
  let notchHeight = 0;

  if (platform === 'ios') {
    if (typeof StatusBar.currentHeight === 'number') {
      if (StatusBar.currentHeight === 20) {
        notchHeight = 25;
      } else if (StatusBar.currentHeight > 20) {
        notchHeight = StatusBar.currentHeight + 34;
      }
    }
  } else if (platform === 'android') {
    if (typeof StatusBar.currentHeight === 'number') {
      if (StatusBar.currentHeight > 25) {
        notchHeight = 0;
      } else {
        notchHeight = StatusBar.currentHeight;
      }
    }
  }

  return notchHeight;
}

export function _toThousandsCommas(num: number | null | undefined): string {
  if (num === null || num === undefined) {
    return '0';
  } else {
    return num.toLocaleString();
  }
}

export function _isNull(obj: any) {
  if (obj === null || obj === undefined || obj === '' || obj === '0.0') {
    return true;
  } else {
    return false;
  }
}

export function _isUndefined(obj: any) {
  return obj === undefined || obj === null || obj === 'null';
}

export function _consoleLog(text: string) {
  if (Config.IS_LOG) {
    console.log('** (myLog) ** \n' + text);
  }
}

export function _consoleError(text: string) {
  if (Config.IS_LOG) {
    console.error('** (myLog) ** \n' + text);
  }
}
