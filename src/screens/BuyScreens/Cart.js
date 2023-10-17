import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as MyUtil from '../../constants/MyUtil';
import * as ServerApi from '../../constants/ServerApi';
import * as MyAsyncStorage from '../../constants/MyAsyncStorage';
import Config from '../../constants/Config';

import CartListItem from '../../screens/BuyScreens/CartListItem';
import PostCodeDialog from '../../components/PostCodeDialogAddr';
import allActions from '../../components/redux/allActions';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const {rxLoginInfo} = useSelector(
    state => state.rxLoginInfo,
    (prev, next) => {
      return prev.rxLoginInfo === next.rxLoginInfo;
    },
  );

  const [cartArrData, setCartArrData] = useState([]);

  const [userName, setUserName] = useState([]);
  const [sumAmount, setSumAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [jibunaddress, setJibunaddress] = useState(false);
  const [roadaddress, setRoadaddress] = useState(false);
  const [addressdt, setAddressdt] = useState(false);
  const [add1, setAdd1] = useState(false);
  const [add2, setAdd2] = useState(false);
  const [add3, setAdd3] = useState(false);
  const [zip, setZip] = useState(false);

  const [delivery_msg, setDeliverymsg] = useState(false);
  const [handphone, setHandphone] = useState(false);
  const [myPoint, setMyPoint] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await ServerApi.m_appordertemp(rxLoginInfo.u_id);

      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        const newArrCartList = [...result.DATA_RESULT.array];
        setCartArrData(newArrCartList);
        _carcAmount(newArrCartList);
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabSearchOrderList:' +
            result.DATA_RESULT.rsp_code,
        );
      }
    }

    console.log('rxLoginInfo', JSON.stringify(rxLoginInfo));

    setUserName(rxLoginInfo.name);

    if (!MyUtil._isNull(rxLoginInfo.handphone)) {
      setHandphone(rxLoginInfo.handphone);
    } else {
      setHandphone('');
    }

    setDeliverymsg(rxLoginInfo.delivery_msg);
    setJibunaddress(rxLoginInfo.jibun_address);
    setRoadaddress(rxLoginInfo.road_address);
    setAddressdt(rxLoginInfo.road_address_dtl);
    setAdd1(rxLoginInfo.add1);
    setAdd2(rxLoginInfo.add2);
    setAdd3(rxLoginInfo.add3);
    setZip(rxLoginInfo.zip);

    setLoading(false);
    fetchData();
  }, [_carcAmount, rxLoginInfo]);

  const _btnHandler = useCallback(
    async (order_temp_no, cnt) => {
      const result = await ServerApi.m_appordertempu(
        order_temp_no,
        String(cnt),
      );
      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        const itemToFind = cartArrData.find(function (item) {
          return item.order_temp_no === order_temp_no;
        });
        const idx = cartArrData.indexOf(itemToFind);
        if (idx > -1) {
          cartArrData[idx].good_ct = String(cnt);
        }

        const newArrCartList = [...cartArrData];
        setCartArrData(newArrCartList);
        _carcAmount(newArrCartList);
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_appOrderTempU:' +
            result.DATA_RESULT.rsp_code,
        );
      }
    },
    [_carcAmount, cartArrData],
  );

  // //상품 하나 삭제
  const _delHandler = useCallback(
    async order_temp_no => {
      const result = await ServerApi.m_appordertempd(order_temp_no);
      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        const itemToFind = cartArrData.find(function (item) {
          return item.order_temp_no === order_temp_no;
        });
        const idx = cartArrData.indexOf(itemToFind);
        if (idx > -1) {
          cartArrData.splice(idx, 1);
        }

        const newArrCartList = [...cartArrData];
        setCartArrData(newArrCartList);
        _carcAmount(newArrCartList);
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_appOrderTempD:' +
            result.DATA_RESULT.rsp_code,
        );
      }
    },
    [_carcAmount, cartArrData],
  );

  // 가격 계산
  const _carcAmount = useCallback(getArr => {
    let amount = 0;

    getArr.forEach(function (item) {
      amount = amount + Number(item.price) * Number(item.good_ct);
    });

    setTotalAmount(amount);
    setSumAmount(amount);
  }, []);

  const OrderCartItem = useCallback(
    async (
      uid,
      delivery_msg,
      roadaddress,
      addressdt,
      jibunaddress,
      add1,
      add2,
      add3,
      zip,
      sumAmount,
      cartArrData,
      getRxloginInfo,
    ) => {
      try {
        const useMyPoint = parseInt(myPoint === '' ? '0' : myPoint);
        let numtotalAmount = Number(totalAmount);

        if (sumAmount === 0) {
          Alert.alert('', '장바구니에 상품이 없습니다.');
          return;
        }

        let totalprice = 0;

        cartArrData.forEach(function (item) {
          totalprice = totalprice + Number(item.price);
        });

        totalprice = sumAmount + Number(Config.DILIVERYPAYMENT);

        if (add1 === '') {
          Alert.alert('', '온라인 구매를 하시려면 주소를 입력해주세요!');
          return;
        }

        if (useMyPoint > 0 && useMyPoint < 10000) {
          Alert.alert('', '포인트는 1만원 이상 사용이 가능합니다');
          return;
        }

        if (useMyPoint > 0 && useMyPoint > getRxloginInfo.point) {
          Alert.alert('', '최대 ' + getRxloginInfo.point + '원 사용가능합니다');
          return;
        }

        if (numtotalAmount < 0) {
          Alert.alert('', '구매가 보다 포인트를 낮게 입력해주세요');
          return;
        }

        numtotalAmount = numtotalAmount + Number(Config.DILIVERYPAYMENT);

        const result = await ServerApi.m_apporderi(
          uid,
          delivery_msg,
          roadaddress,
          addressdt,
          jibunaddress,
          addressdt, // 중복인 경우 여기도 수정해야 합니다.
          add1,
          add2,
          add3,
          zip,
          String(numtotalAmount),
          cartArrData,
          useMyPoint + '',
        );

        if (
          result.IS_SUCCESS === true &&
          result.DATA_RESULT.rsp_code === '100'
        ) {
          Alert.alert(
            '',
            '주문 되었습니다.\n입금확인시 최종주문완료됩니다.\n배송기간은 평일기준 2~5일정도 소요됩니다.\n자세한사항은 공지사항확인바랍니다.',
          );

          const loginInfo = await MyAsyncStorage._getAsyncStorage(
            Config.AS_KEY_LOGIN_INFO,
          );
          if (!MyUtil._isNull(loginInfo)) {
            const result = await ServerApi._appLogin(
              loginInfo.easyYn,
              loginInfo.userId,
              String(loginInfo.userPw),
              loginInfo.easyType,
              loginInfo.uniqKey,
            );

            if (
              result.IS_SUCCESS === true &&
              result.DATA_RESULT.rsp_code === '100'
            ) {
              dispatch(allActions.setRxLoginInfo(result.DATA_RESULT));
            }
          }

          navigation.replace('MainScreen');
        } else if (
          result.IS_SUCCESS === true &&
          result.DATA_RESULT.rsp_code === '300'
        ) {
          Alert.alert('', '주문이 실패하였습니다.');
        } else {
          Alert.alert(
            '',
            '네트워크 환경이 불안정 합니다!\n_appOrderTempD:' +
              result.DATA_RESULT.rsp_code,
          );
        }
      } catch (error) {
        console.error('Error in OrderCartItem:', error);
        Alert.alert('', '주문 중 오류가 발생했습니다.');
      }
    },
    [dispatch, myPoint, navigation, totalAmount],
  );

  const _modalCb = useCallback((isOk, jData) => {
    if (isOk) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const _postCodeDialogToggle = useCallback((isOpen, data) => {
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

  if (MyUtil._isNull(rxLoginInfo)) {
    return <></>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: Colors.shoppingBg,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView style={{width: Layout.window.width * 0.9}}>
            <View style={{}}>
              {sumAmount == 0 ? (
                <View
                  style={{
                    width: Layout.window.width,
                    height: Layout.window.GapLvI,
                  }}
                />
              ) : !MyUtil._isNull(cartArrData) ? (
                cartArrData.map((item, idx) => (
                  <CartListItem
                    key={item.order_temp_no}
                    item={item}
                    _btnHandler={_btnHandler}
                    _delHandler={_delHandler}
                  />
                ))
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              )}
            </View>

            <View style={{}}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  flexDirection: 'column',
                }}>
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
                    배송시 요청 사항
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtInfoInput}
                    autoCapitalize="none"
                    placeholder={'요청사항을 입력해주세요'}
                    value={delivery_msg}
                    onChangeText={text => setDeliverymsg(text)}
                  />
                </View>

                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtInfo}>
                    휴대폰번호
                  </Text>
                  <TextInput
                    allowFontScaling={false}
                    style={styles.txtInfoInput}
                    autoCapitalize="none"
                    placeholder={'휴대폰번호를 입력해주세요'}
                    value={handphone}
                    onChangeText={text => setHandphone(text)}
                  />
                </View>

                <View
                  style={{
                    flex: 5,
                    borderBottomColor: Colors.shoppingBg,
                    borderBottomWidth: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.txtInfo, {paddingTop: 0}]}>
                      포인트 사용
                    </Text>
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
                      ({MyUtil._toThousandsCommas(rxLoginInfo.point)}원 보유중)
                    </Text>
                  </View>

                  {parseInt(rxLoginInfo.point) >= 10000 ? (
                    <TextInput
                      allowFontScaling={false}
                      style={styles.txtInfoInput}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      placeholder={'사용할 포인트 입력'}
                      value={myPoint}
                      onChangeText={text => {
                        if (parseInt(text) > 0) {
                          let result = sumAmount - parseInt(text);
                          setTotalAmount(result);
                        } else {
                          setTotalAmount(sumAmount);
                        }
                        setMyPoint(text);
                      }}
                    />
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.txtInfo,
                        {
                          paddingTop: 0,
                          fontSize: Layout.fsS,
                          marginTop: 5,
                          marginBottom: 10,
                          color: '#ff8090',
                        },
                      ]}>
                      1만원 이상 사용 가능합니다.
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <Text
              allowFontScaling={false}
              style={{fontWeight: 'bold', marginTop: 15}}>
              {' '}
              결재방법 : 무통장입금
            </Text>
            <Text allowFontScaling={false} style={{fontWeight: 'bold'}}>
              {' '}
              계좌정보 : 3333-18-0643392 카카오뱅크 엄미영{' '}
            </Text>
            {/* {MyUtil._toThousandsCommas(sumAmount)} 원  */}
            <Text
              allowFontScaling={false}
              style={{fontWeight: 'bold', marginBottom: 10}}>
              {' '}
              입금기한 : 최초주문시부터24시간이내
            </Text>
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.shoppingBg,
              height: Layout.window.GapLvI * 0.55,
            }}>
            <View
              style={{
                flex: 1,
                marginTop: 15,
                marginLeft: 25,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text allowFontScaling={false} style={styles.txtTotal}>
                TOTAL
              </Text>
              <Text allowFontScaling={false} style={styles.txtTotalPrice}>
                ₩ {MyUtil._toThousandsCommas(totalAmount)} 원
              </Text>
              <Text allowFontScaling={false} style={styles.txtTotal} />
            </View>

            <TouchableOpacity
              style={{
                flex: 1,
                marginRight: 25,
                marginBottom: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                OrderCartItem(
                  rxLoginInfo.u_id,
                  delivery_msg,
                  roadaddress,
                  addressdt,
                  jibunaddress,
                  add1,
                  add2,
                  add3,
                  zip,
                  sumAmount,
                  cartArrData,
                  rxLoginInfo,
                );
              }}>
              <View style={{}}>
                <Image
                  source={require('../../img/buy.png')}
                  style={styles.imgBuy}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <PostCodeDialog
        _postCodeDialogToggle={_postCodeDialogToggle}
        isModalOpen={isModalOpen}
        _modalCb={_modalCb}
        uid={rxLoginInfo.u_id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtInfo: {
    fontSize: Layout.fsL,
    color: 'black',
    paddingTop: 10,
    marginLeft: 20,
  },
  txtTotal: {
    fontSize: Layout.fsL,
    color: 'black',
  },
  txtTotalPrice: {
    fontSize: Layout.fsXXXL,
    color: 'black',
    fontWeight: 'bold',
  },
  txtInfoInput: {
    fontSize: Layout.fsM,
    color: Colors.defaultText,
    fontWeight: 'bold',
    paddingTop: -10,
    marginLeft: 16,
  },
  txtInfoWritten: {
    fontSize: Layout.fsM,
    fontWeight: 'bold',
    color: Colors.defaultText,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 15,
  },
  txtAddressSearch: {
    fontSize: Layout.fsM,
    color: Colors.shoppingRed,
    fontWeight: 'bold',
  },
  imgBuy: {
    width: Layout.window.GapLvI * 0.8,
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
});

export default Cart;
