import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import Layout from '../constants/Layout';

const ModalBottomUsingInfo = ({isModalOpen, _modalCb, usingInfoData}) => {
  const closeModal = () => {
    _modalCb(false, {});
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={isModalOpen}
      style={styles.modal}
      backdropOpacity={0.3}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>
            이용안내
          </Text>
        </View>
        <ScrollView indicatorStyle="black" style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Text allowFontScaling={false} style={styles.contentText}>
              {usingInfoData}
            </Text>
          </View>
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
    marginBottom: Layout.window.OS === 'ios' ? 35 : 5,
  },
  container: {
    marginTop: 100,
    width: Layout.window.width * 0.9,
    height: Layout.window.width * 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'column',
    width: Layout.window.width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginLeft: 16,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: Layout.fsL,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    width: Layout.window.width * 0.9,
  },
  contentContainer: {
    flex: 1,
    width: '90%',
    padding: 20,
  },
  contentText: {
    width: '90%',
    fontSize: Layout.fsM,
  },
});

export default ModalBottomUsingInfo;
