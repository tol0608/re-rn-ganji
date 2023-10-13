'use strict';
exports.__esModule = true;
// var SERVER_URL = 'http://deuxisttt.cafe24.com/';
const SERVER_URL = 'http://118.38.38.162:8080:8080/'; // 팀장님 링크

var AppConfig = {
  // 이미지 상품 URL
  TITLEIMG_URL: ''.concat(SERVER_URL, 'resource/shop/goods/'),
  REVIEWIMG_URL: ''.concat(SERVER_URL, 'resource/shop/review/'),
  // 기타 이미지 URL 및 상수
  IMG_URL: ''.concat(SERVER_URL, 'img/'),
  PD_IMG_URL: ''.concat(SERVER_URL, 'pd/'),
  // 서버 URL
  SERVER_URL: SERVER_URL,
  API_URL: ''.concat(SERVER_URL, 'shop/'),
  // 기타 설정
  DILIVERYPAYMENT: 0,
  BANNERS: '../../img/',
  AS_KEY_LOGIN_INFO: 'as_key_login_info',
  APP_VER: '0.2.36',
  IS_LOG: false,
};
exports.default = AppConfig;
