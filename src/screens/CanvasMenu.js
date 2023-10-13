import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Loader from '../components/Loader';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from "../components/redux/reducer";

const CanvasMenu = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Canvas', {topTitle: '사진 꾸미기'});
            }}
            style={{
              marginTop: 50,
              width: Layout.window.width - 60,
              height: 40,
              backgroundColor: '#ff00ff',
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginBox: {
    width: 220,
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tiEmailBox: {
    width: 250,
    height: 48,
    backgroundColor: Colors.inputtextBg,
    color: Colors.defaultText,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: Colors.inputtextEmail,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  txtNewAc: {
    fontSize: Layout.fsM,
    marginTop: 40,
    color: Colors.baseTextGray,
    textDecorationLine: 'underline',
  },
});

// // redux 연결 부분
// function mapStateToProps(state) {
//     const { rxLoginInfo } = state;
//     return {
//         rxLoginInfo,
//     };
// }

// // redux 정보 저장 부분
// function mapDispatchToProps(dispatch) {
//     return {
//         setRxLoginInfo: bindActionCreators(actionCreators.setRxLoginInfo, dispatch),
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default CanvasMenu;
