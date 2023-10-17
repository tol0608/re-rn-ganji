import React from 'react';
import {StyleSheet, View, Platform, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class ModalBottomUsingInfo extends React.Component {
  render() {
    const {isModalOpen, _modalCb, usingInfoData} = this.props;

    return (
      <Modal
        testID={'modal'}
        isVisible={isModalOpen}
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
            marginTop: 100,
            width: Layout.window.width * 0.9,
            height: Layout.window.height,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            overflow: 'hidden',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: Layout.window.width * 0.8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
              marginLeft: 16,
              paddingBottom: 10,
            }}>
            <Text
              allowFontScaling={false}
              style={{fontSize: Layout.fsL, fontWeight: 'bold'}}>
              이용안내
            </Text>
          </View>

          <ScrollView
            indicatorStyle={'black'}
            style={{flex: 1, width: Layout.window.width * 0.9}}
            keyboardShouldPersistTaps="handled">
            <View style={{flex: 1, width: '90%', padding: 20}}>
              <Text
                allowFontScaling={false}
                style={{width: '90%', fontSize: Layout.fsM}}>
                {usingInfoData}
              </Text>
            </View>
          </ScrollView>
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
  txtSearchInput: {
    fontSize: Layout.fsM,
    color: Colors.defaultText,
    width: Layout.window.width * 0.7,
    fontWeight: 'bold',
  },
  txtSearchGNM: {
    fontSize: Layout.fsL,
    color: Colors.defaultText,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  txtSearchPrice: {
    fontSize: Layout.fsM,
    color: 'black',
    fontWeight: 'bold',
  },
  imgSearch: {
    width: Layout.window.GapLvII * 0.8,
    height: Layout.window.GapLvII * 0.8,
    aspectRatio: 1,
  },
});
