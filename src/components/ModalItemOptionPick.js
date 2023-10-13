import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {window, fsL} from '../constants/Layout';

const OptionItem = ({item, onPress}) => (
  <TouchableOpacity
    onPress={() => onPress(item)}
    style={styles.optionContainer}>
    <Text allowFontScaling={false} style={styles.optionText}>
      {item.option_nm}
    </Text>
  </TouchableOpacity>
);

const ModalItemOptionPick = ({isModalOpen, _modalCb, arrData}) => {
  const closeModal = () => {
    _modalCb(false, {});
  };

  const renderOptions = () => {
    return arrData.map((item, idx) => (
      <OptionItem
        key={idx}
        item={item}
        onPress={selectedOption =>
          _modalCb(true, {selectOption: selectedOption})
        }
      />
    ));
  };

  return (
    <Modal
      testID="modal"
      isVisible={isModalOpen}
      onSwipeComplete={closeModal}
      style={styles.modal}
      backdropOpacity={0.3}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.headerText}>
            선택해주세요.
          </Text>
        </View>
        <ScrollView indicatorStyle="black" style={styles.scrollView}>
          {renderOptions()}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
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
    // height: window.GapLvIV,
    // width: window.width,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  headerText: {
    fontSize: fsL,
    color: 'black',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    // width: window.width * 0.9,
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: window.GapLvIV,
  },
  optionText: {
    fontSize: fsL,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ModalItemOptionPick;
