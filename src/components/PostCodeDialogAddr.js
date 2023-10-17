import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Postcode from 'react-native-daum-postcode';
import Layout from '../constants/Layout';

export default class PostCodeDialogAddr extends React.Component {
  render() {
    const {_modalCb, _postCodeDialogToggle, isModalOpen} = this.props;

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
        }}
        onHardwareBackPress={() => {
          _postCodeDialogToggle(false, '', '');
        }}>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            paddingTop: Layout.window.GapLvII,
          }}>
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                width: Layout.window.width * 0.9,
                height: Layout.window.height,
                backgroundColor: 'white',
              }}>
              <View style={{flex: 3}}>
                <Postcode
                  style={{flex: 1}}
                  jsOptions={{animation: true}}
                  onSelected={data => {
                    _postCodeDialogToggle(false, data);
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: Layout.window.GapLvIII * 0.9,
                  backgroundColor: 'lightgrey',
                }}
                onPress={() => {
                  _modalCb(false);
                }}>
                <Text style={styles.loginBox}>닫기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  viewRow: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    justifyContent: 'center',
    margin: 0,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 35 : 5,
  },
});
