import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Linking,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyAsyncStorage from '../../constants/MyAsyncStorage';
import Config from '../../constants/Config';
import Loader from '../../components/Loader';
import * as MyUtil from '../../constants/MyUtil';
import HTML from 'react-native-render-html';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import MainScreen from '../MainScreens/MainScreen';
import ModalBottomUsingInfo from '../../components/ModalBottomUsingInfo';
import FastImage from 'react-native-fast-image';
import ProductItem from '../../components/ProductItem';

const SearchResult = ({curOdName, _setCurOdName, searchArr}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usingInfoData, setUsingInfoData] = useState(false);
  const [arrData, setArrData] = useState([]);
  const route = useRoute();

  const [isUsingInfoModalOpen, setIsUsingInfoModalOpen] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      getUsingInfo();
      setArrData(route.params?.searchArr);
      setLoading(false);
    }

    if (route.params?.searchArr) {
      fetchData();
    }
  }, [route.params?.searchArr]);

  const _modalCb = useCallback((isOk, jData) => {
    if (isOk) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const getUsingInfo = useCallback(async () => {
    const result = await ServerApi.m_appuseterm();
    if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
      setUsingInfoData(result.DATA_RESULT.use_term);
    } else {
      Alert.alert(
        '',
        '네트워크 환경이 불안정 합니다!\n_m_appreview:' +
          result.DATA_RESULT.rsp_code,
      );
    }
  }, []);

  return (
    <SafeAreaView
      style={{width: Layout.window.width, flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          style={styles.ScrollViewforGrid}
          keyboardShouldPersistTaps="handled">
          {/* 검색 페이지 */}
          {arrData.length == 0 ? (
            <View
              style={{
                height: Layout.window.width * 1.5,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{marginTop: 50, fontSize: Layout.fsM, color: 'black'}}>
                검색 결과를 찾을 수 없습니다..
              </Text>
            </View>
          ) : (
            <View style={styles.GridSpace}>
              {arrData.length > 0 ? (
                arrData.map((item, idx) => (
                  <ProductItem key={idx} item={item} navigation={navigation} />
                  // <View key={idx} style={styles.GridView}>
                  //     <TouchableOpacity style={{ flex: 1 }}
                  //         onPress={() => { navigation.navigate('ShowItem', { name: item.good_nm, goodnum: item.good_no, fromPage: "MainScreen" }) }}>
                  //         <View style={{ flex: 7.5, width: '100%', alignItems: 'center', justifyContent: "flex-start" }}>
                  //             <FastImage
                  //                 style={styles.imgInGridView}
                  //                 source={{
                  //                     uri: Config.TITLEIMG_URL + item.file_nm,
                  //                     priority: FastImage.priority.high,
                  //                 }}
                  //                 resizeMode={FastImage.resizeMode.cover}
                  //             />
                  //         </View>

                  //         <View style={{ flex: 2.5, justifyContent: "center", alignItems: 'flex-start', backgroundColor: 'white' }}>
                  //             <View style={{ flex: 1, }}>
                  //                 <Text numberOfLines={1} style={styles.txtProductName}>{item.good_nm}</Text>
                  //             </View>
                  //             <View style={{ flex: 1, marginBottom: Layout.window.width * 9 / 350 }}>
                  //                 <Text style={styles.txtProductPrice}>{MyUtil._toThousandsCommas(item.price)} 원</Text>
                  //             </View>
                  //         </View>
                  //     </TouchableOpacity>
                  // </View>
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
              {arrData.length < 3 ? (
                <View
                  style={{
                    flex: 1,
                    height: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              )}
            </View>
          )}

          <View
            style={{
              height: Layout.window.GapLvII * 0.85,
              marginTop: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#353535',
            }}>
            <Text
              allowFontScaling={false}
              style={{marginTop: 10, fontSize: Layout.fsS, color: 'white'}}>
              상호명:럭스몰 / 대표자:서수영
            </Text>
            <Text
              allowFontScaling={false}
              style={{fontSize: Layout.fsS, color: 'white'}}>
              이메일:deuxisttt@naver.com
            </Text>
            <Text
              allowFontScaling={false}
              style={{fontSize: Layout.fsS, color: 'white'}}>
              사업장주소:대구광역시 중구 대신동 럭스몰 (반품주소아님)
            </Text>
            <View
              allowFontScaling={false}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: '#353535',
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  marginTop: 2,
                  marginBottom: 5,
                  fontSize: Layout.fsS,
                  color: 'white',
                }}
                onPress={() => _modalCb(true)}>
                이용안내
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  marginTop: 2,
                  marginBottom: 5,
                  fontSize: Layout.fsS,
                  color: 'white',
                }}>
                {' '}
                /{' '}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  marginTop: 2,
                  marginBottom: 5,
                  fontSize: Layout.fsS,
                  color: 'white',
                }}
                onPress={() =>
                  navigation.navigate('NotificationList', {name: '공지사항'})
                }>
                공지사항
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
      <ModalBottomUsingInfo
        isModalOpen={isModalOpen}
        _modalCb={_modalCb}
        usingInfoData={usingInfoData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtProductName: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
    marginLeft: 10,
    marginTop: 2,
  },
  txtProductPrice: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 2,
  },
  ScrollViewforGrid: {
    width: Layout.window.width,
    flex: 1,
    backgroundColor: Colors.shoppingBg,
  },
  GridSpace: {
    width: Layout.window.width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: Layout.window.GapLvI * 0.03,
  },
  GridView: {
    width: Layout.window.GapLvI * 0.9,
    height: Layout.window.GapLvI * 1,
    margin: Layout.window.GapLvI * 0.048,
    borderRadius: 15,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  imgInGridView: {
    flex: 1,
    //position: 'absolute',
    width: '100%',
    //height: undefined,
    resizeMode: 'contain',
    //aspectRatio: 1,
  },
  PagingNumView: {
    height: Layout.window.GapLvV,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  BottomCompanyView: {
    height: Layout.window.GapLvII,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
});

export default SearchResult;
