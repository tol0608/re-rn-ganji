import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import allActions from '../../components/redux/allActions';
import * as ServerApi from '../../constants/ServerApi';
import * as MyAsyncStorage from '../../constants/MyAsyncStorage';
import * as MyUtil from '../../constants/MyUtil';
import Config from '../../constants/Config';

import PostCodeDialog from '../../components/PostCodeDialogAddr';
import useFetch from '../../components/useFetch';

const UserInfo = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const {rxLoginInfo} = useSelector(
    state => state.rxLoginInfo,
    (prev, next) => {
      return prev.rxLoginInfo === next.rxLoginInfo;
    },
  );
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [pw, setPw] = useState('');
  const [pwconfirm, setPwconfirm] = useState('');

  const [jibunaddress, setJibunaddress] = useState(false);
  const [roadaddress, setRoadaddress] = useState(false);
  const [addressdt, setAddressdt] = useState(false);
  const [add1, setAdd1] = useState(false);
  const [add2, setAdd2] = useState(false);
  const [add3, setAdd3] = useState(false);
  const [zip, setZip] = useState(false);

  const [easyYn, setEasyYn] = useState('');
  const [easyType, setEasyType] = useState('');
  const [uniqKey, setUniqKey] = useState('');

  const [delivery_msg, setDelivery_msg] = useState(false);
  const [handphone, setHandphone] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isFetched = false;
    async function fetchData() {
      setUserName(rxLoginInfo.name);

      if (!MyUtil._isNull(rxLoginInfo.handphone)) {
        setHandphone(rxLoginInfo.handphone);
      } else {
        setHandphone('');
      }

      setDelivery_msg(rxLoginInfo.delivery_msg);
      setJibunaddress(rxLoginInfo.jibun_address);
      setRoadaddress(rxLoginInfo.road_address);
      setAddressdt(rxLoginInfo.road_address_dtl);
      setAdd1(rxLoginInfo.add1);
      setAdd2(rxLoginInfo.add2);
      setAdd3(rxLoginInfo.add3);
      setZip(rxLoginInfo.zip);
      setUserEmail(rxLoginInfo.email);

      setEasyYn(rxLoginInfo.easy_yn);
      setEasyType(rxLoginInfo.easy_type);
      setUniqKey(rxLoginInfo.uniq_key);

      setLoading(false);
    }
    fetchData();

    return () => {
      isFetched = true;
    };
  }, [
    rxLoginInfo.add1,
    rxLoginInfo.add2,
    rxLoginInfo.add3,
    rxLoginInfo.delivery_msg,
    rxLoginInfo.easy_type,
    rxLoginInfo.easy_yn,
    rxLoginInfo.email,
    rxLoginInfo.handphone,
    rxLoginInfo.jibun_address,
    rxLoginInfo.name,
    rxLoginInfo.road_address,
    rxLoginInfo.road_address_dtl,
    rxLoginInfo.uniq_key,
    rxLoginInfo.zip,
  ]);

  const _modalCb = useCallback((isOk, jData) => {
    if (isOk) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const _postCodeDialogToggle = useCallback((isOpen, data) => {
    setIsModalOpen(false);

    if (typeof data === 'object') {
      setJibunaddress(data.jibunAddress);
      setRoadaddress(data.roadAddress);
      setAdd1(data.sido);
      setAdd2(data.sigungu);
      setAdd3(data.bname);
      setZip(data.zonecode);

      setIsModalOpen(isOpen);
    } else {
      setIsModalOpen(isOpen);
    }
  }, []);

  const logOut = useCallback(() => {
    Alert.alert(
      '',
      '로그아웃 하시겠습니까?',
      [
        {text: '취소', style: 'cancel', onPress: () => {}},
        {
          text: '확인',
          onPress: () => {
            dispatch(allActions.logOut());
            MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, null);

            navigation.replace('MainScreen');
            Alert.alert('', '로그아웃 하였습니다.');
          },
        },
      ],
      {cancelable: false},
    );
  }, [dispatch, navigation]);

  const _infoUpdate = useCallback(
    async (
      rxLoginInfo,
      roadaddress,
      jibunaddress,
      addressdt,
      add1,
      add2,
      add3,
      zip,
      delivery_msg,
      handphone,
      pw,
      pwconfirm,
      easyYn,
      easyType,
      uniqKey,
    ) => {
      if (pw !== pwconfirm) {
        return Alert.alert('', '비밀번호와 비밀번호 확인이 동일하지 않습니다!');
      } else {
        if (!MyUtil._isNull(pw)) {
          var regType1 = /^[A-Za-z0-9]*$/;
          if (!regType1.test(pw)) {
            return Alert.alert('', '비밀번호는 영어와 숫자만 입력해주세요.');
          } else {
            const result = await ServerApi.m_appinfou(
              String(rxLoginInfo.u_id),
              roadaddress,
              addressdt,
              jibunaddress,
              addressdt,
              add1,
              add2,
              add3,
              zip,
              delivery_msg,
              handphone,
              String(pw),
            );
            if (
              result.IS_SUCCESS === true &&
              result.DATA_RESULT.rsp_code === '100'
            ) {
              const resultUserData = await ServerApi._appLogin(
                easyYn,
                String(rxLoginInfo.email),
                pw,
                easyType,
                uniqKey,
              );

              if (
                resultUserData.IS_SUCCESS === true &&
                resultUserData.DATA_RESULT.rsp_code === '100'
              ) {
                MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, {
                  userId: String(rxLoginInfo.email),
                  userPw: String(pw),
                  easyYn,
                  easyType,
                  uniqKey,
                });
                dispatch(allActions.setRxLoginInfo(resultUserData.DATA_RESULT)); // => 서버에서 내려준 유저 정보

                const loginInfoo = await MyAsyncStorage._getAsyncStorage(
                  Config.AS_KEY_LOGIN_INFO,
                );

                if (loginInfoo != null) {
                  Alert.alert('', '정상적으로 수정되었습니다!');
                  navigation.goBack();
                } else {
                  Alert.alert(
                    '',
                    '네트워크 환경이 불안정 합니다!\n_infoUpdate:' +
                      result.DATA_RESULT.rsp_code,
                  );
                }
              } else {
                Alert.alert(
                  '',
                  '네트워크 환경이 불안정 합니다!\n_infoUpdate:' +
                    result.DATA_RESULT.rsp_code,
                );
              }
            }
          }
        } else {
          const loginInfo = await MyAsyncStorage._getAsyncStorage(
            Config.AS_KEY_LOGIN_INFO,
          );

          const result = await ServerApi.m_appinfou(
            String(rxLoginInfo.u_id),
            roadaddress,
            addressdt,
            jibunaddress,
            addressdt,
            add1,
            add2,
            add3,
            zip,
            delivery_msg,
            handphone,
            String(loginInfo.userPw),
          );
          if (
            result.IS_SUCCESS === true &&
            result.DATA_RESULT.rsp_code === '100'
          ) {
            const resultUserData = await ServerApi._appLogin(
              easyYn,
              String(rxLoginInfo.email),
              String(loginInfo.userPw),
              easyType,
              uniqKey,
            );

            if (
              resultUserData.IS_SUCCESS === true &&
              resultUserData.DATA_RESULT.rsp_code === '100'
            ) {
              MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, {
                userId: String(rxLoginInfo.email),
                userPw: String(loginInfo.userPw),
                easyYn,
                easyType,
                uniqKey,
              });
              dispatch(allActions.setRxLoginInfo(resultUserData.DATA_RESULT)); // => 서버에서 내려준 유저 정보

              const loginInfoo = await MyAsyncStorage._getAsyncStorage(
                Config.AS_KEY_LOGIN_INFO,
              );

              if (loginInfoo != null) {
                Alert.alert('', '정상적으로 수정되었습니다!');
                navigation.goBack();
              } else {
                Alert.alert(
                  '',
                  '네트워크 환경이 불안정 합니다!\n_infoUpdate:' +
                    result.DATA_RESULT.rsp_code,
                );
              }
            } else {
              Alert.alert(
                '',
                '네트워크 환경이 불안정 합니다!\n_infoUpdate:' +
                  result.DATA_RESULT.rsp_code,
              );
            }
          }
        }
      }
    },
    [dispatch, navigation],
  );

  if (MyUtil._isNull(rxLoginInfo)) {
    return <></>;
  }

  return (
    <SafeAreaView>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={{backgroundColor: Colors.shoppingBg}}>
          <View style={{width: Layout.window.width, justifyContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: Layout.window.GapLvV,
                justifyContent: 'space-between',
                marginTop: Layout.window.GapLvV,
                marginBottom: Layout.window.GapLvV,
              }}>
              <Text allowFontScaling={false} style={styles.txtBigLogin}>
                Info
              </Text>
              <View
                style={{
                  width: Layout.window.GapLvII * 1.1,
                  height: Layout.window.GapLvVII,
                  paddingRight: Layout.window.GapLvVI,
                  paddingTop: 15,
                }}>
                <TouchableOpacity
                  style={{
                    width: Layout.window.GapLvII * 1.1,
                    height: Layout.window.GapLvVII,
                    paddingRight: Layout.window.GapLvVI,
                  }}
                  onPress={() => {
                    logOut();
                  }}>
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 30,
                      height: Layout.window.GapLvVII,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Colors.baseTextLightGray,
                    }}>
                    <Text allowFontScaling={false} style={styles.txtLoginBtn}>
                      {' '}
                      로그아웃{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginBottom: 5,
              }}>
              <TouchableOpacity
                style={{
                  width: Layout.window.GapLvII * 1.1,
                  paddingRight: Layout.window.GapLvVI,
                }}
                onPress={() => {
                  navigation.navigate('OrderList', {name: '주문 내역'});
                }}>
                <View
                  style={{
                    flex: 1,
                    borderRadius: 30,
                    height: Layout.window.GapLvVII,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.shoppingRed,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtLoginBtn}>
                    {' '}
                    주문 내역{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingLeft: Layout.window.GapLvVI,
                paddingRight: Layout.window.GapLvVI,
              }}>
              <Text allowFontScaling={false} style={styles.txtUserEmail}>
                {userEmail}
              </Text>
            </View>

            <View
              style={{
                paddingLeft: Layout.window.GapLvVI,
                paddingRight: Layout.window.GapLvVI,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginBottom: 10,
              }}>
              <Text
                allowFontScaling={false}
                style={[
                  {
                    paddingTop: 0,
                    fontSize: Layout.fsS,
                    color: '#ff0000',
                    marginLeft: 5,
                    fontWeight: 'bold',
                  },
                ]}>
                (포인트 : {MyUtil._toThousandsCommas(rxLoginInfo.point)}원)
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
                }}>
                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                    paddingBottom: 10,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtInfo}>
                    고객 성함
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={styles.txtInfoName}
                    //autoCapitalize='none'
                    //placeholder={"이름을 입력해주세요"}
                  >
                    {userName}
                  </Text>
                </View>

                {easyYn == 'y' ? (
                  <View />
                ) : (
                  <View
                    style={{
                      flex: 5,
                      borderBottomColor: Colors.shoppingBg,
                      borderBottomWidth: 2,
                    }}>
                    <Text allowFontScaling={false} style={styles.txtInfo}>
                      비밀번호
                    </Text>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.txtInfoInput}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      placeholder={'비밀번호를 입력해주세요'}
                      onChangeText={text => setPw(text)}
                    />
                  </View>
                )}

                {easyYn == 'y' ? (
                  <View />
                ) : (
                  <View
                    style={{
                      flex: 5,
                      borderBottomColor: Colors.shoppingBg,
                      borderBottomWidth: 2,
                    }}>
                    <Text allowFontScaling={false} style={styles.txtInfo}>
                      비밀번호 확인
                    </Text>
                    <TextInput
                      allowFontScaling={false}
                      style={styles.txtInfoInput}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      placeholder={'비밀번호를 다시 입력해주세요'}
                      onChangeText={text => setPwconfirm(text)}
                    />
                  </View>
                )}

                <View
                  style={{
                    flex: 5,
                    flexDirection: 'row',
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <View style={{flex: 6}}>
                    <Text allowFontScaling={false} style={styles.txtInfo}>
                      배송주소
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.txtInfoWritten}>
                      {roadaddress === '' ? jibunaddress : roadaddress}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalOpen(true);
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={styles.txtAddressSearch}>
                        주소 검색
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtInfo}>
                    상세주소
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtInfoInput}
                    autoCapitalize="none"
                    placeholder={'상세주소를 입력해주세요'}
                    value={addressdt}
                    onChangeText={text => setAddressdt(text)}
                  />
                </View>

                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtInfo}>
                    {'배송시 요청 사항'}
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtInfoInput}
                    autoCapitalize="none"
                    placeholder={'요청사항을 입력해주세요'}
                    value={delivery_msg}
                    onChangeText={text => setDelivery_msg(text)}
                  />
                </View>

                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtInfo}>
                    {'휴대폰 번호'}
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtInfoInput}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    placeholder={'"-"제외한 숫자만 입력해주세요"'}
                    value={handphone}
                    onChangeText={text => setHandphone(text)}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Layout.window.GapLvIV,
              }}>
              <TouchableOpacity
                style={{
                  width: (Layout.window.width * 9) / 10,
                  height: (Layout.window.width * 9) / 10 / 4.7,
                }}
                onPress={() => {
                  _infoUpdate(
                    rxLoginInfo,
                    roadaddress,
                    jibunaddress,
                    addressdt,
                    add1,
                    add2,
                    add3,
                    zip,
                    delivery_msg,
                    handphone,
                    pw,
                    pwconfirm,
                    easyYn,
                    easyType,
                    uniqKey,
                  );
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
                    정보 수정
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      <PostCodeDialog
        _postCodeDialogToggle={_postCodeDialogToggle}
        isModalOpen={isModalOpen}
        _modalCb={_modalCb}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtNewAc: {
    fontSize: Layout.fsM,
    marginTop: 40,
    color: 'black',
    //color: Colors.baseTextGray,
    textDecorationLine: 'underline',
  },
  txtUserEmail: {
    fontSize: Layout.fsL,
    color: 'black',
    //color: Colors.baseTextGray,
    fontWeight: 'bold',
    marginBottom: 1,
    textAlign: 'right',
  },
  txtInfo: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
    paddingTop: 10,
    marginLeft: 20,
  },
  txtInfoName: {
    fontSize: Layout.fsM,
    color: Colors.defaultText,
    fontWeight: 'bold',
    paddingTop: 5,
    marginLeft: 20,
  },
  txtInfoInput: {
    fontSize: Layout.fsM,
    color: Colors.defaultText,
    fontWeight: 'bold',
    paddingTop: -10,
    marginLeft: 16,
  },
  txtInfoNameWritten: {
    fontSize: Layout.fsL,
    fontWeight: 'bold',
    color: Colors.defaultText,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 15,
  },
  txtInfoWritten: {
    fontSize: Layout.fsM,
    fontWeight: 'bold',
    color: Colors.defaultText,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 15,
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
  txtAddressSearch: {
    fontSize: Layout.fsM,
    color: Colors.shoppingRed,
    fontWeight: 'bold',
  },
});

export default UserInfo;
