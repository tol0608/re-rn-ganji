import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Layout from '../constants/Layout';
import Config from '../constants/Config';
import MyUtil from '../constants/MyUtil';

const styles = StyleSheet.create({
  gridView: {
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
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingTop: 5,
    paddingBottom: 8,
  },
  productName: {
    fontSize: Layout.fsS,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 2,
  },
  productPrice: {
    fontSize: Layout.fsS,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 2,
  },
});

const ProductItem = ({item, navigation}) => {
  const navigateToShowItem = () => {
    navigation.navigate('ShowItem', {
      name: item.good_nm,
      goodnum: item.good_no,
      fromPage: 'MainScreen',
    });
  };

  return (
    <TouchableOpacity style={styles.gridView} onPress={navigateToShowItem}>
      <FastImage
        style={styles.imgInGridView}
        source={{
          uri: Config.TITLEIMG_URL + item.file_nm,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.textContainer}>
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={styles.productName}>
          {item.good_nm}
        </Text>
        <Text
          allowFontScaling={false}
          numberOfLines={1}
          style={styles.productPrice}>
          {MyUtil._toThousandsCommas(item.price)} 원
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
