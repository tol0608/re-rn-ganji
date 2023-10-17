import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default class ModalBottomSearch extends React.Component {
  render() {
    const {
      isSearchModalOpen,
      _modalCbSearch,
      _ShowSearchResult,
      _searchTxt,
      _setSearchTxt,
    } = this.props;

    return (
      <Modal
        testID={'modal'}
        isVisible={isSearchModalOpen}
        style={styles.view}
        backdropOpacity={0.3}
        onBackButtonPress={() => {
          _modalCbSearch(false, {});
        }}
        onBackdropPress={() => {
          _modalCbSearch(false, {});
        }}>
        <View
          style={{
            marginTop: 100,
            width: Layout.window.width * 0.9,
            height: Layout.window.width * 0.25,
            borderRadius: 10,
            backgroundColor: '#ffffff',
            overflow: 'hidden',
          }}>
          <View
            style={{
              width: Layout.window.width * 0.8,
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: Layout.window.width * 0.8,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 20,
                marginLeft: 16,
                marginBottom: 10,
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}>
              <TextInput
                allowFontScaling={false}
                style={styles.txtSearchInput}
                autoCapitalize="none"
                placeholder={'검색어를 입력해주세요'}
                onChangeText={text => _setSearchTxt(text)}
              />
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Layout.window.width / 9,
                  height: Layout.window.width / 9,
                }}
                onPress={() => {
                  _ShowSearchResult(_searchTxt);
                }}>
                <Image
                  source={require('../img/Search.png')}
                  style={{
                    width: Layout.window.width / 16,
                    height: Layout.window.width / 16,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-start',
    paddingBottom: 40,
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
    color: Colors.baseTextGray,
    fontWeight: 'bold',
  },
  imgSearch: {
    width: Layout.window.GapLvII * 0.8,
    height: Layout.window.GapLvII * 0.8,
    aspectRatio: 1,
  },
});
