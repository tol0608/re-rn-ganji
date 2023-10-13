import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import DaumPostcode from 'react-native-daum-postcode';
import {window, fsL} from '../constants/Layout';

const PostCodeDialogAddr = ({_modalCb, _postCodeDialogToggle, isModalOpen}) => {
  const closeModal = () => {
    _modalCb(false);
  };

  const handlePostcodeSelected = data => {
    _postCodeDialogToggle(false, data);
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={isModalOpen}
      onSwipeComplete={closeModal}
      style={styles.view}
      backdropOpacity={0.3}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <ScrollView style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.postcodeContainer}>
            <DaumPostcode
              style={styles.postcode}
              jsOptions={{animation: true}}
              onSelected={handlePostcodeSelected}
              onError={handlePostcodeError}
            />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const handlePostcodeError = () => {
  // Handle postcode error here if needed
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    flexDirection: 'column',
    // width: window.width * 0.9,
    // height: window.width * 1,
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
    // height: window.GapLvIII * 0.9,
    backgroundColor: 'lightgrey',
  },
  closeButtonText: {
    fontSize: fsL,
    fontWeight: 'bold',
  },
  view: {
    justifyContent: 'center',
    margin: 0,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 35 : 5,
  },
});

export default PostCodeDialogAddr;
