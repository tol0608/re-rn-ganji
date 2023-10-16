import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Layout from '../constants/Layout';

interface ModalItemOptionPickProps {
  arrData: Array<any>;
  isModalOpen: boolean;
  _modalCb: (open: boolean, data: any) => void;
}

export default class ModalItemOptionPick extends Component<ModalItemOptionPickProps> {
  renderOptions() {
    const {arrData, _modalCb} = this.props;

    return arrData.map((item, idx) => (
      <TouchableOpacity
        onPress={() => {
          _modalCb(true, {selectOption: item});
        }}
        key={idx}
        style={styles.optionContainer}>
        <Text allowFontScaling={false} style={styles.optionText}>
          {item.option_nm}
        </Text>
      </TouchableOpacity>
    ));
  }

  render() {
    const {isModalOpen, _modalCb} = this.props;

    return (
      <Modal
        testID="modal"
        isVisible={isModalOpen}
        onSwipeComplete={() => _modalCb(false, {})}
        style={styles.modal}
        backdropOpacity={0.3}
        onBackButtonPress={() => _modalCb(false, {})}
        onBackdropPress={() => _modalCb(false, {})}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text allowFontScaling={false} style={styles.headerText}>
              선택해주세요.
            </Text>
          </View>
          <ScrollView indicatorStyle="black" style={styles.scrollView}>
            {this.renderOptions()}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 35 : 5,
  },
  container: {
    width: Layout.window.width - 40,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'column',
    height: Layout.window.GapLvIV,
    width: Layout.window.width,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  headerText: {
    fontSize: Layout.fsL,
    color: 'black',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    width: Layout.window.width * 0.9,
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Layout.window.GapLvIV,
  },
  optionText: {
    fontSize: Layout.fsL,
    color: 'black',
    fontWeight: 'bold',
  },
});
