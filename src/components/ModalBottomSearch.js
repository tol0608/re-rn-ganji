import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {window, fsM, defaultText} from '../constants/Layout';

const ModalBottomSearch = ({
  isSearchModalOpen,
  _modalCbSearch,
  _ShowSearchResult,
}) => {
  const [searchTxt, setSearchTxt] = useState('');

  const closeModal = () => {
    _modalCbSearch(false, {});
  };

  const search = () => {
    _ShowSearchResult(searchTxt);
  };

  return (
    <Modal
      isVisible={isSearchModalOpen}
      style={styles.view}
      backdropOpacity={0.3}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.txtSearchInput}
              autoCapitalize="none"
              placeholder="검색어를 입력해주세요"
              onChangeText={text => setSearchTxt(text)}
              value={searchTxt}
            />
            <TouchableOpacity style={styles.searchButton} onPress={search}>
              <Image
                source={require('../img/Search.png')}
                style={styles.searchIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-start',
    paddingBottom: 40,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 35 : 5,
  },
  container: {
    marginTop: 100,
    // width: window.width * 0.9,
    // height: window.width * 0.25,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  header: {
    // width: window.width * 0.8,
    alignItems: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    // width: window.width * 0.8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginLeft: 16,
    marginBottom: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  txtSearchInput: {
    fontSize: fsM,
    color: defaultText,
    // width: window.width * 0.7,
    fontWeight: 'bold',
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: window.width / 9,
    // height: window.width / 9,
  },
  searchIcon: {
    // width: window.width / 16,
    // height: window.width / 16,
  },
});

export default ModalBottomSearch;
