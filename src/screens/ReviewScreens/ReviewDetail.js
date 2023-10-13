import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyUtil from '../../constants/MyUtil';
import Config from '../../constants/Config';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from "../components/redux/reducer";

const ReviewDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [reviewNo, setReviewNo] = useState(route.params.review_no);
  const [dtData, setDtData] = useState('');

  useEffect(() => {
    async function fetchData() {
      m_app_review_dt();
    }
    fetchData();
  }, []);

  const m_app_review_dt = useCallback(async () => {
    const result = await ServerApi.m_app_review_dt(reviewNo);
    if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
      setDtData(result.DATA_RESULT);
      setLoading(false);
    } else {
      Alert.alert(
        '',
        '네트워크 환경이 불안정 합니다!\n_tabSearchOrderList:' +
          result.DATA_RESULT.rsp_code,
      );
    }
  }, [reviewNo]);

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
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View style={{flex: 7, flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Image
                  source={
                    Number(dtData.star_point) > 0
                      ? require('../../img/star_on.png')
                      : require('../../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
                <Image
                  source={
                    Number(dtData.star_point) > 1
                      ? require('../../img/star_on.png')
                      : require('../../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
                <Image
                  source={
                    Number(dtData.star_point) > 2
                      ? require('../../img/star_on.png')
                      : require('../../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
                <Image
                  source={
                    Number(dtData.star_point) > 3
                      ? require('../../img/star_on.png')
                      : require('../../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
                <Image
                  source={
                    Number(dtData.star_point) > 4
                      ? require('../../img/star_on.png')
                      : require('../../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
              </View>
              <View style={{flex: 2}}>
                <Text allowFontScaling={false} style={styles.rewViewId}>
                  {dtData.name.substring(0, 1) +
                    '*' +
                    dtData.name.substring(
                      dtData.name.length - 1,
                      dtData.name.length,
                    )}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text allowFontScaling={false} style={styles.notiDate}>
                {dtData.reg_date}
              </Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              width: Layout.window.width * 0.9,
              alignItems: 'center',
            }}
            keyboardShouldPersistTaps="handled">
            <View style={{paddingBottom: 20, width: Layout.window.width * 0.9}}>
              <Text allowFontScaling={false} style={styles.reviewTitle}>
                후기
              </Text>
              <Text allowFontScaling={false} style={styles.reviewContents}>
                {dtData.contents}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', paddingBottom: 35, width: '100%'}}>
              {!MyUtil._isNull(dtData.review_img) &&
                dtData.review_img.map((item, idx) => (
                  <Image
                    key={idx}
                    source={{uri: Config.REVIEWIMG_URL + item.file_nm}}
                    style={styles.imgReviewImgs}
                    resizeMode="cover"
                  />
                ))}
            </View>
            <View
              style={{
                backgroundColor: Colors.grayLine3,
                height: 1.5,
                width: Layout.window.width * 0.9,
              }}
            />

            <View style={{paddingTop: 20}} />
            {!MyUtil._isNull(dtData.mng_reply) ? (
              <View style={{}}>
                <View
                  style={{
                    alignContent: 'center',
                    width: Layout.window.width * 0.9,
                    borderRadius: 20,
                    padding: 20,
                    backgroundColor: 'white',
                  }}>
                  <View>
                    <Text style={styles.reviewTitle}> 럭스몰</Text>
                  </View>
                  <Text style={styles.reviewContents}>{dtData.mng_reply}</Text>
                </View>
              </View>
            ) : (
              <View />
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rewViewId: {
    fontSize: Layout.fsL,
    color: 'black',
    //color: Colors.baseTextGray,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  notiDate: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.grayLine2
  },
  reviewTitle: {
    fontSize: Layout.fsL,
    color: 'black',
    //color: Colors.baseTextGray,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  reviewContents: {
    fontSize: Layout.fsL,
    color: 'black',
    //color: Colors.baseTextGray,
  },
  scrollNotiList: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
  },
  imgReviewStar: {
    //flex: 1,
    //position: 'absolute',
    width: Layout.window.GapLvXI * 0.9,
    //height: Layout.window.GapLvXI*0.9,
    //resizeMode: 'cover',
    aspectRatio: 1,
  },
  imgReviewImgs: {
    marginRight: Layout.window.GapLvXI * 0.6,
    //flex: 1,
    //position: 'absolute',
    width: Layout.window.GapLvIV,
    height: Layout.window.GapLvIV,
    //height: Layout.window.GapLvXI*0.9,
    //resizeMode: 'cover',
    aspectRatio: 1,
  },
});

export default ReviewDetail;
