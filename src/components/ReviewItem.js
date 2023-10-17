import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Config from '../constants/Config';
import * as MyUtil from '../constants/MyUtil';

const styles = StyleSheet.create({
  txtShowItem: {
    fontSize: Layout.fsM,
    color: Colors.baseTextGray,
  },
  txtShowOption: {
    fontSize: Layout.fsM,
    color: Colors.baseTextGray,
    textAlign: 'left',
  },
  txtTotalPrice: {
    textAlign: 'right',
    fontSize: Layout.fsXXXL,
    color: Colors.baseTextGray,
    fontWeight: 'bold',
  },
  txtItemPrice: {
    fontSize: Layout.fsL,
    color: Colors.shoppingRed,
    fontWeight: 'bold',
    marginTop: 5,
  },
  txtShowItemBtn: {
    fontSize: Layout.fsM,
    color: Colors.baseTextGray,
    fontWeight: 'bold',
  },
  txtShowItemReviewBtn: {
    fontSize: Layout.fsS,
    color: Colors.shoppingRed,
    marginBottom: 2,
  },
  imgProductTop: {
    width: Layout.window.width,
    height: undefined,
    aspectRatio: 1,
  },
  imgProductMid: {
    width: Layout.window.width,
    height: undefined,
    aspectRatio: 1,
  },
  imgReviewStar: {
    width: Layout.window.GapLvXI * 0.9,
    aspectRatio: 1,
  },
  notiTitle: {
    fontSize: Layout.fsL,
    color: 'black',
    fontWeight: 'bold',
  },
  notiDate: {
    fontSize: Layout.fsM,
    color: 'black',
  },
  imgBuy: {
    width: Layout.window.GapLvI * 1.05,
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
    marginRight: 3,
  },
  imgCart: {
    width: Layout.window.GapLvI * 1.05,
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
    marginLeft: 3,
  },
  reviewTitle: {
    fontSize: Layout.fsL,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  reviewContents: {
    fontSize: Layout.fsL,
    color: 'black',
  },
});

export default ({item, navigation}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: MyUtil._isNull(item.mng_reply) ? 105 : 175,
    }}>
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        width: Layout.window.width * 0.9,
      }}
      onPress={() => {
        navigation.navigate('ReviewDetail', {
          name: '구매 후기 상세',
          review_no: item.review_no,
        });
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: Layout.window.GapLvIII * 0.9,
          marginBottom: 25,
        }}>
        <View
          style={{
            flex: 2.5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image
            source={{uri: Config.TITLEIMG_URL + item.file_nm}}
            style={{
              width: Layout.window.GapLvIII,
              height: Layout.window.GapLvIII,
              borderRadius: Layout.window.GapLvIII / 2,
            }}
            resizeMode="cover"
          />
        </View>

        <View style={{flex: 7.5, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={
                    Number(item.star_point) > 0
                      ? require('../img/star_on.png')
                      : require('../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
                <Image
                  source={
                    Number(item.star_point) > 1
                      ? require('../img/star_on.png')
                      : require('../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
                <Image
                  source={
                    Number(item.star_point) > 2
                      ? require('../img/star_on.png')
                      : require('../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
                <Image
                  source={
                    Number(item.star_point) > 3
                      ? require('../img/star_on.png')
                      : require('../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
                <Image
                  source={
                    Number(item.star_point) > 4
                      ? require('../img/star_on.png')
                      : require('../img/star_off.png')
                  }
                  style={styles.imgReviewStar}
                  resizeMode="cover"
                />
              </View>

              <View style={{}}>
                <Text allowFontScaling={false} style={styles.notiTitle}>
                  {item.name.substring(0, 1) +
                    '*' +
                    item.name.substring(item.name.length - 1, item.name.length)}
                </Text>
              </View>
            </View>

            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text allowFontScaling={false} style={styles.notiDate}>
                {item.reg_date}
              </Text>
            </View>
          </View>

          <Text
            allowFontScaling={false}
            numberOfLines={2}
            style={styles.reviewContents}>
            {item.contents}
          </Text>
        </View>
      </View>

      {!MyUtil._isNull(item.mng_reply) ? (
        <View
          style={{
            flex: 5,
            flexDirection: 'column',
            alignItems: 'center',
            height: 17,
            width: Layout.window.width * 0.9,
          }}>
          <View
            style={{
              alignContent: 'center',
              width: Layout.window.width * 0.9,
              borderRadius: 20,
              padding: 10,
              backgroundColor: 'white',
            }}>
            <View>
              <Text allowFontScaling={false} style={styles.reviewTitle}>
                {' '}
                럭스몰
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={styles.reviewContents}>
              {item.mng_reply}
            </Text>
          </View>
        </View>
      ) : (
        <View />
      )}

      <View
        style={{
          backgroundColor: Colors.grayLine3,
          height: 1.5,
          width: Layout.window.width * 0.95,
        }}
      />
    </TouchableOpacity>
  </View>
);
