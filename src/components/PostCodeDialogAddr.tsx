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

interface PostCodeDialogAddrProps {
  _modalCb: (open: boolean, data?: any) => void;
  _postCodeDialogToggle: (open: boolean, data?: any) => void;
  isModalOpen: boolean;
}

export default class PostCodeDialogAddr extends React.Component<PostCodeDialogAddrProps> {
  render() {
    const {_modalCb, _postCodeDialogToggle, isModalOpen} = this.props;

    return (
      <Modal
        testID={'modal'}
        isVisible={isModalOpen}
        // swipeDirection={['down']}
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
        <View style={styles.container}>
          <ScrollView style={styles.container}>
            <View style={styles.modalContent}>
              <View style={styles.postcodeContainer}>
                <Postcode
                  style={styles.postcode}
                  jsOptions={{animation: true}}
                  onSelected={data => {
                    _postCodeDialogToggle(false, data);
                  }}
                  onError={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  _modalCb(false);
                }}>
                <Text style={styles.closeButtonText}>닫기</Text>
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
  },
  modalContent: {
    flex: 1,
    flexDirection: 'column',
    width: Layout.window.width * 0.9,
    height: Layout.window.width * 1,
    backgroundColor: 'white',
  },
  postcodeContainer: {
    flex: 3,
  },
  postcode: {
    flex: 1,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.window.GapLvIII * 0.9,
    backgroundColor: 'lightgrey',
  },
  closeButtonText: {
    fontSize: Layout.fsL,
    fontWeight: 'bold',
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
