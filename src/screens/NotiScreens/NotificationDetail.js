import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';

const Notification = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [arrData, setarrData] = useState(false);
  const {notinum} = route.params;

  useEffect(() => {
    async function fetchData() {
      const result = await ServerApi.m_appnotidt(String(notinum));
      if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
        setarrData(result.DATA_RESULT);
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabLogin:' +
            result.DATA_RESULT.rsp_code,
        );
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{alignItems: 'center', backgroundColor: Colors.shoppingBg}}>
          <View
            style={{
              flexDirection: 'row',
              width: Layout.window.width * 0.9,
              height: Layout.window.GapLvIII,
            }}>
            <View style={{flex: 14}}>
              <Text allowFontScaling={false} style={styles.notiTitle}>
                {arrData.title}
              </Text>
              <Text allowFontScaling={false} style={styles.notiDate}>
                {arrData.reg_date}
              </Text>
            </View>

            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginBottom: 25,
              }}>
              <Image
                source={require('../../img/read_cnt.png')}
                style={{
                  width: Layout.window.width / 25,
                  height: Layout.window.width / 25,
                }}
                resizeMode="contain"
              />
              <Text allowFontScaling={false} style={styles.notiDate}>
                {arrData.s_ct}+
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: Colors.grayLine3,
              height: 1.5,
              width: Layout.window.width * 0.9,
            }}
          />
          <ScrollView
            contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
            keyboardShouldPersistTaps="handled">
            <View style={{width: Layout.window.width * 0.9}}>
              <Text allowFontScaling={false} style={styles.notiContents}>
                {arrData.contents}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notiTitle: {
    fontSize: Layout.fsL,
    color: 'black',
    fontWeight: 'bold',
  },
  notiDate: {
    fontSize: Layout.fsM,
    color: 'black',
  },
  notiContents: {
    fontSize: Layout.fsL,
    color: 'black',
  },
  scrollNotiList: {
    fontSize: Layout.fsM,
    color: 'black',
  },
});

export default Notification;
