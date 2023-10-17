import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Layout from '../constants/Layout';
import * as MyUtil from '../constants/MyUtil';

export default class ModalItemOptionPick extends React.Component {
  render() {
    const {_modalCb, isModalOpen, arrData} = this.props;

    return (
      <Modal
        testID={'modal'}
        isVisible={isModalOpen}
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
          <View
            style={{
              flexDirection: 'column',
              height: Layout.window.GapLvIV,
              width: Layout.window.width,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: Layout.fsL,
                color: 'black',
                fontWeight: 'bold',
              }}>
              선택해주세요.
            </Text>
          </View>

          <View
            style={
              arrData.length < 5
                ? {height: Layout.window.GapLvIV * 1.05 * arrData.length}
                : {height: Layout.window.GapLvIV * 1.05 * 5}
            }>
            <ScrollView
              indicatorStyle={'black'}
              style={{flex: 1, width: Layout.window.width * 0.9}}
              keyboardShouldPersistTaps="handled">
              {!MyUtil._isNull(arrData) &&
                arrData.map((item, idx) => (
                  <TouchableOpacity
                    onPress={() => {
                      _modalCb(true, {selectOption: item});
                    }}
                    key={idx}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: Layout.window.GapLvIV,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: Layout.fsL,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      {item.option_nm}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
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
