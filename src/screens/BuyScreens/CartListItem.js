import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as MyUtil from '../../constants/MyUtil';
import Config from '../../constants/Config';

const Cart = ({item, _btnHandler, _delHandler, uid}) => {
  const [cnt, setCnt] = useState(Number(item.good_ct));

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <View style={{ width: Layout.window.width * 0.9 }}> */}
      <View
        key={item.order_temp_no}
        style={{flexDirection: 'row', marginBottom: 20}}>
        <View style={{flex: 1, marginTop: 8, justifyContent: 'flex-start'}}>
          <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <Image
              source={{uri: Config.TITLEIMG_URL + item.file_nm}}
              style={{
                width: Layout.window.GapLvII * 0.9,
                height: Layout.window.GapLvII * 0.9,
                marginTop: 10,
                marginRight: 10,
                borderRadius: 45,
              }}
              resizeMode="cover"
            />
          </View>
        </View>

        <View
          style={{
            flex: 2.1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginTop: 8,
            borderBottomColor: Colors.baseTextLightGray,
            borderBottomWidth: 1,
          }}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={styles.txtItemName}>
            {item.good_nm}
          </Text>
          <Text
            allowFontScaling={false}
            numberOfLines={3}
            style={styles.txtTotal}>
            {item.option_nm}
          </Text>
          <Text allowFontScaling={false} style={styles.txtTotal}>
            {MyUtil._toThousandsCommas(item.price * item.good_ct)} 원
          </Text>
          <View style={{flexDirection: 'row', marginTop: 8, marginBottom: 18}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  if (cnt > 1) {
                    let temp = cnt - 1;
                    setCnt(temp);
                    _btnHandler(item.order_temp_no, temp);
                  } // 부모로 전달
                }}>
                <View
                  style={{
                    backgroundColor: Colors.baseTextLightGray,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    height: Layout.window.GapLvX,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: Layout.fsM,
                      color: Colors.baseTextGray,
                      fontWeight: 'bold',
                      marginBottom: 2,
                    }}>
                    {' '}
                    －{' '}
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Layout.window.GapLvV,
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: Layout.fsM,
                    color: Colors.baseTextGray,
                    fontWeight: 'bold',
                    marginBottom: 2,
                  }}>
                  {cnt}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  let temp = cnt + 1;
                  setCnt(temp);
                  _btnHandler(item.order_temp_no, temp);
                }}>
                <View
                  style={{
                    backgroundColor: Colors.baseTextLightGray,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    height: Layout.window.GapLvX,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: Layout.fsM,
                      color: Colors.baseTextGray,
                      fontWeight: 'bold',
                      marginBottom: 2,
                    }}>
                    {' '}
                    ＋{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  _delHandler(item.order_temp_no);
                }}>
                <View
                  style={{
                    backgroundColor: Colors.shoppingRed,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    height: Layout.window.GapLvX,
                    width: Layout.window.GapLvVI,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: Layout.fsM,
                      color: 'white',
                      fontWeight: 'bold',
                      marginBottom: 1,
                    }}>
                    {' '}
                    ✕{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtItemName: {
    fontSize: Layout.fsL,
    color: 'black',
    fontWeight: 'bold',
  },
  txtTotal: {
    fontSize: Layout.fsM,
    color: 'black',
  },
});

export default Cart;
