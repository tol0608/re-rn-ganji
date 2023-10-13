import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyUtil from '../../constants/MyUtil';
import Config from '../../constants/Config';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from "../components/redux/reducer";

const NotificationList = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [arrData, setArrData] = useState([]);
  const [rowNo, setRowNo] = useState(0);
  const [loadingFlag, setLoadingFlag] = useState(false);

  useEffect(() => {
    async function fetchData() {
      _appNoti();
    }

    fetchData();
  }, []);

  const _appNoti = useCallback(async () => {
    setLoadingFlag(true);
    const curRow = rowNo + 1;

    const result = await ServerApi.m_appnoti(String(curRow));
    if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
      if (result.DATA_RESULT.array.length > 0) {
        const newArray = [...arrData, ...result.DATA_RESULT.array];
        setArrData(newArray);
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
        '네트워크 환경이 불안정 합니다!\nm_appnoti:' +
          result.DATA_RESULT.rsp_code,
      );
    }
  }, [rowNo, arrData]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.shoppingBg,
            width: Layout.window.width,
          }}>
          {!MyUtil._isNull(arrData) ? (
            <FlatList
              style={{width: Layout.window.width}}
              keyExtractor={(item, index) => String(index)}
              onEndReachedThreshold={0.7}
              initialNumToRender={1} // 필수 * 없으면 데이터 많을시 앱 죽음(IOS)
              onEndReached={() => {
                if (loadingFlag === false) {
                  _appNoti();
                }
              }}
              data={arrData}
              renderItem={({item}) => {
                return (
                  <View
                    style={{flexDirection: 'row', width: Layout.window.width}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 15,
                      }}
                      onPress={() => {
                        navigation.navigate('NotificationDetail', {
                          name: '공지사항',
                          notinum: item.noti_no,
                        });
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: Layout.window.GapLvIII,
                        }}>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                          }}>
                          <Image
                            source={require('../../img/circle_check.png')}
                            style={{
                              width: (Layout.window.width * 1) / 25,
                              height: (Layout.window.width * 1) / 25,
                              marginTop: 2,
                              marginRight: 5,
                            }}
                            resizeMode="contain"
                          />
                        </View>

                        <View style={{flex: 14}}>
                          <Text
                            allowFontScaling={false}
                            style={styles.notiTitle}>
                            {item.title}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={styles.notiDate}>
                            {item.reg_date}
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 3,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginRight: 15,
                            marginBottom: 25,
                          }}>
                          <Image
                            source={require('../../img/read_cnt.png')}
                            style={{
                              width: (Layout.window.width * 1) / 25,
                              height: (Layout.window.width * 1) / 25,
                            }}
                            resizeMode="contain"
                          />
                          <Text
                            allowFontScaling={false}
                            style={styles.notiDate}>
                            {item.s_ct}
                            {'+'}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          backgroundColor: Colors.grayLine3,
                          height: 1.5,
                          width: Layout.window.width * 0.95,
                          marginLeft: 10,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : (
            <Text style={{fontSize: Layout.fsM, color: '#000000'}}>
              알림 내용이 없습니다!
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notiTitle: {
    fontSize: Layout.fsL,
    color: 'black',
    //color: Colors.baseTextGray,
    fontWeight: 'bold',
  },
  notiDate: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.grayLine2
  },
  scrollNotiList: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
  },
});

// // redux 연결 부분
// function mapStateToProps(state) {
//     const { rxLoginInfo } = state;
//     return {
//         rxLoginInfo,
//     };
// }

// // redux 정보 저장 부분
// function mapDispatchToProps(dispatch) {
//     return {
//         setRxLoginInfo: bindActionCreators(actionCreators.setRxLoginInfo, dispatch),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default NotificationList;
