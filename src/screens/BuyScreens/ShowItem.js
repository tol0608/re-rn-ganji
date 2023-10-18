import React, {useState, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as MyUtil from '../../constants/MyUtil';
import Carousel from 'react-native-snap-carousel-v4';
import * as ServerApi from '../../constants/ServerApi';
import Config from '../../constants/Config';

import HTML from 'react-native-render-html';
import FastImage from 'react-native-fast-image';

import ModalBottomAddCart from '../../components/ModalBottomAddCart';
import ModalBottomMainToLogin from '../../components/ModalBottomMainToLogin';
import ModalItemOptionPick from '../../components/ModalItemOptionPick';
import ReviewItem from '../../components/ReviewItem';

const ShowItem = ({route}) => {
  const navigation = useNavigation();
  const {rxLoginInfo} = useSelector(
    state => state.rxLoginInfo,
    (prev, next) => {
      return prev.rxLoginInfo === next.rxLoginInfo;
    },
  );
  const [loading, setLoading] = useState(true);
  const [kakaoUrl, setKakaoUrl] = useState('');

  const [arrDatadt, setarrDatadt] = useState(null);
  const [arrDataoption, setarrDataoption] = useState([]);
  const [arrDatafile, setarrDatafile] = useState([]);

  const [clickedbtn, setclickedbtn] = useState(false);

  const [isModalToLoginOpen, setisModalToLoginOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isModalOpntionPickOpen, setisModalOpntionPickOpen] = useState(false);
  const {goodnum, fromPage} = route.params;

  const [option1nm, setOption1nm] = useState(null);
  const [option2nm, setOption2nm] = useState(null);
  const [option3nm, setOption3nm] = useState(null);

  const [selectOptionIdx, setSelectOptionIdx] = useState('');
  const [arrSelectOption, setArrSelectOption] = useState([]);
  const [arrReview, setArrReview] = useState([]);

  const [arrOption1length, setArrOption1length] = useState('');
  const [arrOption2length, setArrOption2length] = useState('');
  const [arrOption3length, setArrOption3length] = useState('');
  const [pickedOptionLength, setPickedOptionLength] = useState('');

  useEffect(() => {
    async function fetchData() {
      const result = await ServerApi.m_appgoodsdt(goodnum);
      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        let parseDt = result.DATA_RESULT.goods_dt;
        let htmlTemp = result.DATA_RESULT.goods_dt.contents.replace(
          /<ul>/gi,
          '',
        );
        htmlTemp = htmlTemp.replace(/<li>/gi, '<br />');
        htmlTemp = htmlTemp.replace(/<\/ul>/gi, '');
        htmlTemp = htmlTemp.replace(/<\/li>/gi, '');
        parseDt.contents = htmlTemp;

        setarrDatadt(parseDt);
        setarrDataoption(result.DATA_RESULT.goods_option);
        setarrDatafile(result.DATA_RESULT.goods_file);

        MyUtil._isNull(result.DATA_RESULT.goods_option['1'])
          ? setArrOption1length(0)
          : setArrOption1length(result.DATA_RESULT.goods_option['1'].length);
        MyUtil._isNull(result.DATA_RESULT.goods_option['2'])
          ? setArrOption2length(0)
          : setArrOption2length(result.DATA_RESULT.goods_option['2'].length);
        MyUtil._isNull(result.DATA_RESULT.goods_option['3'])
          ? setArrOption3length(0)
          : setArrOption3length(result.DATA_RESULT.goods_option['3'].length);

        setLoading(false);
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabSearchOrderList:' +
            result.DATA_RESULT.rsp_code,
        );
      }

      const result2 = await ServerApi.m_app_open_url();
      if (
        result2.IS_SUCCESS === true &&
        result2.DATA_RESULT.rsp_code === '100'
      ) {
        setKakaoUrl(result2.DATA_RESULT.open_url);
      } else {
        Alert.alert(
          '',
          `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\nm_app_open_url(${result2.DATA_RESULT.rsp_code})`,
        );
      }

      _m_appreview();
    }
    fetchData();
  }, [_m_appreview, goodnum]);

  const _m_appreview = useCallback(async () => {
    const result = await ServerApi.m_appreview();
    if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
      setArrReview(result.DATA_RESULT.array);
    } else {
      Alert.alert(
        '',
        '네트워크 환경이 불안정 합니다!\n_tabSearchOrderList:' +
          result.DATA_RESULT.rsp_code,
      );
    }
  }, []);

  const _modalCb = useCallback((isOk, jData) => {
    if (isOk) {
      setisModalOpen(true);
    } else {
      setisModalOpen(false);
    }
  }, []);

  const _modalCbToCart = useCallback(
    (isOk, jData) => {
      setisModalOpen(false);

      if (isOk) {
      } else {
        navigation.reset({
          index: 1,
          routes: [
            {name: 'MainScreen', params: {name: 'MainScreen'}},
            {name: 'Cart', params: {name: '장바구니'}},
          ],
        });
      }
    },
    [navigation],
  );

  const _modalToLoginOn = useCallback(
    (isOk, jData) => {
      setisModalToLoginOpen(false);

      if (isOk) {
      } else {
        navigation.reset({
          routes: [
            {name: 'MainScreen', params: {name: 'MainScreen'}},
            {name: 'Login', params: {name: 'Login'}},
          ],
          index: 1,
        });
      }
    },
    [navigation],
  );

  const _modalToLoginOff = useCallback((isOk, jData) => {
    if (isOk) {
      setisModalToLoginOpen(isOk);
    } else {
      setisModalToLoginOpen(isOk);
    }
  }, []);

  const modalPickOpen = useCallback(
    optionIdx => {
      setPickedOptionLength('');
      setSelectOptionIdx(optionIdx);
      setArrSelectOption(arrDataoption[optionIdx]);
      setisModalOpntionPickOpen(true);
    },
    [arrDataoption],
  );

  const _modalOptionCB = useCallback(
    (isOk, jData) => {
      setisModalOpntionPickOpen(false);
      if (!isOk) {
        return setSelectOptionIdx('');
      }

      if (selectOptionIdx === '1') {
        setOption1nm(jData.selectOption);
      } else if (selectOptionIdx === '2') {
        setOption2nm(jData.selectOption);
      } else if (selectOptionIdx === '3') {
        setOption3nm(jData.selectOption);
      }

      setSelectOptionIdx('');
    },
    [selectOptionIdx],
  );

  const GoToCart = useCallback(
    rxLoginInfo => {
      if (MyUtil._isNull(rxLoginInfo)) {
        setisModalToLoginOpen(true);
      } else {
        navigation.reset({
          index: 1,
          routes: [
            {name: 'MainScreen', params: {name: 'MainScreen'}},
            {name: 'Cart', params: {name: '장바구니'}},
          ],
        });
      }
    },
    [navigation],
  );

  const AddCart = useCallback(
    async (
      rxLoginInfo,
      option1nm,
      option2nm,
      option3nm,
      arrDatadt,
      arrOption1length,
      arrOption2length,
      arrOption3length,
    ) => {
      let option1picked = 0;
      let option2picked = 0;
      let option3picked = 0;
      if (MyUtil._isNull(rxLoginInfo)) {
        //이용자 정보가 없으면

        setisModalToLoginOpen(true);
      } else {
        let optionCombination = '';
        let totalPrice = Number(arrDatadt.price);
        if (arrOption1length > 0) {
          if (MyUtil._isNull(option1nm)) {
          } else {
            option1picked = 1;
            optionCombination =
              optionCombination +
              arrDatadt.option1 +
              ':' +
              option1nm.option_nm +
              ',';
            totalPrice = totalPrice + Number(option1nm.option_price);
          }
        } else if (arrOption1length == 0) {
          option1picked = 1;
        }

        if (arrOption2length > 0) {
          if (MyUtil._isNull(option2nm)) {
          } else {
            option2picked = 1;
            optionCombination =
              optionCombination +
              arrDatadt.option2 +
              ':' +
              option2nm.option_nm +
              ',';
            totalPrice = totalPrice + Number(option2nm.option_price);
          }
        } else if (arrOption2length == 0) {
          option2picked = 1;
        }

        if (arrOption3length > 0) {
          if (MyUtil._isNull(option3nm)) {
          } else {
            option3picked = 1;
            optionCombination =
              optionCombination +
              arrDatadt.option3 +
              ':' +
              option3nm.option_nm +
              ',';
            totalPrice = totalPrice + Number(option3nm.option_price);
          }
        } else if (arrOption3length == 0) {
          option3picked = 1;
        }

        if (option1picked == 1 && option2picked == 1 && option3picked == 1) {
          const result = await ServerApi.m_appordertempi(
            String(rxLoginInfo.u_id),
            String(arrDatadt.good_no),
            '1',
            String(totalPrice),
            optionCombination,
          );
          if (
            result.IS_SUCCESS === true &&
            result.DATA_RESULT.rsp_code === '100'
          ) {
            setisModalOpen(true);
          } else {
            Alert.alert(
              '',
              '네트워크 환경이 불안정 합니다!\n_infoUpdate:' +
                result.DATA_RESULT.rsp_code,
            );
          }
        } else {
          Alert.alert('', '옵션을 선택해주세요');
        }
      }
    },
    [],
  );

  const BuyItem = useCallback(
    async (
      rxLoginInfo,
      option1nm,
      option2nm,
      option3nm,
      arrDatadt,
      arrOption1length,
      arrOption2length,
      arrOption3length,
    ) => {
      let option1picked = 0;
      let option2picked = 0;
      let option3picked = 0;

      if (MyUtil._isNull(rxLoginInfo)) {
        //이용자 정보가 없으면
        setisModalToLoginOpen(true);
      } else {
        let optionCombination = '';
        let totalPrice = Number(arrDatadt.price);
        if (arrOption1length > 0) {
          if (MyUtil._isNull(option1nm)) {
          } else {
            option1picked = 1;
            optionCombination =
              optionCombination +
              arrDatadt.option1 +
              ':' +
              option1nm.option_nm +
              ',';
            totalPrice = totalPrice + Number(option1nm.option_price);
          }
        } else if (arrOption1length == 0) {
          option1picked = 1;
        }

        if (arrOption2length > 0) {
          if (MyUtil._isNull(option2nm)) {
          } else {
            option2picked = 1;
            optionCombination =
              optionCombination +
              arrDatadt.option2 +
              ':' +
              option2nm.option_nm +
              ',';
            totalPrice = totalPrice + Number(option2nm.option_price);
          }
        } else if (arrOption2length == 0) {
          option2picked = 1;
        }

        if (arrOption3length > 0) {
          if (MyUtil._isNull(option3nm)) {
          } else {
            option3picked = 1;
            optionCombination =
              optionCombination +
              arrDatadt.option3 +
              ':' +
              option3nm.option_nm +
              ',';
            totalPrice = totalPrice + Number(option3nm.option_price);
          }
        } else if (arrOption3length == 0) {
          option3picked = 1;
        }

        if (option1picked == 1 && option2picked == 1 && option3picked == 1) {
          const result = await ServerApi.m_appordertempi(
            String(rxLoginInfo.u_id),
            String(arrDatadt.good_no),
            '1',
            String(totalPrice),
            optionCombination,
          );

          if (
            result.IS_SUCCESS === true &&
            result.DATA_RESULT.rsp_code === '100'
          ) {
            navigation.reset({
              index: 1,
              routes: [
                {name: 'MainScreen', params: {name: 'MainScreen'}},
                {name: 'Cart', params: {name: '장바구니'}},
              ],
            });
          } else {
            Alert.alert(
              '',
              '네트워크 환경이 불안정 합니다!\n_infoUpdate:' +
                result.DATA_RESULT.rsp_code,
            );
          }
        } else {
          Alert.alert('', '옵션을 선택해주세요');
        }
      }
    },
    [navigation],
  );

  let calTotalPrice;
  calTotalPrice = useCallback((arrDatadt, option1nm, option2nm, option3nm) => {
    let totalPrice = 0;
    let itemPrice = arrDatadt.price;
    let optionPrice1 = 0;
    let optionPrice2 = 0;
    let optionPrice3 = 0;

    !MyUtil._isNull(arrDatadt) ? (itemPrice = arrDatadt.price) : 0;
    !MyUtil._isNull(option1nm) ? (optionPrice1 = option1nm.option_price) : 0;
    !MyUtil._isNull(option2nm) ? (optionPrice2 = option2nm.option_price) : 0;
    !MyUtil._isNull(option3nm) ? (optionPrice3 = option3nm.option_price) : 0;

    totalPrice =
      Number(itemPrice) +
      Number(optionPrice1) +
      Number(optionPrice2) +
      Number(optionPrice3);
    return totalPrice;
  }, []);

  function _renderItem({item}) {
    const imgSrc = {
      uri:
        Config.TITLEIMG_URL + item.file_nm + '?version=' + new Date().getTime(),
    };

    return (
      <TouchableOpacity
        style={styles.container}
        key={item.id}
        activeOpacity={1}>
        <View style={styles.container}>
          <FastImage
            style={styles.image}
            source={imgSrc}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, width: Layout.window.width}}>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.shoppingBg,
            width: Layout.window.width,
          }}>
          <View
            style={{
              width: Layout.window.width,
              height: Layout.window.topBarHeight * 1.3,
            }}>
            <View style={styles.viewTopBar}>
              <View style={styles.viewTopBarLeft}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [
                        {name: 'MainScreen', params: {name: 'MainScreen'}},
                      ],
                    });
                  }}>
                  <Image
                    source={require('../../img/back.png')}
                    style={{width: 13, height: 23, marginLeft: 20}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.viewTopBarCenter}>
                <Text
                  numberOfLines={2}
                  allowFontScaling={false}
                  style={{
                    textAlign: 'center',
                    fontSize: Layout.fsL,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  {route.params.name}
                </Text>
              </View>

              <View style={styles.viewTopBarRight}>
                <TouchableOpacity
                  onPress={() => {
                    GoToCart(rxLoginInfo);
                  }}>
                  <Image
                    source={require('../../img/Cart.png')}
                    style={{
                      width: Layout.window.GapLvIX,
                      marginRight: 15,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{flexGrow: 1, width: Layout.window.width}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: Layout.window.width,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  height: Layout.window.width * 1.1,
                }}>
                {/* 대표이미지 */}
                <View
                  style={{
                    width: Layout.window.width,
                    height: Layout.window.height,
                  }}>
                  {arrDatafile.length > 0 && (
                    <Carousel
                      ref={(c, _carousel) => {
                        _carousel = c;
                      }}
                      data={arrDatafile}
                      renderItem={_renderItem}
                      sliderWidth={Layout.window.width}
                      itemWidth={Layout.window.width}
                      loop={true}
                    />
                  )}
                </View>

                <View
                  style={{
                    height: Layout.window.width * 0.1,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      !MyUtil._isNull(kakaoUrl) && Linking.openURL(kakaoUrl);
                    }}>
                    <Image
                      source={require('../../img/btn_floatingaction_kakao.png')}
                      style={{
                        width: Layout.window.width / 6,
                        height: Layout.window.width / 6,
                        marginRight: 15,
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: Layout.window.width,
                }}>
                {/* //옵션 1 */}
                {MyUtil._isNull(arrDataoption) ? (
                  <View style={{}} />
                ) : MyUtil._isNull(arrDataoption['1']) ? (
                  <View />
                ) : (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.5}} />
                    <View
                      style={{
                        flex: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 15,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={styles.txtShowOption}>
                          {arrDatadt.option1}
                        </Text>
                      </View>
                    </View>

                    <View style={{flex: 0.5}} />
                    <TouchableOpacity
                      style={{
                        flex: 9,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        marginBottom: 15,
                      }}
                      onPress={() => {
                        modalPickOpen('1'), arrOption1length;
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          padding: 10,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={styles.txtShowItemBtn}>
                          {option1nm === null
                            ? '옵션을 선택해주세요'
                            : option1nm.option_nm}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{flex: 1.5}} />
                  </View>
                )}
                {/* //옵션 1 */}
                {/* //옵션 2 */}
                {MyUtil._isNull(arrDataoption) ? (
                  <View style={{}} />
                ) : MyUtil._isNull(arrDataoption['2']) ? (
                  <View />
                ) : (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.5}} />
                    <View
                      style={{
                        flex: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 15,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={styles.txtShowOption}>
                          {arrDatadt.option2}
                        </Text>
                      </View>
                    </View>

                    <View style={{flex: 0.5}} />
                    <TouchableOpacity
                      style={{
                        flex: 9,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        marginBottom: 15,
                      }}
                      onPress={() => {
                        modalPickOpen('2'), arrOption2length;
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          padding: 10,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={styles.txtShowItemBtn}>
                          {option2nm === null
                            ? '옵션을 선택해주세요'
                            : option2nm.option_nm}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{flex: 1.5}} />
                  </View>
                )}
                {/* //옵션 2 */}
                {/* //옵션 3 */}
                {MyUtil._isNull(arrDataoption) ? (
                  <View style={{}} />
                ) : MyUtil._isNull(arrDataoption['3']) ? (
                  <View />
                ) : (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.5}} />
                    <View
                      style={{
                        flex: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 15,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={styles.txtShowOption}>
                          {arrDatadt.option3}
                        </Text>
                      </View>
                    </View>

                    <View style={{flex: 0.5}} />
                    <TouchableOpacity
                      style={{
                        flex: 9,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        marginBottom: 15,
                      }}
                      onPress={() => {
                        modalPickOpen('3'), arrOption3length;
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          padding: 10,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={styles.txtShowItemBtn}>
                          {option3nm === null
                            ? '옵션을 선택해주세요'
                            : option3nm.option_nm}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{flex: 1.5}} />
                  </View>
                )}
                {/* //옵션 3 */}
              </View>

              <View
                style={{
                  height: Layout.window.GapLvIV * 0.8,
                  width: Layout.window.width * 0.9,
                  marginTop: 5,
                }}>
                <Text allowFontScaling={false} style={styles.txtTotalPrice}>
                  {MyUtil._toThousandsCommas(
                    calTotalPrice(arrDatadt, option1nm, option2nm, option3nm),
                  )}{' '}
                  원
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: Layout.window.width,
                paddingLeft: 10,
                paddingTop: 15,
              }}>
              <HTML
                key={HTML}
                source={{html: arrDatadt.contents}}
                contentWidth={Layout.window.width - 20}
                imagesMaxWidth={Layout.window.width - 20}
              />
            </View>

            <View
              style={{
                flexDirection: 'column',
                backgroundColor: Colors.shoppingBg,
                width: Layout.window.width,
              }}>
              <View style={{flexDirection: 'row', height: 50}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 10,
                  }}>
                  <Text allowFontScaling={false} style={styles.txtShowItemBtn}>
                    구매 후기
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ReviewList', {name: '구매 후기'});
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: Layout.window.GapLvIII,
                        height: Layout.window.GapLvV,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={styles.txtShowItemReviewBtn}>
                        more{' '}
                      </Text>
                      <Image
                        source={require('../../img/arrowright.png')}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: Layout.window.GapLvX * 0.4,
                          height: undefined,
                          aspectRatio: 1,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {!MyUtil._isNull(arrReview) ? (
                  arrReview.map((item, idx) =>
                    idx < 3 ? (
                      <ReviewItem
                        key={idx}
                        item={item}
                        navigation={navigation}
                      />
                    ) : (
                      <View />
                    ),
                  )
                ) : (
                  <Text
                    allowFontScaling={false}
                    style={{
                      marginTop: 15,
                      fontSize: Layout.fsM,
                      color: '#000000',
                    }}>
                    리뷰가 존재하지 않습니다!
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.shoppingBg,
              height: Layout.window.GapLvII * 0.9,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
              onPress={() => {
                BuyItem(
                  rxLoginInfo,
                  option1nm,
                  option2nm,
                  option3nm,
                  arrDatadt,
                  arrOption1length,
                  arrOption2length,
                  arrOption3length,
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

            <TouchableOpacity
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
              onPress={() => {
                AddCart(
                  rxLoginInfo,
                  option1nm,
                  option2nm,
                  option3nm,
                  arrDatadt,
                  arrOption1length,
                  arrOption2length,
                  arrOption3length,
                );
              }}>
              <View style={{}}>
                <Image
                  source={require('../../img/addcart.png')}
                  style={styles.imgCart}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* _modalCb,_modalCbToLogin, isModalOpen, clickedbtn */}
      <ModalBottomMainToLogin
        isModalOpen={isModalToLoginOpen}
        _modalCb={_modalToLoginOff}
        _modalCbToLogin={_modalToLoginOn}
        clickedbtn={clickedbtn}
      />
      <ModalBottomAddCart
        isModalOpen={isModalOpen}
        _modalCb={_modalCb}
        _modalCbToCart={_modalCbToCart}
      />
      <ModalItemOptionPick
        isModalOpen={isModalOpntionPickOpen}
        _modalCb={_modalOptionCB}
        arrData={arrSelectOption}
        pickedOptionLength={pickedOptionLength}
        arrOption1length={arrOption1length}
        arrOption2length={arrOption2length}
        arrOption3length={arrOption3length}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtShowItem: {
    fontSize: Layout.fsM,
    color: 'black',
  },
  txtShowOption: {
    fontSize: Layout.fsM,
    color: 'black',
    textAlign: 'left',
  },
  txtTotalPrice: {
    textAlign: 'right',
    fontSize: Layout.fsXXXL,
    color: 'black',
    fontWeight: 'bold',
  },
  txtShowItemBtn: {
    fontSize: Layout.fsM,
    color: 'black',
    fontWeight: 'bold',
  },
  txtShowItemReviewBtn: {
    fontSize: Layout.fsS,
    color: Colors.shoppingRed,
  },
  imgProductTop: {
    width: Layout.window.width,
    height: Layout.window.width,
    aspectRatio: 1,
  },
  imgProductMid: {
    width: Layout.window.width,
    height: Layout.window.width,
    aspectRatio: 1,
  },
  imgReviewStar: {
    width: Layout.window.GapLvXI * 0.9,
    aspectRatio: 1,
  },
  imgBuy: {
    width: Layout.window.GapLvI * 0.8,
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
    marginLeft: 15,
  },
  imgCart: {
    width: Layout.window.GapLvI * 0.8,
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
    marginRight: 15,
  },
  viewTopBar: {
    width: '100%',
    height: Layout.window.topBarHeight * 1.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.shoppingBg,
  },
  viewTopBarLeft: {
    flex: 1,
    height: Layout.window.topBarHeight * 1.3,
    justifyContent: 'center',
  },
  viewTopBarCenter: {
    flex: 6,
    height: Layout.window.topBarHeight * 1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTopBarRight: {
    flex: 1,
    height: Layout.window.topBarHeight * 1.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  container: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
  image: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
});

export default ShowItem;
