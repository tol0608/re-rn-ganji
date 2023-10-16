import React, {Component, ReactElement} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

interface ModalBottomLoginProps {
  _modalCb: (open: boolean, data?: any) => void;
  isModalOpen: boolean;
  _setemail: (email: string) => void;
  sendingemail: string;
  _sendPwd: (email: string) => void;
}

export default class ModalBottomLogin extends Component<ModalBottomLoginProps> {
  render(): ReactElement {
    const {_modalCb, isModalOpen, _setemail, sendingemail, _sendPwd} =
      this.props;

    return (
      <Modal
        testID={'modal'}
        isVisible={isModalOpen}
        swipeDirection={['down']}
        onSwipeComplete={() => {
          _modalCb(false, {});
        }}
        style={styles.view}
        backdropOpacity={0.3}
        onBackButtonPress={() => {
          _modalCb(false, {});
        }}
        onBackdropPress={() => {
          _modalCb(false, {});
        }}>
        <View
          style={{
            width: Layout.window.width - 40,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <View style={{width: Layout.window.width, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: Layout.fsM,
                color: Colors.baseTextGray,
                marginTop: 15,
                marginBottom: 20,
              }}>
              가입하신 이메일을 입력해주세요
            </Text>
            <TextInput
              autoCapitalize="none"
              style={{
                width: Layout.window.GapLvI * 1.4,
                borderRadius: 5,
                backgroundColor: Colors.shoppingBg,
              }}
              onChangeText={text => _setemail(text)}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 15}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  _modalCb(false, {});
                }}
                style={{}}>
                <Text
                  style={{fontSize: Layout.fsM, color: Colors.baseTextGray}}>
                  {' '}
                  취소{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  _sendPwd(sendingemail);
                }}
                style={{}}>
                <Text style={{fontSize: Layout.fsM, color: 'blue'}}>
                  {' '}
                  확인{' '}
                </Text>
              </TouchableOpacity>
            </View>
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
