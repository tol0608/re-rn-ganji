import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Layout from '../constants/Layout';
import Config from '../constants/Config';
import * as MyUtil from '../constants/MyUtil';
import FastImage from 'react-native-fast-image';

interface ProductItemProps {
  item: {
    good_no: string;
    good_nm: string;
    price: number;
    file_nm: string;
  };
  navigation: any;
}

const styles = StyleSheet.create({
  GridView: {
    width: Layout.window.GapLvI2 * 0.9,
    margin: Layout.window.GapLvI2 * 0.048,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  imgInGridView: {
    width: Layout.window.GapLvI2 * 0.9,
    height: Layout.window.GapLvI2 * 0.9,
    resizeMode: 'contain',
  },
  txtProductName: {
    fontSize: Layout.fsS,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 2,
  },
  txtProductPrice: {
    fontSize: Layout.fsS,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 2,
  },
});

const ProductItem: React.FC<ProductItemProps> = ({item, navigation}) => (
  <TouchableOpacity
    style={styles.GridView}
    onPress={() => {
      navigation.navigate('ShowItem', {
        name: item.good_nm,
        goodnum: item.good_no,
        fromPage: 'MainScreen',
      });
    }}>
    <FastImage
      style={styles.imgInGridView}
      source={{
        uri: Config.TITLEIMG_URL + item.file_nm,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />

    <View
      style={{
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 8,
      }}>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={styles.txtProductName}>
        {item.good_nm}
      </Text>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={styles.txtProductPrice}>
        {MyUtil._toThousandsCommas(item.price)} 원
      </Text>
    </View>
  </TouchableOpacity>
);

export default ProductItem;
