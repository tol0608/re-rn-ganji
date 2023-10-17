import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyUtil from '../../constants/MyUtil';

function Intro({navigation}) {
  useEffect(() => {
    const fetchData = async () => {

      setTimeout(() => {
        navigation.replace('MainScreen');
      }, 1000);
    };
    fetchData();
  }, [navigation]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.shoppingBg,
  },
  logo: {
    width: Layout.window.GapLvII * 1.3,
  },
});

export default Intro;
