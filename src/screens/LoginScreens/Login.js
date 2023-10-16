import React, {useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import KakaoLogins from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import Loader from '../../components/Loader';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyAsyncStorage from '../../constants/MyAsyncStorage';
import * as MyUtil from '../../constants/MyUtil';
import Config from '../../constants/Config';
import allActions from '../../components/redux/allActions';
import ModalBottomLogin from '../../components/ModalBottomLogin';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reg_email, setreg_email] = useState(
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
  );
  const [sendingemail, setsendingemail] = useState('');
  //loading, adminId, adminPw, token
  const [token, settoken] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opCheck, setOpCheck] = useState('n');

  useEffect(() => {
    const getResult = async () => {
      if (Platform.OS === 'ios') {
        const result = await ServerApi.m_app_operation();
        console.log('m_aoo_operation : ' + JSON.stringify(result));
        if (
          result.IS_SUCCESS === true &&
          result.DATA_RESULT.rsp_code === '100'
        ) {
          setOpCheck(result.DATA_RESULT.opcheck);
        }
      }
    };
    getResult();
  }, []);

  const _sendPwd = useCallback(async sendingemail => {
    if (sendingemail == '') {
      Alert.alert('', '이메일을 입력해주세요');
    } else if (sendingemail != '') {
      if (reg_email.test(sendingemail)) {
        const result = await ServerApi.m_apppwdemail(sendingemail);
        if (
          result.IS_SUCCESS === true &&
          result.DATA_RESULT.rsp_code === '100'
        ) {
          Alert.alert('', '패스워드가 정상 발송 되었습니다.');
        } else if (result.DATA_RESULT.rsp_code === '200') {
          Alert.alert('', '존재하지 않는 이메일입니다.');
        } else {
          Alert.alert(
            '',
            '네트워크 환경이 불안정 합니다!\n_tabLogin:' +
              result.DATA_RESULT.rsp_code,
          );
        }
      } else {
        Alert.alert('', '이메일을 입력해주세요');
      }
    } else {
      Alert.alert('', '네트워크 환경이 불안정 합니다!');
    }
  }, []);

  const _googleLogin = useCallback(async () => {
    try {
      GoogleSignin.configure({
        // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId:
          '1060479497332-uq29hdmdos28krfphfrs54m0utjpf3hj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '653500291535-qnanep8akdagdad82ouhhvbvvpave3n5.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(
        'LoginContainer - 구글로그인 정보 : ' + JSON.stringify(userInfo.user),
      );

      // *** 간편 가입 체크 ~ 로그인/가입
      _easyCheck('g', userInfo.user.id);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        //Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
      }
    }
  }, []);

  const _kakaoLogin = useCallback(() => {
    console.log('카카오 로그인 시작');

    KakaoLogins.login()
      .then(result => {
        console.log('카카오 로그인 시작 222222');

        KakaoLogins.getProfile(async (err, kakaoResult) => {
          if (err) {
            return console.log('카카오 프로필 실패 !! - ', err);
          }

          // *** 간편 가입 체크 ~ 로그인/가입
          _easyCheck('k', kakaoResult.id);
        });
      })
      .catch(err => {
        Alert.alert('', `Login Failed:${err.code} ${err.message}`);
        if (err.code === 'E_CANCELLED_OPERATION') {
          // logCallback(`Login Cancelled:${err.message}`, setLoginLoading(false));
        } else {
          Alert.alert('', `Login Failed:${err.code} ${err.message}`);
        }
      });
  }, []);

  const _easyCheck = useCallback(async (easyType, uniqKey) => {
    const result = await ServerApi._appEasyCheck(easyType, uniqKey); // ** 간편 가입 체크 (100:미가입 , 200:기가입)
    if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
      navigation.navigate('Join', {
        easy_type: easyType,
        uniq_key: uniqKey,
        easy_yn: 'y',
      });
    } else if (result.DATA_RESULT.rsp_code == '200') {
      _login('', '', 'y', easyType, uniqKey);
    } else {
      Alert.alert(
        '',
        '네트워크 환경이 불안정 합니다!\n_appEasyCheck:' +
          result.DATA_RESULT.rsp_code,
      );
    }
  }, []);

  const _login = useCallback(
    async (email, password, easyYn, easyType, uniqKey) => {
      if (easyYn === 'n' && (email == '' || password == '')) {
        return Alert.alert('', '아이디 비밀번호를 입력해주세요');
      }

      const result = await ServerApi._appLogin(
        easyYn,
        email,
        String(password),
        easyType,
        uniqKey,
      );

      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, {
          userId: email,
          userPw: String(password),
          easyYn,
          easyType,
          uniqKey,
        });
        dispatch(allActions.setRxLoginInfo(result.DATA_RESULT)); // => 서버에서 내려준 유저 정보

        Alert.alert('', '정상적으로 로그인 완료되었습니다!');
        navigation.replace('MainScreen');
      } else if (result.DATA_RESULT.rsp_code === '200') {
        Alert.alert('', '아이디 비밀번호를 확인해 주세요');
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabLogin:' +
            result.DATA_RESULT.rsp_code,
        );
      }
    },
    [],
  );

  const _modalCb = useCallback((isOk, jData) => {
    setIsModalOpen(false);

    if (isOk) {
    }
  }, []);

  const _setemail = useCallback(txt => {
    setsendingemail(txt);
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={{flexGrow: 1, backgroundColor: Colors.shoppingBg}}>
          <View
            style={{
              width: Layout.window.width,
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                paddingLeft: Layout.window.GapLvV,
                justifyContent: 'center',
                marginTop: Layout.window.GapLvV,
                marginBottom: Layout.window.GapLvV,
              }}>
              <Text allowFontScaling={false} style={styles.txtBigLogin}>
                Log In
              </Text>
            </View>

            <View
              style={{
                paddingLeft: Layout.window.GapLvVI,
                paddingRight: Layout.window.GapLvVI,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  flexDirection: 'column',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../img/Profile.png')}
                      style={{
                        width: (Layout.window.width * 1) / 15,
                        height: (Layout.window.width * 1) / 15,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{flex: 5}}>
                    <Text allowFontScaling={false} style={styles.txtLogin}>
                      ID
                    </Text>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.txtLoginInput}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholder={'아이디를 입력해주세요'}
                      onChangeText={text => setemail(text)}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../img/password.png')}
                      style={{
                        width: (Layout.window.width * 1) / 13,
                        height: (Layout.window.width * 1) / 13,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{flex: 5}}>
                    <Text allowFontScaling={false} style={styles.txtLogin}>
                      PASSWORD
                    </Text>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.txtLoginInput}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      placeholder={'비밀번호를 입력해주세요'}
                      onChangeText={text => setpassword(text)}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -Layout.window.GapLvXI / 2,
              }}>
              <TouchableOpacity
                style={{
                  width: (Layout.window.width * 9) / 10,
                  height: (Layout.window.width * 9) / 10 / 4.7,
                }}
                onPress={() => {
                  _login(email, password, 'n', '', '');
                }}>
                <ImageBackground
                  source={require('../../img/btn_red.png')}
                  style={{height: '100%', width: '100%', position: 'absolute'}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: (Layout.window.width * 9) / 350,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtLoginBtn}>
                    로그인
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {opCheck === 'n' && (
              <View>
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    _kakaoLogin();
                  }}>
                  <Image
                    source={require('../../img/btn_login_kakao.png')}
                    style={{width: (Layout.window.width * 9) / 10}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}

            {opCheck === 'n' && (
              <View>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -Layout.window.GapLvVI,
                  }}
                  onPress={() => {
                    _googleLogin();
                  }}>
                  <Image
                    source={require('../../img/btn_login_google.png')}
                    style={{width: (Layout.window.width * 9) / 10}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Layout.window.GapLvXI / 2.3,
              }}>
              <TouchableOpacity
                style={{
                  width: (Layout.window.width * 9) / 10,
                  height: (Layout.window.width * 9) / 10 / 4.7,
                }}
                onPress={() => {
                  navigation.navigate('Join', {
                    easy_type: '',
                    uniq_key: '',
                    easy_yn: 'n',
                  });
                }}>
                <ImageBackground
                  source={require('../../img/btn_red.png')}
                  style={{height: '100%', width: '100%', position: 'absolute'}}
                  imageStyle={{tintColor: Colors.grayLine2}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: (Layout.window.width * 9) / 350,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtLoginBtn}>
                    회원 가입
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      <ModalBottomLogin
        isModalOpen={isModalOpen}
        _modalCb={_modalCb}
        _setemail={_setemail}
        sendingemail={sendingemail}
        _sendPwd={_sendPwd}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginBox: {
    width: 220,
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tiEmailBox: {
    width: 250,
    height: 48,
    backgroundColor: Colors.inputtextBg,
    color: 'black',
    //color: Colors.defaultText,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: Colors.inputtextEmail,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  txtNewAc: {
    fontSize: Layout.fsM,
    marginTop: 40,
    color: 'black',
    //color: Colors.baseTextGray,
    textDecorationLine: 'underline',
  },
  txtLogin: {
    fontSize: Layout.fsM,
    color: 'black',
    fontWeight: 'bold',
    //color: Colors.baseTextGray,
    paddingTop: 10,
  },
  txtLoginInput: {
    fontSize: Layout.fsM,
    color: Colors.defaultText,
    paddingTop: -10,
    height: 32,
  },
  txtBigLogin: {
    fontSize: Layout.fsXXXXL,
    color: Colors.defaultText,
    fontWeight: 'bold',
  },
  txtLoginBtn: {
    fontSize: Layout.fsM,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
