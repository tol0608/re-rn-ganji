import React from 'react';
import {StyleSheet, View, Platform, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class ModalBottomMainToLogin extends React.Component {
  render() {
    const {_modalCb, _modalCbToLogin, isModalOpen, clickedbtn} = this.props;

    return (
      <Modal
        testID={'modal'}
        isVisible={isModalOpen}
        swipeDirection={['down']}
        onSwipeComplete={({swipingDirection}) => {
          _modalCb(false, {});
        }}
        style={styles.view}
        backdropOpacity={0.3}
        onBackButtonPress={() => {
          _modalCb(false, {});
        }}
        onBackdropPress={() => {
          _modalCb(false, {});
        }}
        clickedbtn={clickedbtn}>
        <View
          style={{
            width: Layout.window.width - 40,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: Layout.window.width,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: Layout.fsL,
                color: 'black',
                marginTop: 20,
                marginBottom: 5,
                fontWeight: 'bold',
              }}>
              {clickedbtn} 회원가입후 이용가능합니다.
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: Layout.fsL,
                color: 'black',
                marginTop: 5,
                marginBottom: 20,
                fontWeight: 'bold',
              }}>
              회원가입 하시겠습니까
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                _modalCb(false, {});
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRightColor: 'lightgrey',
                borderRightWidth: 1,
                height: Layout.window.GapLvIV,
              }}>
              <Text
                allowFontScaling={false}
                style={{fontSize: Layout.fsM, color: Colors.baseTextGray}}>
                나중에
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                _modalCbToLogin(false, {});
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: Layout.window.GapLvV,
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: Layout.fsM,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                예
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    margin: 0,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 35 : 5,
  },
});
