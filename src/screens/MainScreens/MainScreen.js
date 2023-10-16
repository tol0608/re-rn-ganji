import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import ModalBottomMainToLogin from '../../components/ModalBottomMainToLogin';
import ModalBottomSearch from '../../components/ModalBottomSearch';
import Loader from '../../components/Loader';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyAsyncStorage from '../../constants/MyAsyncStorage';
import * as MyUtil from '../../constants/MyUtil';
import Config from '../../constants/Config';
import allActions from '../../components/redux/allActions';
import ProductList from '../MainScreens/ProductList';
import SearchResult from './SearchResult';
import Banners from './Banners';
import btnstop from '../../img/btnstop.png';
import btnspants from '../../img/btnspants.png';
import btnsgolfwear from '../../img/btnsgolfwear.png';
import btnsshoe from '../../img/btnsshoe.png';
import btnswatch from '../../img/btnswatch.png';
import btnsacce from '../../img/btnsacce.png';

function MainScreen() {
  const navigation = useNavigation();
  const {rxLoginInfo} = useSelector(
    state => state.rxLoginInfo,
    (prev, next) => {
      return prev.rxLoginInfo === next.rxLoginInfo;
    },
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [kakaoUrl, setKakaoUrl] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedbtn, setclickedbtn] = useState(false);
  const [_searchTxt, setSearchTxt] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [bannerImages, setBannerImages] = useState([1, 2, 3]);

  const [od0Name, setOd0Name] = useState('totalList');
  const [od1Name, setOd1Name] = useState(null);
  const [od2Name, setOd2Name] = useState(null);
  const [od3Name, setOd3Name] = useState(null);
  const [od4Name, setOd4Name] = useState(null);
  const [od5Name, setOd5Name] = useState(null);
  const [od6Name, setOd6Name] = useState(null);
  const [od7Name, setOd7Name] = useState('searchResult');

  const [od0Drag, setOd0Drag] = useState(0);
  const [od1Drag, setOd1Drag] = useState(0);
  const [od2Drag, setOd2Drag] = useState(0);
  const [od3Drag, setOd3Drag] = useState(0);
  const [od4Drag, setOd4Drag] = useState(0);
  const [od5Drag, setOd5Drag] = useState(0);
  const [od6Drag, setOd6Drag] = useState(0);

  const [orderResult, setOrderResult] = useState('');

  const [curOdName, setCurOdName] = useState('totalList');
  const HomeScreenTabStack = createBottomTabNavigator();
  const route = useRoute();

  useEffect(() => {
    async function fetchData() {
      const loginInfo = await MyAsyncStorage._getAsyncStorage(
        Config.AS_KEY_LOGIN_INFO,
      ); // parse( write의  JSON.stringify() )    , write (key, data ) 'data' will on 'JSON.stringify()' thus must be {"adminId":adminId,"adminPw":adminPw}
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
          dispatch(allActions.setRxLoginInfo(result.DATA_RESULT)); // => 서버에서 내려준 유저 정보
        } else {
          // dispatch(allActions.());
          MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, null);
        }
      } else {
        // dispatch(allActions.());
        MyAsyncStorage._writeAsyncStorage(Config.AS_KEY_LOGIN_INFO, null);
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

      const orderResult = await ServerApi.m_appgoods('g1', '1');
      if (
        orderResult.IS_SUCCESS === true &&
        orderResult.DATA_RESULT.rsp_code === '100'
      ) {
        ///setOrderResult(orderResult.DATA_RESULT.menu)
        setOd1Name(orderResult.DATA_RESULT.menu[0].menu_nm);
        setOd2Name(orderResult.DATA_RESULT.menu[1].menu_nm);
        setOd3Name(orderResult.DATA_RESULT.menu[2].menu_nm);
        setOd4Name(orderResult.DATA_RESULT.menu[3].menu_nm);
        setOd5Name(orderResult.DATA_RESULT.menu[4].menu_nm);
        setOd6Name(orderResult.DATA_RESULT.menu[5].menu_nm);
      } else {
        Alert.alert(
          '',
          `네트워크 환경이 불안정합니다. 앱을 재시작해주세요.\n\nm_app_open_url(${result2.DATA_RESULT.rsp_code})`,
        );
      }
      setLoading(false);
    }

    fetchData();
    // setLoading(false)
  }, [dispatch]);

  const ToLoginAskingProcess = useCallback(
    async clicked => {
      if (MyUtil._isNull(rxLoginInfo)) {
        setIsModalOpen(true);
      } else {
        if (clicked === 'cart') {
          //Alert.alert("", "장바구니 터치")
          navigation.navigate('Cart', {name: '장바구니'});
        } else if (clicked === 'userinfo') {
          //Alert.alert("", "사용자정보 터치")
          navigation.navigate('UserInfo', {name: '사용자 정보'});
        }
      }
    },
    [navigation, rxLoginInfo],
  );

  const _modalCb = useCallback((isOk, jData) => {
    if (isOk) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const _modalCbToLogin = useCallback((isOk, jData) => {
    setIsModalOpen(false);

    if (isOk) {
    } else {
      navigation.navigate('Login');
    }
  }, []);

  const _modalCbSearch = useCallback((isOk, jData) => {
    setSearchResult(null);

    if (isOk) {
      setIsSearchModalOpen(true);
    } else {
      setIsSearchModalOpen(false);
    }
  }, []);

  const _SearchResultChoose = useCallback(
    (good_nm, good_no) => {
      setLoading(true);
      setSearchResult(null);
      setIsSearchModalOpen(false);
      setLoading(false);
      navigation.navigate('ShowItem', {name: good_nm, goodnum: good_no});
    },
    [navigation],
  );

  const _ShowSearchResult = useCallback(async good_nm => {
    if (!MyUtil._isNull(good_nm)) {
      const searchResult = await ServerApi._appGoodsSearch(good_nm);
      if (
        searchResult.IS_SUCCESS === true &&
        searchResult.DATA_RESULT.rsp_code === '100'
      ) {
        //setSearchResult(searchResult.DATA_RESULT.array)
        setCurOdName('searchResult');
        navigation.navigate('searchResult', {
          searchArr: searchResult.DATA_RESULT.array,
        });
        setIsSearchModalOpen(false);
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabLogin:' +
            searchResult.DATA_RESULT.rsp_code,
        );
      }
    }
  }, []);

  const _setSearchTxt = useCallback(txt => {
    setSearchTxt(txt);
  }, []);

  const _setCurOdName = useCallback(odname => {
    setCurOdName(odname);
  }, []);

  const _setOdDrag = useCallback((y, name) => {
    if (name == '') {
      setOd0Drag(y);
    } else if (name == 'g1') {
      setOd1Drag(y);
    } else if (name == 'g2') {
      setOd2Drag(y);
    } else if (name == 'g3') {
      setOd3Drag(y);
    } else if (name == 'g4') {
      setOd4Drag(y);
    } else if (name == 'g5') {
      setOd5Drag(y);
    } else if (name == 'g6') {
      setOd6Drag(y);
    } else {
      setOd0Drag(y);
    }
  }, []);

  const ResetAllList = useCallback(
    (
      od0Name,
      od1Name,
      od2Name,
      od3Name,
      od4Name,
      od5Name,
      od6Name,
      od7Name,
    ) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {name: od0Name},
            {name: od1Name},
            {name: od2Name},
            {name: od3Name},
            {name: od4Name},
            {name: od5Name},
            {name: od6Name},
            {name: od7Name},
          ],
        }),
      );

      navigation.navigate(od0Name), setCurOdName(od0Name);
    },
    [],
  );

  const RefreshTabs = useCallback(
    (
      od0Name,
      od1Name,
      od2Name,
      od3Name,
      od4Name,
      od5Name,
      od6Name,
      od7Name,
      curOdName,
    ) => {
      return (
        <View
          style={{
            height: Layout.window.topBarHeight * 2.4,
            width: Layout.window.width,
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: Layout.window.topBarHeight * 1.2,
              width: Layout.window.width,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <TouchableOpacity
              style={{
                width: Layout.window.width / 4.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate(od0Name), setCurOdName(od0Name);
              }}>
              <Text
                allowFontScaling={false}
                style={
                  curOdName === od0Name
                    ? {
                        fontWeight: 'bold',
                        fontSize: Layout.fsL,
                        margin: 12,
                        color: 'black',
                      }
                    : {fontWeight: 'bold', fontSize: Layout.fsL, color: 'grey'}
                }>
                전체
              </Text>
              <View>
                {curOdName === od0Name ? (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 2,
                      width: Layout.window.width / 4.2,
                    }}
                  />
                ) : (
                  <View style={{height: 2, width: Layout.window.width / 4.2}} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: Layout.window.width / 4.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate(od1Name), setCurOdName(od1Name);
              }}>
              <Text
                allowFontScaling={false}
                style={
                  curOdName === od1Name
                    ? {
                        fontWeight: 'bold',
                        fontSize: Layout.fsL,
                        margin: 12,
                        color: 'black',
                      }
                    : {fontWeight: 'bold', fontSize: Layout.fsL, color: 'grey'}
                }>
                상의
              </Text>
              <View>
                {curOdName === od1Name ? (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 2,
                      width: Layout.window.width / 4.2,
                    }}
                  />
                ) : (
                  <View style={{height: 2, width: Layout.window.width / 4.2}} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: Layout.window.width / 4.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate(od2Name), setCurOdName(od2Name);
              }}>
              <Text
                allowFontScaling={false}
                style={
                  curOdName === od2Name
                    ? {
                        fontWeight: 'bold',
                        fontSize: Layout.fsL,
                        margin: 12,
                        color: 'black',
                      }
                    : {fontWeight: 'bold', fontSize: Layout.fsL, color: 'grey'}
                }>
                하의
              </Text>
              <View>
                {curOdName === od2Name ? (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 2,
                      width: Layout.window.width / 4.2,
                    }}
                  />
                ) : (
                  <View style={{height: 2, width: Layout.window.width / 4.2}} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: Layout.window.width / 3.4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate(od3Name), setCurOdName(od3Name);
              }}>
              <Text
                allowFontScaling={false}
                style={
                  curOdName === od3Name
                    ? {
                        fontWeight: 'bold',
                        fontSize: Layout.fsL,
                        margin: 12,
                        color: 'black',
                      }
                    : {fontWeight: 'bold', fontSize: Layout.fsL, color: 'grey'}
                }>
                골프웨어
              </Text>
              <View>
                {curOdName === od3Name ? (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 2,
                      width: Layout.window.width / 4.2,
                    }}
                  />
                ) : (
                  <View style={{height: 2, width: Layout.window.width / 4.2}} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: Layout.window.topBarHeight * 1.2,
              width: Layout.window.width,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <TouchableOpacity
              style={{
                width: Layout.window.width / 4.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate(od4Name), setCurOdName(od4Name);
              }}>
              <Text
                allowFontScaling={false}
                style={
                  curOdName === od4Name
                    ? {
                        fontWeight: 'bold',
                        fontSize: Layout.fsL,
                        margin: 12,
                        color: 'black',
                      }
                    : {fontWeight: 'bold', fontSize: Layout.fsL, color: 'grey'}
                }>
                시계
              </Text>
              <View>
                {curOdName === od4Name ? (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 2,
                      width: Layout.window.width / 4.2,
                    }}
                  />
                ) : (
                  <View style={{height: 2, width: Layout.window.width / 4.2}} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: Layout.window.width / 4.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate(od5Name), setCurOdName(od5Name);
              }}>
              <Text
                allowFontScaling={false}
                style={
                  curOdName === od5Name
                    ? {
                        fontWeight: 'bold',
                        fontSize: Layout.fsL,
                        margin: 12,
                        color: 'black',
                      }
                    : {fontWeight: 'bold', fontSize: Layout.fsL, color: 'grey'}
                }>
                신발
              </Text>
              <View>
                {curOdName === od5Name ? (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 2,
                      width: Layout.window.width / 4.2,
                    }}
                  />
                ) : (
                  <View style={{height: 2, width: Layout.window.width / 4.2}} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: Layout.window.width / 4.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate(od6Name), setCurOdName(od6Name);
              }}>
              <Text
                allowFontScaling={false}
                style={
                  curOdName === od6Name
                    ? {
                        fontWeight: 'bold',
                        fontSize: Layout.fsL,
                        margin: 12,
                        color: 'black',
                      }
                    : {fontWeight: 'bold', fontSize: Layout.fsL, color: 'grey'}
                }>
                잡화
              </Text>
              <View>
                {curOdName === od6Name ? (
                  <View
                    style={{
                      backgroundColor: 'black',
                      height: 2,
                      width: Layout.window.width / 4.2,
                    }}
                  />
                ) : (
                  <View style={{height: 2, width: Layout.window.width / 4.2}} />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: Layout.window.width / 3.4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('NotificationList', {name: '공지사항'});
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: 'bold',
                  fontSize: Layout.fsL,
                  color: Colors.shoppingRed,
                }}>
                공지사항
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [curOdName],
  );

  return (
    <SafeAreaView style={{flexGrow: 1, width: Layout.window.width}}>
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1, width: Layout.window.width}}>
          <View
            style={{
              height: Layout.window.topBarHeight * 1.3,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            {/* 로고 리스트 갱신 */}
            <View style={{flex: 1, justifyContent: 'center', marginLeft: 3}}>
              <TouchableOpacity
                onPress={() => {
                  ResetAllList(
                    od0Name,
                    od1Name,
                    od2Name,
                    od3Name,
                    od4Name,
                    od5Name,
                    od6Name,
                    od7Name,
                  );
                }}>
                <Image
                  source={require('../../img/logo_1.png')}
                  style={{
                    width: (Layout.window.width * 1) / 4.5,
                    height: '100%',
                    marginLeft: 10,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* 상단 */}
            <View style={{flex: 1, justifyContent: 'center', marginTop: 10}}>
              <Image
                source={require('../../img/logo_2.png')}
                style={{
                  tintColor: 'black',
                  width: (Layout.window.width * 1) / 4.5,
                  height: '100%',
                  marginLeft: 3,
                  marginTop: 5,
                }}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                flex: 2,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  _modalCbSearch(true);
                }}>
                <Image
                  source={require('../../img/Search.png')}
                  style={{
                    width: (Layout.window.width * 1) / 18,
                    height: (Layout.window.width * 1) / 18,
                    marginRight: 9,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setclickedbtn('장바구니는');
                  ToLoginAskingProcess('cart');
                }}>
                <Image
                  source={require('../../img/Cart.png')}
                  style={{
                    width: (Layout.window.width * 1) / 16,
                    height: (Layout.window.width * 1) / 16,
                    marginRight: 13,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setclickedbtn('사용자 정보는');
                  ToLoginAskingProcess('userinfo');
                }}>
                <Image
                  source={require('../../img/Profile.png')}
                  style={{
                    width: (Layout.window.width * 1) / 18,
                    height: (Layout.window.width * 1) / 18,
                    marginRight: 13,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AlertMsg', {name: '알림메세지'});
                }}>
                <Image
                  source={require('../../img/alert.png')}
                  style={{
                    width: (Layout.window.width * 1) / 17,
                    height: (Layout.window.width * 1) / 17,
                    marginRight: 8,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* 상단 배너 */}
          <Banners
            od0Drag={od0Drag}
            od1Drag={od1Drag}
            od2Drag={od2Drag}
            od3Drag={od3Drag}
            od4Drag={od4Drag}
            od5Drag={od5Drag}
            od6Drag={od6Drag}
          />

          {/* 탭 버튼 */}
          {RefreshTabs(
            od0Name,
            od1Name,
            od2Name,
            od3Name,
            od4Name,
            od5Name,
            od6Name,
            od7Name,
            curOdName,
          )}

          {/* 상품 리스트 탭스택 */}
          <HomeScreenTabStack.Navigator
            screenOptions={({route}) => ({
              tabBarLabel: ({focused}) => {
                return (
                  <View style={{width: Layout.window.width}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: 'bold',
                        fontSize: Layout.fsM,
                        color: focused
                          ? Colors.shoppingRed
                          : Colors.baseTextMidGray,
                      }}>
                      {route.name}
                    </Text>
                    {_setCurOdName(route.name)}
                  </View>
                );
              },
              tabBarStyle: {height: 0}, // 탭바 숨김
              tabBarActiveTintColor: Colors.shoppingRed,
              tabBarInactiveTintColor: Colors.baseTextMidGray,
              tabBarShowLabel: false, // 라벨 숨김
              tabBarIconStyle: {justifyContent: 'center', alignItems: 'center'},
              tabBarLabelStyle: {
                fontWeight: 'bold',
                justifyContent: 'center',
                alignItems: 'center',
              },
              tabBarTabStyle: {
                fontWeight: 'bold',
                justifyContent: 'center',
                alignItems: 'center',
              },
              tabBarIndicatorStyle: {backgroundColor: Colors.shoppingRed},
              lazy: true,
            })}>
            <HomeScreenTabStack.Screen name={od0Name}>
              {props => (
                <ProductList
                  {...props}
                  odName={od0Name}
                  _setOdDrag={_setOdDrag}
                />
              )}
            </HomeScreenTabStack.Screen>

            <HomeScreenTabStack.Screen
              name={od1Name}
              options={{
                tabBarIcon: ({focused, size}) => {
                  const iconProps = {
                    width: Layout.window.width / 6.7,
                    height: '100%',
                  };

                  let iconName = '';
                  switch (od1Name) {
                    case '상의':
                      iconName = btnstop;
                      break;
                    case '하의':
                      iconName = btnspants;
                      break;
                    case '골프웨어':
                      iconName = btnsgolfwear;
                      break;
                    case '신발':
                      iconName = btnsshoe;
                      break;
                    case '시계':
                      iconName = btnswatch;
                      break;
                    case '잡화':
                      iconName = btnsacce;
                      break;
                    default:
                      // Handle the default case or throw an error if needed
                      break;
                  }

                  return (
                    <Image
                      style={iconProps}
                      resizeMode="contain"
                      tintColor={
                        focused ? Colors.shoppingRed : Colors.baseTextMidGray
                      }
                      source={iconName}
                    />
                  );
                },
              }}>
              {props => (
                <ProductList
                  {...props}
                  odName={od1Name}
                  _setOdDrag={_setOdDrag}
                />
              )}
            </HomeScreenTabStack.Screen>

            <HomeScreenTabStack.Screen
              name={od2Name}
              options={{
                tabBarIcon: ({focused, size}) => {
                  const iconProps = {
                    width: Layout.window.width / 6.7,
                    height: '100%',
                  };

                  let iconName = '';
                  switch (od2Name) {
                    case '상의':
                      iconName = btnstop;
                      break;
                    case '하의':
                      iconName = btnspants;
                      break;
                    case '골프웨어':
                      iconName = btnsgolfwear;
                      break;
                    case '신발':
                      iconName = btnsshoe;
                      break;
                    case '시계':
                      iconName = btnswatch;
                      break;
                    case '잡화':
                      iconName = btnsacce;
                      break;
                    default:
                      // Handle the default case or throw an error if needed
                      break;
                  }

                  return (
                    <Image
                      style={iconProps}
                      resizeMode="contain"
                      tintColor={
                        focused ? Colors.shoppingRed : Colors.baseTextMidGray
                      }
                      source={iconName}
                    />
                  );
                },
              }}>
              {props => (
                <ProductList
                  {...props}
                  odName={od2Name}
                  _setOdDrag={_setOdDrag}
                />
              )}
            </HomeScreenTabStack.Screen>

            <HomeScreenTabStack.Screen
              name={od3Name}
              options={{
                tabBarIcon: ({focused, size}) => {
                  const iconProps = {
                    width: Layout.window.width / 6.7,
                    height: '100%',
                  };

                  let iconName = '';
                  switch (od3Name) {
                    case '상의':
                      iconName = btnstop;
                      break;
                    case '하의':
                      iconName = btnspants;
                      break;
                    case '골프웨어':
                      iconName = btnsgolfwear;
                      break;
                    case '신발':
                      iconName = btnsshoe;
                      break;
                    case '시계':
                      iconName = btnswatch;
                      break;
                    case '잡화':
                      iconName = btnsacce;
                      break;
                    default:
                      // Handle the default case or throw an error if needed
                      break;
                  }

                  return (
                    <Image
                      style={iconProps}
                      resizeMode="contain"
                      tintColor={
                        focused ? Colors.shoppingRed : Colors.baseTextMidGray
                      }
                      source={iconName}
                    />
                  );
                },
              }}>
              {props => (
                <ProductList
                  {...props}
                  odName={od3Name}
                  _setOdDrag={_setOdDrag}
                />
              )}
            </HomeScreenTabStack.Screen>

            <HomeScreenTabStack.Screen
              name={od4Name}
              options={{
                tabBarIcon: ({focused, size}) => {
                  const iconProps = {
                    width: Layout.window.width / 6.7,
                    height: '100%',
                  };

                  let iconName = '';
                  switch (od4Name) {
                    case '상의':
                      iconName = btnstop;
                      break;
                    case '하의':
                      iconName = btnspants;
                      break;
                    case '골프웨어':
                      iconName = btnsgolfwear;
                      break;
                    case '신발':
                      iconName = btnsshoe;
                      break;
                    case '시계':
                      iconName = btnswatch;
                      break;
                    case '잡화':
                      iconName = btnsacce;
                      break;
                    default:
                      // Handle the default case or throw an error if needed
                      break;
                  }

                  return (
                    <Image
                      style={iconProps}
                      resizeMode="contain"
                      tintColor={
                        focused ? Colors.shoppingRed : Colors.baseTextMidGray
                      }
                      source={iconName}
                    />
                  );
                },
              }}>
              {props => (
                <ProductList
                  {...props}
                  odName={od4Name}
                  _setOdDrag={_setOdDrag}
                />
              )}
            </HomeScreenTabStack.Screen>

            <HomeScreenTabStack.Screen
              name={od5Name}
              options={{
                tabBarIcon: ({focused, size}) => {
                  const iconProps = {
                    width: Layout.window.width / 6.7,
                    height: '100%',
                  };

                  let iconName = '';
                  switch (od5Name) {
                    case '상의':
                      iconName = btnstop;
                      break;
                    case '하의':
                      iconName = btnspants;
                      break;
                    case '골프웨어':
                      iconName = btnsgolfwear;
                      break;
                    case '신발':
                      iconName = btnsshoe;
                      break;
                    case '시계':
                      iconName = btnswatch;
                      break;
                    case '잡화':
                      iconName = btnsacce;
                      break;
                    default:
                      // Handle the default case or throw an error if needed
                      break;
                  }

                  return (
                    <Image
                      style={iconProps}
                      resizeMode="contain"
                      tintColor={
                        focused ? Colors.shoppingRed : Colors.baseTextMidGray
                      }
                      source={iconName}
                    />
                  );
                },
              }}>
              {props => (
                <ProductList
                  {...props}
                  odName={od5Name}
                  _setOdDrag={_setOdDrag}
                />
              )}
            </HomeScreenTabStack.Screen>

            <HomeScreenTabStack.Screen
              name={od6Name}
              options={{
                tabBarIcon: ({focused, size}) => {
                  const iconProps = {
                    width: Layout.window.width / 6.7,
                    height: '100%',
                  };

                  let iconName = '';
                  switch (od6Name) {
                    case '상의':
                      iconName = btnstop;
                      break;
                    case '하의':
                      iconName = btnspants;
                      break;
                    case '골프웨어':
                      iconName = btnsgolfwear;
                      break;
                    case '신발':
                      iconName = btnsshoe;
                      break;
                    case '시계':
                      iconName = btnswatch;
                      break;
                    case '잡화':
                      iconName = btnsacce;
                      break;
                    default:
                      // Handle the default case or throw an error if needed
                      break;
                  }

                  return (
                    <Image
                      style={iconProps}
                      resizeMode="contain"
                      tintColor={
                        focused ? Colors.shoppingRed : Colors.baseTextMidGray
                      }
                      source={iconName}
                    />
                  );
                },
              }}>
              {props => (
                <ProductList
                  {...props}
                  odName={od6Name}
                  _setOdDrag={_setOdDrag}
                />
              )}
            </HomeScreenTabStack.Screen>

            <HomeScreenTabStack.Screen
              name={od7Name}
              component={SearchResult}
              options={{}}
            />
          </HomeScreenTabStack.Navigator>

          <View style={styles.floatingActionView}>
            <TouchableOpacity
              onPress={() => {
                !MyUtil._isNull(kakaoUrl) && Linking.openURL(kakaoUrl);
              }}>
              <Image
                source={require('../../img/btn_floatingaction_kakao.png')}
                style={{
                  width: (Layout.window.width * 1) / 6,
                  height: (Layout.window.width * 1) / 6,
                  marginRight: 10,
                  marginBottom: 7,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <ModalBottomMainToLogin
            isModalOpen={isModalOpen}
            _modalCb={_modalCb}
            _modalCbToLogin={_modalCbToLogin}
            clickedbtn={clickedbtn}
          />
          <ModalBottomSearch
            isSearchModalOpen={isSearchModalOpen}
            _modalCbSearch={_modalCbSearch}
            _SearchResultChoose={_SearchResultChoose}
            _ShowSearchResult={_ShowSearchResult}
            searchResult={searchResult}
            _searchTxt={_searchTxt}
            _setSearchTxt={_setSearchTxt}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatingActionView: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default MainScreen;
