import React, {useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as MyUtil from '../../constants/MyUtil';
import * as ServerApi from '../../constants/ServerApi';
import * as MyAsyncStorage from '../../constants/MyAsyncStorage';
import Config from '../../constants/Config';
import ImagePicker from 'react-native-image-crop-picker';
import {greaterThan} from 'react-native-reanimated';
import {TextInput} from 'react-native-gesture-handler';

const ReviewWrite = ({route}) => {
  const navigation = useNavigation();
  const {rxLoginInfo} = useSelector(
    state => state.rxLoginInfo,
    (prev, next) => {
      return prev.rxLoginInfo === next.rxLoginInfo;
    },
  );
  const [loading, setLoading] = useState(false);
  const [arrData, setArrData] = useState([]);

  const {goodnm, optionnm, ordertempno, filenm} = route.params; //goodnm: array2item.good_nm, optionnm:option_nm, ordertempno: array2item.order_temp_no

  const [curStartNum, setCurStartNum] = useState(5);
  const [contents, setContents] = useState('');

  const [imgPath01, setImgPath01] = useState(null);
  const [imgPath02, setImgPath02] = useState(null);
  const [imgPath03, setImgPath03] = useState(null);
  const [imgPath04, setImgPath04] = useState(null);
  const [imgPath05, setImgPath05] = useState(null);
  const [imgPath06, setImgPath06] = useState(null);

  const ShowReviewStar = useCallback((num, curStartNum) => {
    if (num <= curStartNum) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ImageBackground
            source={require('../../img/star_on.png')}
            style={styles.imgReviewStar}
            resizeMode="cover"
          />
        </View>
      );
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ImageBackground
            source={require('../../img/star_off.png')}
            style={styles.imgReviewStar}
            resizeMode="cover"
          />
        </View>
      );
    }
  }, []);

  const RefreshStars = useCallback(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setCurStartNum(1);
          }}>
          {ShowReviewStar(1, curStartNum)}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCurStartNum(2);
          }}>
          {ShowReviewStar(2, curStartNum)}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCurStartNum(3);
          }}>
          {ShowReviewStar(3, curStartNum)}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCurStartNum(4);
          }}>
          {ShowReviewStar(4, curStartNum)}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setCurStartNum(5);
          }}>
          {ShowReviewStar(5, curStartNum)}
        </TouchableWithoutFeedback>
      </View>
    );
  }, [curStartNum]);

  const _imageSelect = useCallback(async pickorder => {
    ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true,
      includeBase64: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
    })
      .then(image => {
        if (pickorder == '1') {
          setImgPath01(image);
        } else if (pickorder == '2') {
          setImgPath02({uri: 'data:' + image.mime + ';base64,' + image.data});
        } else if (pickorder == '3') {
          setImgPath03({uri: 'data:' + image.mime + ';base64,' + image.data});
        } else if (pickorder == '4') {
          setImgPath04({uri: 'data:' + image.mime + ';base64,' + image.data});
        } else if (pickorder == '5') {
          setImgPath05({uri: 'data:' + image.mime + ';base64,' + image.data});
        } else if (pickorder == '6') {
          setImgPath06({uri: 'data:' + image.mime + ';base64,' + image.data});
        }
      })
      .catch(e => {
        MyUtil._consoleLog('imagepicker error : ' + e);
        if (pickorder == '1') {
          setImgPath01(null);
        } else if (pickorder == '2') {
          setImgPath02(null);
        } else if (pickorder == '3') {
          setImgPath03(null);
        } else if (pickorder == '4') {
          setImgPath04(null);
        } else if (pickorder == '5') {
          setImgPath05(null);
        } else if (pickorder == '6') {
          setImgPath06(null);
        }
      });
  }, []);

  const ReviewWriteProcess = useCallback(
    async (
      order_temp_no,
      u_id,
      star_point,
      contents,
      imgPath01,
      imgPath02,
      imgPath03,
      imgPath04,
      imgPath05,
      imgPath06,
    ) => {
      const formData = new FormData();
      formData.append('order_temp_no', String(order_temp_no));
      formData.append('u_id', String(u_id));
      formData.append('star_point', String(star_point));
      formData.append('contents', String(contents));

      if (!MyUtil._isNull(imgPath01)) {
        formData.append('imgPath01', {
          name: 'imgPath01.jpg',
          type: imgPath01.mime,
          uri: imgPath01.path,
        });
      }

      if (!MyUtil._isNull(imgPath02)) {
        formData.append('imgPath02', {
          name: 'imgPath02.jpg',
          type: imgPath02.mime,
          uri: imgPath02.path,
        });
      }

      if (!MyUtil._isNull(imgPath03)) {
        formData.append('imgPath03', {
          name: 'imgPath03.jpg',
          type: imgPath03.mime,
          uri: imgPath03.path,
        });
      }

      if (!MyUtil._isNull(imgPath04)) {
        formData.append('imgPath04', {
          name: 'imgPath04.jpg',
          type: imgPath04.mime,
          uri: imgPath04.path,
        });
      }

      if (!MyUtil._isNull(imgPath05)) {
        formData.append('imgPath05', {
          name: 'imgPath05.jpg',
          type: imgPath05.mime,
          uri: imgPath05.path,
        });
      }

      if (!MyUtil._isNull(imgPath06)) {
        formData.append('imgPath06', {
          name: 'imgPath06.jpg',
          type: imgPath06.mime,
          uri: imgPath06.path,
        });
      }

      const result = await ServerApi.m_apreviewi(formData);

      if (result.DATA_RESULT.rsp_code === '100') {
        //navigation.replace('OrderList', { name: '주문 내역' })
        navigation.navigate('OrderList', {
          name: '주문 내역',
          writtenNo: ordertempno,
        });
        //navigation.goBack();
      } else if (result.DATA_RESULT.rsp_code === '300') {
        Alert.alert('', '실패');
      } else {
        Alert.alert(
          '',
          '네트워크 환경이 불안정 합니다!\n_tabLogin:' +
            result.DATA_RESULT.rsp_code,
        );
      }
    },
    [],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.shoppingBg}}>
      {loading ? (
        <Loader />
      ) : (
        <View style={{alignItems: 'center'}}>
          <ScrollView style={{marginTop: 15, flexDirection: 'column'}}>
            <View style={{}}>
              <View style={{}}>
                <View
                  style={{flexDirection: 'row', height: Layout.window.GapLvII}}>
                  <View
                    style={{
                      flex: 2,
                      marginLeft: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: Config.TITLEIMG_URL + filenm}}
                      style={{
                        width: Layout.window.GapLvIII,
                        height: Layout.window.GapLvIII,
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <View
                    style={{
                      flex: 6,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      marginLeft: 15,
                    }}>
                    <Text
                      numberOfLines={1}
                      allowFontScaling={false}
                      style={styles.txtGoodNm}>
                      {goodnm}
                    </Text>
                    <Text
                      numberOfLines={1}
                      allowFontScaling={false}
                      style={styles.txtOptionNm}>
                      {optionnm}
                    </Text>
                  </View>
                </View>
              </View>

              {RefreshStars()}

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    marginTop: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: Layout.window.width * 0.9,
                  }}>
                  <View
                    style={{
                      paddingTop: 10,
                      paddingLeft: 25,
                      paddingRight: 25,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <TextInput
                      allowFontScaling={false}
                      multiline={true}
                      maxLength={1000}
                      placeholder={
                        '구매하신 상품에 대해 사용후기를 작성해주세요\n(최대1000자)\n\n\n\n\n\n\n\n'
                      }
                      style={styles.txtReivewWriteBox}
                      onChangeText={text => setContents(text)}
                    />
                  </View>
                </View>
              </View>

              <View>
                <ScrollView
                  marginTop={15}
                  marginLeft={Layout.window.GapLvXI * 0.2}
                  height={Layout.window.GapLvIII * 1.3}
                  horizontal={true}>
                  <TouchableOpacity
                    style={
                      MyUtil._isNull(imgPath01)
                        ? {
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: Layout.window.GapLvIII * 1.3,
                          }
                        : {
                            justifyContent: 'flex-start',
                            width: Layout.window.GapLvIII * 1.3,
                            paddingLeft: Layout.window.GapLvXI,
                          }
                    }
                    onPress={() => {
                      _imageSelect('1');
                    }}>
                    <Image
                      source={
                        MyUtil._isNull(imgPath01)
                          ? require('../../img/add_pic.png')
                          : {
                              uri:
                                'data:' +
                                imgPath01.mime +
                                ';base64,' +
                                imgPath01.data,
                            }
                      }
                      style={
                        MyUtil._isNull(imgPath01)
                          ? {
                              width: Layout.window.GapLvIII * 1.7,
                              height: Layout.window.GapLvIII * 1.7,
                            }
                          : {
                              width: Layout.window.GapLvIII * 1.06,
                              height: Layout.window.GapLvIII * 1.06,
                              borderRadius: 15,
                            }
                      }
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      MyUtil._isNull(imgPath02)
                        ? {
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: Layout.window.GapLvIII * 1.3,
                          }
                        : {
                            justifyContent: 'flex-start',
                            width: Layout.window.GapLvIII * 1.3,
                            paddingLeft: Layout.window.GapLvXI,
                          }
                    }
                    onPress={() => {
                      _imageSelect('2');
                    }}>
                    <Image
                      source={
                        MyUtil._isNull(imgPath02)
                          ? require('../../img/add_pic.png')
                          : imgPath02
                      }
                      style={
                        MyUtil._isNull(imgPath02)
                          ? {
                              width: Layout.window.GapLvIII * 1.7,
                              height: Layout.window.GapLvIII * 1.7,
                            }
                          : {
                              width: Layout.window.GapLvIII * 1.06,
                              height: Layout.window.GapLvIII * 1.06,
                              borderRadius: 15,
                            }
                      }
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      MyUtil._isNull(imgPath03)
                        ? {
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: Layout.window.GapLvIII * 1.3,
                          }
                        : {
                            justifyContent: 'flex-start',
                            width: Layout.window.GapLvIII * 1.3,
                            paddingLeft: Layout.window.GapLvXI,
                          }
                    }
                    onPress={() => {
                      _imageSelect('3');
                    }}>
                    <Image
                      source={
                        MyUtil._isNull(imgPath03)
                          ? require('../../img/add_pic.png')
                          : imgPath03
                      }
                      style={
                        MyUtil._isNull(imgPath03)
                          ? {
                              width: Layout.window.GapLvIII * 1.7,
                              height: Layout.window.GapLvIII * 1.7,
                            }
                          : {
                              width: Layout.window.GapLvIII * 1.06,
                              height: Layout.window.GapLvIII * 1.06,
                              borderRadius: 15,
                            }
                      }
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      MyUtil._isNull(imgPath04)
                        ? {
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: Layout.window.GapLvIII * 1.3,
                          }
                        : {
                            justifyContent: 'flex-start',
                            width: Layout.window.GapLvIII * 1.3,
                            paddingLeft: Layout.window.GapLvXI,
                          }
                    }
                    onPress={() => {
                      _imageSelect('4');
                    }}>
                    <Image
                      source={
                        MyUtil._isNull(imgPath04)
                          ? require('../../img/add_pic.png')
                          : imgPath04
                      }
                      style={
                        MyUtil._isNull(imgPath04)
                          ? {
                              width: Layout.window.GapLvIII * 1.7,
                              height: Layout.window.GapLvIII * 1.7,
                            }
                          : {
                              width: Layout.window.GapLvIII * 1.06,
                              height: Layout.window.GapLvIII * 1.06,
                              borderRadius: 15,
                            }
                      }
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      MyUtil._isNull(imgPath05)
                        ? {
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: Layout.window.GapLvIII * 1.3,
                          }
                        : {
                            justifyContent: 'flex-start',
                            width: Layout.window.GapLvIII * 1.3,
                            paddingLeft: Layout.window.GapLvXI,
                          }
                    }
                    onPress={() => {
                      _imageSelect('5');
                    }}>
                    <Image
                      source={
                        MyUtil._isNull(imgPath05)
                          ? require('../../img/add_pic.png')
                          : imgPath05
                      }
                      style={
                        MyUtil._isNull(imgPath05)
                          ? {
                              width: Layout.window.GapLvIII * 1.7,
                              height: Layout.window.GapLvIII * 1.7,
                            }
                          : {
                              width: Layout.window.GapLvIII * 1.06,
                              height: Layout.window.GapLvIII * 1.06,
                              borderRadius: 15,
                            }
                      }
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      MyUtil._isNull(imgPath06)
                        ? {
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: Layout.window.GapLvIII * 1.3,
                          }
                        : {
                            justifyContent: 'flex-start',
                            width: Layout.window.GapLvIII * 1.3,
                            paddingLeft: Layout.window.GapLvXI,
                          }
                    }
                    onPress={() => {
                      _imageSelect('6');
                    }}>
                    <Image
                      source={
                        MyUtil._isNull(imgPath06)
                          ? require('../../img/add_pic.png')
                          : imgPath06
                      }
                      style={
                        MyUtil._isNull(imgPath06)
                          ? {
                              width: Layout.window.GapLvIII * 1.7,
                              height: Layout.window.GapLvIII * 1.7,
                            }
                          : {
                              width: Layout.window.GapLvIII * 1.06,
                              height: Layout.window.GapLvIII * 1.06,
                              borderRadius: 15,
                            }
                      }
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View style={{marginLeft: Layout.window.GapLvVIII}}>
                <Text allowFontScaling={false} style={styles.txtTotal}>
                  최대 6개까지 등록 가능합니다.
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: Layout.window.GapLvVI,
                }}>
                <TouchableOpacity
                  style={{
                    width: (Layout.window.width * 9.5) / 10,
                    height: (Layout.window.width * 9) / 10 / 4.7,
                  }}
                  onPress={() => {
                    ReviewWriteProcess(
                      ordertempno,
                      rxLoginInfo.u_id,
                      curStartNum,
                      contents,
                      imgPath01,
                      imgPath02,
                      imgPath03,
                      imgPath04,
                      imgPath05,
                      imgPath06,
                    );
                  }}>
                  <ImageBackground
                    source={require('../../img/btn_red.png')}
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: (Layout.window.width * 9) / 350,
                    }}>
                    <Text allowFontScaling={false} style={styles.txtLoginBtn}>
                      리뷰 등록
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
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
    //color: Colors.baseTextGray,
    fontWeight: 'bold',
  },
  orderListDate: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
    marginLeft: 7,
  },
  scrollNotiList: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
  },
  txtLoginBtn: {
    fontSize: Layout.fsM,
    color: 'white',
    fontWeight: 'bold',
  },
  txtGoodNm: {
    fontSize: Layout.fsL,
    color: 'black',
    //color: Colors.baseTextGray,
    fontWeight: 'bold',
  },
  txtOptionNm: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
  },
  txtItemPrice: {
    fontSize: Layout.fsL,
    color: Colors.shoppingRed,
    fontWeight: 'bold',
    marginTop: 5,
  },
  txtReivewWriteBox: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextGray,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  reviewContents: {
    fontSize: Layout.fsM,
    color: 'black',
    //color: Colors.baseTextMidGray,
  },
  imgReviewStar: {
    //flex: 1,
    //position: 'absolute',
    width: Layout.window.GapLvV,
    //height: Layout.window.GapLvXI*0.9,
    //resizeMode: 'cover',
    aspectRatio: 1,
  },
});

export default ReviewWrite;
