import * as MyUtil from './MyUtil';
import messaging from '@react-native-firebase/messaging';

export async function m_app_open_url() {
  const REQ_METHODS = 'm_app_open_url';

  const data = {};
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _appLogin(easy_yn, email, password, easy_type, uniq_key) {
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
    // Alert.alert("", "알림이 거부된 상태입니다!\n설정에서 알림을 허용해주세요!");
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
  login_corp,
  uniq_key,
  nick,
  profile_img,
  latitude,
  longitude,
) {
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

export async function _appemailcheck(email) {
  const REQ_METHODS = 'm_app_email_check';
  const data = {
    email,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _appJoin(
  name,
  handphone,
  easy_type,
  uniq_key,
  email,
  password,
) {
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

export async function m_appgoods(good_group_cd, rownum) {
  const REQ_METHODS = 'm_app_goods';
  const data = {
    good_group_cd,
    rownum,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appuseterm() {
  const REQ_METHODS = 'm_app_use_term';
  const data = {};
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appalarm(u_id) {
  const REQ_METHODS = 'm_app_alarm';
  const data = {
    u_id,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appinfou(
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
) {
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

export async function m_appinfo(u_id) {
  const REQ_METHODS = 'm_app_info';
  const data = {
    u_id,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appnoti(rownum) {
  const REQ_METHODS = 'm_app_noti';
  const data = {
    rownum,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appnotidt(noti_no) {
  const REQ_METHODS = 'm_app_noti_dt';
  const data = {
    noti_no,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appgoodsdt(good_no) {
  const REQ_METHODS = 'm_app_goods_dt';
  const data = {
    good_no,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appreview(rownum) {
  const REQ_METHODS = 'm_app_review';
  const data = {
    rownum,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_review_dt(review_no) {
  const REQ_METHODS = 'm_app_review_dt';
  const data = {
    review_no,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_apreviewi(formData) {
  const REQ_METHODS = 'm_app_review_i';

  return await MyUtil._multiPartReq(REQ_METHODS, formData);
}

export async function m_appordertempi(
  u_id,
  good_no,
  good_ct,
  price,
  option_nm,
) {
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

export async function m_appordertempu(order_temp_no, good_ct) {
  const REQ_METHODS = 'm_app_order_temp_u';
  const data = {
    order_temp_no,
    good_ct,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}
export async function m_appordertempd(order_temp_no) {
  const REQ_METHODS = 'm_app_order_temp_d';
  const data = {
    order_temp_no,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appordertemp(u_id) {
  const REQ_METHODS = 'm_app_order_temp';
  const data = {
    u_id,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_apporderi(
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
) {
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

export async function m_appmyorder(u_id) {
  const REQ_METHODS = 'm_app_my_order';
  const data = {
    u_id,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_appopenurl(open_url) {
  const REQ_METHODS = 'm_app_open_url';
  const data = {
    open_url,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_app_operation() {
  const REQ_METHODS = 'm_app_operation';
  const data = {};
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function m_apppwdemail(email) {
  const REQ_METHODS = 'm_app_pwd_email';
  const data = {
    email,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _appEasyCheck(easy_type, uniq_key) {
  const REQ_METHODS = 'm_app_easy_check';
  const data = {
    easy_type,
    uniq_key,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}

export async function _appGoodsSearch(good_nm) {
  const REQ_METHODS = 'm_app_goods_search';
  const data = {
    good_nm,
  };
  return await MyUtil._httpReq(REQ_METHODS, data);
}
