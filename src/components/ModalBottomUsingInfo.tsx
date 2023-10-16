import React from 'react';
import {StyleSheet, View, Platform, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import Layout from '../constants/Layout';

interface ModalBottomUsingInfoProps {
  isModalOpen: boolean;
  _modalCb: (open: boolean, data?: any) => void;
  usingInfoData: string;
}

export default class ModalBottomUsingInfo extends React.Component<ModalBottomUsingInfoProps> {
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
            height: Layout.window.width * 1,
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
            style={{flex: 1, width: Layout.window.width * 0.9}}>
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
});
