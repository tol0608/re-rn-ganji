import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import axios, {AxiosResponse} from 'axios';
import {Alert, Platform, StatusBar} from 'react-native';
import Config from './Config';
import * as MyUtil from './MyUtil';

// export let fcmSentTime: Date;

interface ApiResponse {
  IS_SUCCESS: boolean;
  DATA_RESULT: any;
}

export async function _getAsyncStorage(key: string): Promise<ApiResponse> {
  MyUtil._consoleLog(
    `################ >>>>>> _getAsyncStorage () 요청 - key : ${key}`,
  );
  let item = null;
  try {
    const itemStr = await AsyncStorage.getItem(key);
    MyUtil._consoleLog(
      `################ <<<<<< _getAsyncStorage () 요청 - itemStr : ${itemStr}`,
    );
    if (itemStr !== null) {
      item = JSON.parse(itemStr);
    }
  } catch (e) {
    MyUtil._consoleLog(
      `################ <<<<<< _getAsyncStorage () 요청 - error : ${e}`,
    );
  }
  return item;
}

export async function _writeAsyncStorage(
  key: string,
  data: any,
): Promise<void> {
  MyUtil._consoleLog(
    `################ >>>>>> _writeAsyncStorage () 요청 - key : ${key}`,
  );
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    MyUtil._consoleLog(
      `################ <<<<<< _writeAsyncStorage () 요청 - data : ${JSON.stringify(
        data,
      )}`,
    );
  } catch (e) {
    Alert.alert(
      '',
      '어싱크 스토리지 에러!',
      [
        {
          text: '확인',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
    MyUtil._consoleLog(
      `################ <<<<<< _writeAsyncStorage () 요청 - error : ${e}`,
    );
  }
}

export async function _httpReq(methodName: string, data: any) {
  try {
    let result: any = '';
    let url: string = Config.API_URL + methodName;

    _consoleLog(
      '============ >>>>>> ' + url + ' () 요청 - ' + JSON.stringify(data),
    );

    let response = await axios({
      method: 'post',
      url: url,
      headers: {'Content-Type': 'application/json'},
      data: data,
    });

    if (response.status === 200) {
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
      _consoleError(
        `============ <<<<<< ${methodName}() 응답 status error : ${response.status}`,
      );
      Alert.alert(
        '',
        `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n${methodName}\n(${response.status})`,
      );

      return {
        IS_SUCCESS: false,
        DATA_RESULT: response.status,
      };
    }
  } catch (error) {
    _consoleError(
      `============ <<<<<< ${methodName}() 네트워크 error : ${error}`,
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

export async function _httpGetReq(reqURL: string): Promise<ApiResponse> {
  try {
    const response: AxiosResponse = await axios.get(reqURL);

    if (response.status === 200) {
      const result = response.data;
      MyUtil._consoleLog(
        `============ <<<<<< () 정상 result : ${JSON.stringify(result)}`,
      );
      return {
        IS_SUCCESS: true,
        DATA_RESULT: result,
      };
    } else {
      MyUtil._consoleError(
        `============ <<<<<< () 응답 status error : ${response.status}`,
      );
      Alert.alert(
        '',
        `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\n(${response.status})`,
      );
      return {
        IS_SUCCESS: false,
        DATA_RESULT: response.status,
      };
    }
  } catch (error) {
    MyUtil._consoleError(`============ <<<<<< () 네트워크 error : ${error}`);
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
): Promise<ApiResponse> {
  const url = Config.API_URL + methodName;
  MyUtil._consoleLog(
    `============ >>>>>> ${url}() 요청 - ${JSON.stringify(formData)}`,
  );

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: url,
      headers: {'content-type': 'multipart/form-data'},
      data: formData,
    });

    MyUtil._consoleLog(
      `============ << ${methodName}() response : ${JSON.stringify(response)}`,
    );

    if (response.status === 200) {
      const result = response.data;
      MyUtil._consoleLog(
        `============ <<<<<< ${methodName}() 정상 result : ${JSON.stringify(
          result,
        )}`,
      );
      return {
        IS_SUCCESS: true,
        DATA_RESULT: result,
      };
    } else {
      MyUtil._consoleError(
        `============ <<<<<< ${methodName}() 응답 status error : ${response.status} - ${response.statusText}`,
      );
      return {
        IS_SUCCESS: false,
        DATA_RESULT: response.statusText,
      };
    }
  } catch (error) {
    MyUtil._consoleError(
      `============ <<<<<< ${methodName}() 네트워크 error : ${error}`,
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

export function _numberFormat(inputNumber: number): string {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function _dateFormat(date: Date): string {
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const result = hour + ':' + min;
  return result;
}

export function getNotchHeight(): number {
  let notchHeight = 0;
  if (Platform.OS === 'ios') {
    if (typeof StatusBar.currentHeight === 'number') {
      if (StatusBar.currentHeight === 20) {
        notchHeight = 25;
      } else if (StatusBar.currentHeight > 20) {
        notchHeight = StatusBar.currentHeight + 34;
      }
    }
  } else if (Platform.OS === 'android') {
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
  if (typeof num === 'undefined' || num === null) {
    return '0';
  } else {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export function _isNull(obj: any): boolean {
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

export function _isUndefined(obj: any): boolean {
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

export async function m_app_open_url(): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_open_url';
  const data = {};
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _appLogin(
  easy_yn: string,
  email: string,
  password: string,
  easy_type: string,
  uniq_key: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_login';
  let token = '';
  try {
    token = await messaging().getToken();
    if (token) {
      MyUtil._consoleLog('******* 로그인 토큰 : ' + token);
    } else {
      MyUtil._consoleLog('******* 로그인 토큰 없음');
      token = '';
    }
  } catch (error) {
    Alert.alert('', '알림이 거부된 상태입니다!\n설정에서 알림을 허용해주세요!');
  }
  const data = {
    token,
    easy_yn,
    email,
    password,
    easy_type,
    uniq_key,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _login(
  login_corp: string,
  uniq_key: string,
  nick: string,
  profile_img: string,
  latitude: string,
  longitude: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'member/login';
  let fcmToken = '';
  try {
    // fcmToken = await messaging().getToken();
    if (fcmToken) {
      MyUtil._consoleLog('******* 로그인 토큰 : ' + fcmToken);
    } else {
      // user doesn't have a device token yet
      MyUtil._consoleLog('******* 로그인 토큰 없음');
      fcmToken = '';
    }
  } catch (error) {
    // Alert.alert("", "알림이 거부된 상태입니다!\n설정에서 알림을 허용해주세요!");
  }
  const data = {
    login_corp,
    uniq_key,
    nick,
    profile_img,
    latitude,
    longitude,
    token: fcmToken,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

// 간지옷장api

export async function _appemailcheck(email: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_email_check';
  const data = {
    email,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _appJoin(
  name: string,
  handphone: number,
  easy_type: string,
  uniq_key: string,
  email: string,
  password: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_join';
  const data = {
    name,
    handphone,
    easy_type,
    uniq_key,
    email,
    password,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appgoods(
  good_group_cd: string,
  rownum: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_goods';
  const data = {
    good_group_cd,
    rownum,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appuseterm(): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_use_term';
  const data = {};
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appalarm(u_id: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_alarm';
  const data = {
    u_id,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appinfou(
  u_id: string,
  road_address: string,
  road_address_dtl: string,
  jibun_address: string,
  jibun_address_dtl: string,
  add1: string,
  add2: string,
  add3: string,
  zip: string,
  delivery_msg: string,
  handphone: string,
  password: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_info_u';
  const data = {
    u_id,
    road_address,
    road_address_dtl,
    jibun_address,
    jibun_address_dtl,
    add1,
    add2,
    add3,
    zip,
    delivery_msg,
    handphone,
    password,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appinfo(u_id: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_info';
  const data = {
    u_id,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appnoti(rownum: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_noti';
  const data = {
    rownum,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appnotidt(noti_no: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_noti_dt';
  const data = {
    noti_no,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appgoodsdt(good_no: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_goods_dt';
  const data = {
    good_no,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appreview(rownum: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_review';
  const data = {
    rownum,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_review_dt(review_no: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_review_dt';
  const data = {
    review_no,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_apreviewi(formData: FormData): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_review_i';
  return await MyUtil._multiPartReq(REQ_METHODS, formData);
}

export async function m_appordertempi(
  u_id: string,
  good_no: string,
  good_ct: string,
  price: string,
  option_nm: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_order_temp_i';
  const data = {
    u_id,
    good_no,
    good_ct,
    price,
    option_nm,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appordertempu(
  order_temp_no: string,
  good_ct: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_order_temp_u';
  const data = {
    order_temp_no,
    good_ct,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appordertempd(
  order_temp_no: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_order_temp_d';
  const data = {
    order_temp_no,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appordertemp(u_id: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_order_temp';
  const data = {
    u_id,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}
export async function m_apporderi(
  u_id: string,
  delivery_msg: string,
  road_address: string,
  road_address_dtl: string,
  jibun_address: string,
  jibun_address_dtl: string,
  add1: string,
  add2: string,
  add3: string,
  zip: string,
  amount: string,
  array: string,
  point: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_order_i';
  const data = {
    u_id,
    delivery_msg,
    road_address,
    road_address_dtl,
    jibun_address,
    jibun_address_dtl,
    add1,
    add2,
    add3,
    zip,
    amount,
    array,
    point,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appmyorder(u_id: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_my_order';
  const data = {
    u_id,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appopenurl(open_url: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_open_url';
  const data = {
    open_url,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_operation(): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_operation';
  const data = {};
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_apppwdemail(email: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_pwd_email';
  const data = {
    email,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _appEasyCheck(
  easy_type: string,
  uniq_key: string,
): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_easy_check';
  const data = {
    easy_type,
    uniq_key,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _appGoodsSearch(good_nm: string): Promise<ApiResponse> {
  const REQ_METHODS = 'm_app_goods_search';
  const data = {
    good_nm,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}
