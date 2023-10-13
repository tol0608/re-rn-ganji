import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Layout from '../constants/Layout';

const ModalBottomAlertDetail = ({
  isModalOpen,
  _modalCb,
  alertTittle,
  alertDt,
}) => {
  return (
    <Modal
      testID="modal"
      isVisible={isModalOpen}
      style={styles.view}
      backdropOpacity={0.3}
      onBackButtonPress={() => {
        _modalCb(false, {});
      }}
      onBackdropPress={() => {
        _modalCb(false, {});
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{alertTittle}</Text>
          <Text style={styles.dateText}>{alertDate}</Text>
        </View>

        <ScrollView
          indicatorStyle="black"
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <Text style={styles.contentText}>{alertDt}</Text>
          </View>
        </ScrollView>
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
    width: Layout.window.width * 0.8,
    height: Layout.window.width * 0.7,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'column',
    width: Layout.window.width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: Layout.fsXL,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: Layout.fsM,
  },
  scrollView: {
    flex: 1,
    width: Layout.window.width * 0.8,
  },
  content: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  contentText: {
    width: '100%',
    fontSize: Layout.fsL,
  },
});

export default ModalBottomAlertDetail;
