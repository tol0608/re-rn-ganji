'use strict';
exports.__esModule = true;
var react_1 = require('react');
var react_native_1 = require('react-native');
var Colors_1 = require('../constants/Colors');
var Layout_1 = require('../constants/Layout');
var Config_1 = require('../constants/Config');
var MyUtil = require('../constants/MyUtil');
var styles = react_native_1.StyleSheet.create({
  // 스타일 정의부분은 그대로 유지
  // ...
  imgReviewStar: {
    width: Layout_1.default.window.GapLvXI * 0.9,
    aspectRatio: 1,
  },
  notiTitle: {
    fontSize: Layout_1.default.fsL,
    color: 'black',
    fontWeight: 'bold',
  },
  notiDate: {
    fontSize: Layout_1.default.fsM,
    color: 'black',
  },
  reviewTitle: {
    fontSize: Layout_1.default.fsL,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  reviewContents: {
    fontSize: Layout_1.default.fsL,
    color: 'black',
  },
});
var ReviewItem = function (_a) {
  var item = _a.item,
    navigation = _a.navigation;
  return (
    <react_native_1.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: MyUtil._isNull(item.mng_reply) ? 105 : 175,
      }}>
      <react_native_1.TouchableOpacity
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 10,
          width: Layout_1.default.window.width * 0.9,
        }}
        onPress={function () {
          navigation.navigate('ReviewDetail', {
            name: '구매 후기 상세',
            review_no: item.review_no,
          });
        }}>
        <react_native_1.View
          style={{
            flexDirection: 'row',
            height: Layout_1.default.window.GapLvIII * 0.9,
            marginBottom: 25,
          }}>
          <react_native_1.View
            style={{
              flex: 2.5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <react_native_1.Image
              source={{uri: Config_1.default.TITLEIMG_URL + item.file_nm}}
              style={{
                width: Layout_1.default.window.GapLvIII,
                height: Layout_1.default.window.GapLvIII,
                borderRadius: Layout_1.default.window.GapLvIII / 2,
              }}
              resizeMode="cover"
            />
          </react_native_1.View>

          <react_native_1.View style={{flex: 7.5, flexDirection: 'column'}}>
            <react_native_1.View style={{flexDirection: 'row'}}>
              <react_native_1.View style={{flex: 1, flexDirection: 'column'}}>
                <react_native_1.View style={{flexDirection: 'row'}}>
                  {[1, 2, 3, 4, 5].map(function (index) {
                    return (
                      <react_native_1.Image
                        key={index}
                        source={
                          item.star_point > index - 1
                            ? require('../img/star_on.png')
                            : require('../img/star_off.png')
                        }
                        style={styles.imgReviewStar}
                        resizeMode="cover"
                      />
                    );
                  })}
                </react_native_1.View>
                <react_native_1.View>
                  <react_native_1.Text
                    allowFontScaling={false}
                    style={styles.notiTitle}>
                    {item.name.substring(0, 1) +
                      '*' +
                      item.name.substring(
                        item.name.length - 1,
                        item.name.length,
                      )}
                  </react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>

              <react_native_1.View style={{flex: 1, alignItems: 'flex-end'}}>
                <react_native_1.Text
                  allowFontScaling={false}
                  style={styles.notiDate}>
                  {item.reg_date}
                </react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>

            <react_native_1.Text
              allowFontScaling={false}
              numberOfLines={2}
              style={styles.reviewContents}>
              {item.contents}
            </react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>

        {!MyUtil._isNull(item.mng_reply) ? (
          <react_native_1.View
            style={{
              flex: 5,
              flexDirection: 'column',
              alignItems: 'center',
              height: 17,
              width: Layout_1.default.window.width * 0.9,
            }}>
            <react_native_1.View
              style={{
                alignContent: 'center',
                width: Layout_1.default.window.width * 0.9,
                borderRadius: 20,
                padding: 10,
                backgroundColor: 'white',
              }}>
              <react_native_1.View>
                <react_native_1.Text
                  allowFontScaling={false}
                  style={styles.reviewTitle}>
                  {' '}
                  럭스몰
                </react_native_1.Text>
              </react_native_1.View>
              <react_native_1.Text
                allowFontScaling={false}
                numberOfLines={1}
                style={styles.reviewContents}>
                {item.mng_reply}
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
        ) : (
          <react_native_1.View />
        )}

        <react_native_1.View
          style={{
            backgroundColor: Colors_1.default.grayLine3,
            height: 1.5,
            width: Layout_1.default.window.width * 0.95,
          }}
        />
      </react_native_1.TouchableOpacity>
    </react_native_1.View>
  );
};
exports.default = ReviewItem;
