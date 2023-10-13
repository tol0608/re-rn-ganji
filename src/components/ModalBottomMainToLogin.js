import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {window, fsL} from '../constants/Layout';

const ModalBottomMainToLogin = ({
  isModalOpen,
  _modalCb,
  _modalCbToLogin,
  clickedbtn,
}) => {
  const closeModal = () => {
    _modalCb(false, {});
  };

  const goToLogin = () => {
    _modalCbToLogin(false, {});
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={isModalOpen}
      swipeDirection={['down']}
      onSwipeComplete={closeModal}
      style={styles.view}
      backdropOpacity={0.3}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.headerText}>
            {clickedbtn} 회원가입 후 이용 가능합니다.
          </Text>
          <Text allowFontScaling={false} style={styles.headerText}>
            회원가입 하시겠습니까
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.button}>
            <Text allowFontScaling={false} style={styles.buttonText}>
              나중에
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToLogin} style={styles.button}>
            <Text allowFontScaling={false} style={styles.buttonText}>
              예
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    margin: 0,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 35 : 5,
  },
  container: {
    // width: window.width - 40,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'column',
    // width: window.width,
    alignItems: 'center',
  },
  headerText: {
    fontSize: fsL,
    color: 'black',
    marginTop: 5,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'lightgrey',
    borderRightWidth: 1,
    // height: window.GapLvIV,
  },
  buttonText: {
    fontSize: fsL,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ModalBottomMainToLogin;
