import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Config from '../constants/Config';
import * as MyUtil from '../constants/MyUtil';

interface ReviewItemProps {
  item: {
    review_no: string;
    star_point: number;
    name: string;
    reg_date: string;
    contents: string;
    mng_reply: string;
    file_nm: string;
  };
  navigation: any;
}

const styles = StyleSheet.create({
  // 스타일 정의부분은 그대로 유지
  // ...

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
  // 나머지 스타일 정의도 그대로 유지
});

const ReviewItem: React.FC<ReviewItemProps> = ({item, navigation}) => {
  return (
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
                  {[1, 2, 3, 4, 5].map(index => (
                    <Image
                      key={index}
                      source={
                        item.star_point > index - 1
                          ? require('../img/star_on.png')
                          : require('../img/star_off.png')
                      }
                      style={styles.imgReviewStar}
                      resizeMode="cover"
                    />
                  ))}
                </View>
                <View>
                  <Text allowFontScaling={false} style={styles.notiTitle}>
                    {item.name.substring(0, 1) +
                      '*' +
                      item.name.substring(
                        item.name.length - 1,
                        item.name.length,
                      )}
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
};

export default ReviewItem;
