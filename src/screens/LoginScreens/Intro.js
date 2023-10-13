import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyUtil from '../../constants/MyUtil';

function Intro({ navigation }) {
  useEffect(() => {
    const fetchData = async () => {
      // You can uncomment and use the following code if needed.
      // const oderingResults = await ServerApi.m_appgoods('g1', '1');
      // if (oderingResults) {
      //   const tabOrder = JSON.stringify(oderingResults.DATA_RESULT.menu).split(',');
      //   const [odering1, odering2, odering3, odering4, odering5, odering6] = tabOrder;
      //   // setLoading(false);
      // }

      setTimeout(() => {
        navigation.replace('MainScreen');
      }, 1000);
    };
    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* You can add your logo image here */}
      {/* <Image
        source={require('../../img/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      /> */}
    </View>
  );
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
    // If you want to absolutely position the logo, you can use "position: 'absolute'" and specify the top and left properties.
    // position: 'absolute',
    // top: 10,
    // left: 10,
  },
});

export default Intro;
