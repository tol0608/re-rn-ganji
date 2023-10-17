import React, {useState, useCallback, useEffect} from 'react';
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
import Loader from '../../components/Loader';
import {useNavigation, useRoute} from '@react-navigation/native';
import ModalBottomUsingInfo from '../../components/ModalBottomUsingInfo';
import ProductItem from '../../components/ProductItem';

const SearchResult = ({curOdName, _setCurOdName, searchArr}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usingInfoData, setUsingInfoData] = useState(false);
  const [arrData, setArrData] = useState([]);
  const route = useRoute();

  useEffect(() => {
    async function fetchData() {
      getUsingInfo();
      setArrData(route.params?.searchArr);
      setLoading(false);
    }

    if (route.params?.searchArr) {
      fetchData();
    }
  }, [getUsingInfo, route.params?.searchArr]);

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
    marginLeft: 10,
    marginTop: 2,
  },
  txtProductPrice: {
    fontSize: Layout.fsM,
    color: 'black',
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
    height: Layout.window.GapLvI,
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
