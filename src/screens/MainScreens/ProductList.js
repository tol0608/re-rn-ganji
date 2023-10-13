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
  FlatList,
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
  CommonActions,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ModalBottomUsingInfo from '../../components/ModalBottomUsingInfo';
import ProductItem from '../../components/ProductItem';

const ProductList = ({_setOdDrag}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arrData, setarrData] = useState([]);
  const [thisPage, setThisPage] = useState(false);
  const [rowNo, setRowNo] = useState(0);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [usingInfoData, setUsingInfoData] = useState(false);
  const [isDragging, setIsDragging] = useState(0);

  const route = useRoute();

  const [isUsingInfoModalOpen, setIsUsingInfoModalOpen] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      let thisPage;

      getUsingInfo();
      if (route.name === '상의') {
        thisPage = 'g1';
        setThisPage(thisPage);
        _m_appgoods(thisPage);
      } else if (route.name === '하의') {
        thisPage = 'g2';
        setThisPage(thisPage);
        _m_appgoods(thisPage);
      } else if (route.name === '골프웨어') {
        thisPage = 'g3';
        setThisPage(thisPage);
        _m_appgoods(thisPage);
      } else if (route.name === '신발') {
        thisPage = 'g4';
        setThisPage(thisPage);
        _m_appgoods(thisPage);
      } else if (route.name === '시계') {
        thisPage = 'g5';
        setThisPage(thisPage);
        _m_appgoods(thisPage);
      } else if (route.name === '잡화') {
        thisPage = 'g6';
        setThisPage(thisPage);
        _m_appgoods(thisPage);
      } else if (route.name === 'totalList') {
        thisPage = '';
        setThisPage(thisPage);
        _m_appgoods(thisPage);
      } else if (route.name === 'searchResult') {
      }
    }
    fetchData();
  }, []);

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

  const _m_appgoods = useCallback(
    async thisPage => {
      setLoadingFlag(true);
      const curRow = rowNo + 1;

      const result = await ServerApi.m_appgoods(thisPage, String(curRow));
      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        if (result.DATA_RESULT.array.length > 0) {
          const newArray = [...arrData, ...result.DATA_RESULT.array];
          setarrData(newArray);
          setLoading(false);
          setRowNo(curRow);
          setLoadingFlag(false);
        } else {
          setLoading(false);
          setLoadingFlag(true);
        }
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_m_appreview:' +
            result.DATA_RESULT.rsp_code,
        );
      }
    },
    [rowNo, arrData],
  );

  const _setOdDragg = useCallback((y, odName) => {
    _setOdDrag(y, odName);
  }, []);

  return (
    <SafeAreaView
      style={{width: Layout.window.width, flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <Loader />
      ) : !MyUtil._isNull(arrData) ? (
        <FlatList
          onMomentumScrollEnd={event => {
            _setOdDragg(event.nativeEvent.contentOffset.y, 'aa');
            setIsDragging(event.nativeEvent.contentOffset.y);
          }}
          style={[styles.GridSpace, {flex: 1}]}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={0.8}
          initialNumToRender={1} // 필수 * 없으면 데이터 많을시 앱 죽음(IOS)
          ListFooterComponent={
            <View
              style={{
                width: Layout.window.width,
                height: 100,
                marginTop: 50,
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
          }
          onEndReached={() => {
            if (loadingFlag === false) {
              _m_appgoods(thisPage);
            }
          }}
          data={arrData}
          renderItem={({item}) => {
            return <ProductItem item={item} navigation={navigation} />;
          }}
          numColumns={3}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
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
    backgroundColor: Colors.shoppingBg,
    width: Layout.window.width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: Layout.window.GapLvI * 0.03,
    paddingBottom: Layout.window.GapLvI * 0.03,
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

export default ProductList;
