import React, {useState, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyUtil from '../../constants/MyUtil';
import ReviewItem from '../../components/ReviewItem';

const ReviewList = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [arrReview, setArrReview] = useState([]);
  const [rowNo, setRowNo] = useState(0);
  const [loadingFlag, setLoadingFlag] = useState(false);

  useEffect(() => {
    async function fetchData() {
      _m_appreview();
    }
    fetchData();
  }, []);

  const _m_appreview = useCallback(async () => {
    setLoadingFlag(true);
    const curRow = rowNo + 1;

    const result = await ServerApi.m_appreview(String(curRow));
    if (result.IS_SUCCESS === true && result.DATA_RESULT.rsp_code === '100') {
      if (result.DATA_RESULT.array.length > 0) {
        const newArray = [...arrReview, ...result.DATA_RESULT.array];
        setArrReview(newArray);
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
  }, [rowNo, arrReview]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <View
          style={{
            backgroundColor: Colors.shoppingBg,
            alignItems: 'center',
            flex: 1,
            width: Layout.window.width,
          }}>
          {!MyUtil._isNull(arrReview) ? (
            <FlatList
              style={{width: Layout.window.width}}
              keyExtractor={(item, index) => String(index)}
              onEndReachedThreshold={0.7}
              initialNumToRender={1} // 필수 * 없으면 데이터 많을시 앱 죽음(IOS)
              onEndReached={() => {
                if (loadingFlag === false) {
                  _m_appreview();
                }
              }}
              data={arrReview}
              renderItem={({item}) => {
                return <ReviewItem item={item} navigation={navigation} />;
              }}
            />
          ) : (
            <Text
              style={{marginTop: 15, fontSize: Layout.fsM, color: '#000000'}}>
              리뷰가 존재하지 않습니다!
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
  reviewContents: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextMidGray,
  },
  imgReviewStar: {
    //flex: 1,
    //position: 'absolute',
    width: Layout.window.GapLvXI * 0.9,
    //height: Layout.window.GapLvXI*0.9,
    //resizeMode: 'cover',
    aspectRatio: 1,
  },
});

export default ReviewList;
