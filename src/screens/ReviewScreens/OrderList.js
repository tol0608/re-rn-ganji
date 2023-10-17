import React, {useState, useEffect} from 'react';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  BackHandler,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import * as MyUtil from '../../constants/MyUtil';

import * as ServerApi from '../../constants/ServerApi';
import Config from '../../constants/Config';

const OrderList = () => {
  const navigation = useNavigation();
  const {rxLoginInfo} = useSelector(
    state => state.rxLoginInfo,
    (prev, next) => {
      return prev.rxLoginInfo === next.rxLoginInfo;
    },
  );
  const [loading, setLoading] = useState(true);
  const [arrData, setArrData] = useState(false);

  const route = useRoute();

  useEffect(() => {
    async function fetchData() {
      const result = await ServerApi.m_appmyorder(rxLoginInfo.u_id);
      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        setArrData(result.DATA_RESULT.array1);
        setLoading(false);
      } else if (
        result.IS_SUCCESS === true &&
        result.DATA_RESULT.rsp_code === '200'
      ) {
        Alert.alert('', '주문 내역이 없습니다.');
        navigation.navigate('UserInfo', {name: '사용자 정보'});
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabSearchOrderList:' +
            result.DATA_RESULT.rsp_code,
        );
      }
    }
    fetchData();

    if (!MyUtil._isNull(route.params?.writtenNo)) {
      setLoading(true);
      fetchData();
    }
  }, [navigation, route.params?.writtenNo, rxLoginInfo.u_id]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (MyUtil._isNull(rxLoginInfo)) {
        } else {
          navigation.navigate('UserInfo', {name: '사용자 정보'});
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, rxLoginInfo]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{backgroundColor: Colors.shoppingBg, alignItems: 'center'}}>
          <ScrollView
            style={{
              marginTop: 15,
              flexDirection: 'column',
              width: Layout.window.width * 0.9,
            }}>
            {!MyUtil._isNull(arrData) ? (
              arrData.map((item, idx) => (
                <View key={idx} style={{alignItems: 'center', marginTop: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: Layout.window.width * 0.9,
                      alignItems: 'center',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.orderListDate]}>
                      {item.array2[0].reg_date}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        styles.orderListDate,
                        {color: Colors.baseTextGray, fontSize: Layout.fsS},
                      ]}>
                      ({item.order_no})
                    </Text>
                    <View
                      style={{
                        backgroundColor: Colors.grayLine3,
                        height: 1.5,
                        flex: 1,
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    />
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={styles.txtOptionNm}>
                      {MyUtil._stateToKor(item.state)}
                    </Text>
                  </View>
                  {item.array2.map((array2item, idx) => (
                    <View key={idx} style={{flexDirection: 'row'}}>
                      <View style={{flex: 1, marginTop: 5, marginBottom: 25}}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{
                              uri: Config.TITLEIMG_URL + array2item.file_nm,
                            }}
                            style={styles.imgProductOrderList}
                            resizeMode="cover"
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 2.1,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          marginTop: 8,
                        }}>
                        <Text
                          allowFontScaling={false}
                          numberOfLines={1}
                          style={styles.txtItemName}>
                          {array2item.good_nm}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          numberOfLines={3}
                          style={styles.txtOptionNm}>
                          {array2item.option_nm}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 8,
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                            }}>
                            <Text
                              allowFontScaling={false}
                              style={styles.txtItemPrice}>
                              {MyUtil._toThousandsCommas(array2item.price)} 원
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            {MyUtil._isNull(array2item.review_no) ? (
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate('ReviewWrite', {
                                    name: '후기 작성',
                                    goodnm: array2item.good_nm,
                                    optionnm: array2item.option_nm,
                                    ordertempno: array2item.order_temp_no,
                                    filenm: array2item.file_nm,
                                  });
                                }}>
                                <View
                                  style={{
                                    backgroundColor: Colors.shoppingRed,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30,
                                    height: Layout.window.GapLvVIII,
                                    width: Layout.window.GapLvII * 0.8,
                                  }}>
                                  <Text
                                    allowFontScaling={false}
                                    style={{
                                      fontSize: Layout.fsM,
                                      color: 'white',
                                      marginBottom: 1,
                                    }}>
                                    {' '}
                                    후기 작성{' '}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate('ReviewDetail', {
                                    name: '구매 후기 상세',
                                    review_no: array2item.review_no,
                                  });
                                }}>
                                <View
                                  style={{
                                    backgroundColor: Colors.grayLine2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30,
                                    height: Layout.window.GapLvVIII,
                                    width: Layout.window.GapLvII * 0.8,
                                  }}>
                                  <Text
                                    allowFontScaling={false}
                                    style={{
                                      fontSize: Layout.fsM,
                                      color: 'white',
                                      marginBottom: 1,
                                    }}>
                                    {' '}
                                    리뷰 확인{' '}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text />
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  orderListDate: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
    marginLeft: 7,
  },
  scrollNotiList: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
  },
  txtItemName: {
    fontSize: Layout.fsL,
    color: 'black',
    //color: Colors.baseTextGray,
    fontWeight: 'bold',
  },
  txtOptionNm: {
    fontSize: Layout.fsS,
    color: 'black',
    //color: Colors.baseTextGray,
  },
  txtItemPrice: {
    fontSize: Layout.fsL,
    color: Colors.shoppingRed,
    fontWeight: 'bold',
    marginTop: 5,
  },
  reviewContents: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
  },
  imgProductOrderList: {
    borderRadius: 10,
    marginTop: 10,
    width: Layout.window.GapLvIII,
    height: undefined,
    aspectRatio: 1,
  },
});

export default OrderList;
