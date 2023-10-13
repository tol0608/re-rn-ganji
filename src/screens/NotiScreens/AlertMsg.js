import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
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
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyUtil from '../../constants/MyUtil';
import Config from '../../constants/Config';
import ModalBottomAlertDetail from '../../components/ModalBottomAlertDetail';

const AlertMsg = () => {
  const navigation = useNavigation();
  const {rxLoginInfo} = useSelector(state => state.rxLoginInfo);
  const [loading, setLoading] = useState(true);
  const [arrData, setArrData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertDate, setAlertDate] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDt, setAlertDt] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (MyUtil._isNull(rxLoginInfo)) {
        Alert.alert('', '먼저 로그인을 해주세요!');
        navigation.goBack();
        return;
      }

      const result = await ServerApi.m_appalarm(rxLoginInfo.u_id);
      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        setArrData(result.DATA_RESULT.array);
        setLoading(false);
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabSearchOrderList:' +
            result.DATA_RESULT.rsp_code,
        );
      }
    }

    fetchData();
  }, [rxLoginInfo, navigation]);

  const _modalCb = useCallback((isOk, jData) => {
    setIsModalOpen(isOk);
  }, []);

  const showAlertDtModal = useCallback((reg_date, title, msg) => {
    setAlertDate(reg_date);
    setAlertTitle(title);
    setAlertDt(msg);
    setIsModalOpen(true);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: Colors.shoppingBg,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: Layout.window.width * 0.9,
              height: Layout.window.GapLvIII,
            }}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <TouchableOpacity
                style={{flexDirection: 'column', alignItems: 'flex-end'}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text allowFontScaling={false} style={styles.alertX}>
                  ✕
                </Text>
              </TouchableOpacity>

              <Text allowFontScaling={false} style={styles.alertBigTitle}>
                알림메세지
              </Text>
            </View>
          </View>
          <ScrollView
            style={{marginTop: 70}}
            keyboardShouldPersistTaps="handled">
            {arrData.length > 0 ? (
              arrData.map((item, idx) => (
                <TouchableOpacity
                  style={{flexDirection: 'column', alignItems: 'flex-end'}}
                  onPress={() => {
                    showAlertDtModal(item.reg_date, item.title, item.msg);
                  }}
                  key={idx}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: Layout.window.GapLvII * 0.75,
                        marginTop: 5,
                        marginBottom: 15,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../img/circle_notice.png')}
                          style={{
                            width: (Layout.window.width * 1) / 5,
                            height: (Layout.window.width * 1) / 5,
                            marginTop: 2,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{flex: 5}}>
                        <Text
                          numberOfLines={1}
                          allowFontScaling={false}
                          style={styles.alertDate}>
                          {item.reg_date}
                        </Text>
                        <Text
                          numberOfLines={3}
                          allowFontScaling={false}
                          style={styles.alertTitle}>
                          {item.title}
                          {item.msg}
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
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  color: '#000000',
                  marginTop: 20,
                  fontSize: Layout.fsM,
                }}>
                알림이 없습니다
              </Text>
            )}
          </ScrollView>
        </View>
      )}
      <ModalBottomAlertDetail
        isModalOpen={isModalOpen}
        _modalCb={_modalCb}
        alertDate={alertDate}
        alertTitle={alertTitle}
        alertDt={alertDt}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alertX: {
    fontSize: Layout.fs11XL,
    color: Colors.shoppingRed,
    marginTop: 20,
    marginRight: 20,
  },
  alertBigTitle: {
    fontSize: Layout.fs8XL,
    color: 'black',
  },
  alertDate: {
    fontSize: Layout.fsM,
    color: 'black',
  },
  alertTitle: {
    fontSize: Layout.fsL,
    color: 'black',
  },
});

export default AlertMsg;
