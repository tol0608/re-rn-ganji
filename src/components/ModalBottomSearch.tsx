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

interface ModalBottomSearchProps {
  isSearchModalOpen: boolean;
  _modalCbSearch: (open: boolean, data?: any) => void;
  _SearchResultChoose: (name: string, id: string) => void;
  _ShowSearchResult: (searchText: string) => void;
  searchResult: any[]; // Modify the type as per your data structure
  _searchTxt: string;
  _setSearchTxt: (text: string) => void;
}

export default class ModalBottomSearch extends React.Component<ModalBottomSearchProps> {
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
                value={_searchTxt}
              />
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: (Layout.window.width * 1) / 9,
                  height: (Layout.window.width * 1) / 9,
                }}
                onPress={() => {
                  _ShowSearchResult(_searchTxt);
                }}>
                <Image
                  source={require('../img/Search.png')}
                  style={{
                    width: (Layout.window.width * 1) / 16,
                    height: (Layout.window.width * 1) / 16,
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
});
