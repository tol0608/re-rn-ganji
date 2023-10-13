import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Linking,
  Animated,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  NavigationContainer,
  CommonActions,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector, useDispatch} from 'react-redux';
import ModalBottomMainToLogin from '../../components/ModalBottomMainToLogin';
import ModalBottomSearch from '../../components/ModalBottomSearch';
import Carousel from 'react-native-snap-carousel-v4';
import Loader from '../../components/Loader';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import * as ServerApi from '../../constants/ServerApi';
import * as MyAsyncStorage from '../../constants/MyAsyncStorage';
import * as MyUtil from '../../constants/MyUtil';
import Config from '../../constants/Config';
import allActions from '../../components/redux/allActions';
import ProductList from '../MainScreens/ProductList';
import SearchResult from './SearchResult';

function MainScreen({
  od0Drag,
  od1Drag,
  od2Drag,
  od3Drag,
  od4Drag,
  od5Drag,
  od6Drag,
}) {
  const [bannerImages, setBannerImages] = useState([1, 2, 3]);

  useEffect(() => {
    async function fetchData() {}
    fetchData();
  }, []);

  const RefreshBanner = useCallback(() => {
    return od0Drag == 0 &&
      od1Drag == 0 &&
      od2Drag == 0 &&
      od3Drag == 0 &&
      od4Drag == 0 &&
      od5Drag == 0 &&
      od6Drag == 0 ? (
      <View
        style={{
          width: Layout.window.width,
          height: (Layout.window.width / 1010) * 276,
        }}>
        <Carousel
          autoplay={true}
          autoplayDelay={5000}
          autoplayInterval={5000}
          ref={c => {
            let _carousel;
            _carousel = c;
          }}
          data={bannerImages}
          renderItem={_renderItem}
          sliderWidth={Layout.window.width}
          itemWidth={Layout.window.width}
          loop={true}
        />
      </View>
    ) : (
      <View
        style={{
          width: Layout.window.width,
          height: 1,
          backgroundColor: Colors.grayLine3,
        }}
      />
    );
  }, [
    _renderItem,
    bannerImages,
    od0Drag,
    od1Drag,
    od2Drag,
    od3Drag,
    od4Drag,
    od5Drag,
    od6Drag,
  ]);

  const _renderItem = useCallback(({item, index}) => {
    if (item == 1) {
      return (
        <TouchableOpacity
          style={{
            width: Layout.window.width,
            height: (Layout.window.width / 1010) * 276,
          }}
          key={index}
          activeOpacity={1}
          onPress={() => {}}>
          <View
            style={{
              width: Layout.window.width,
              height: (Layout.window.width / 1010) * 276,
            }}>
            <Image
              style={{
                width: Layout.window.width,
                height: (Layout.window.width / 1010) * 276,
              }}
              source={require('../../img/mainbanner1.jpg')}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      );
    } else if (item == 2) {
      return (
        <TouchableOpacity
          style={{
            width: Layout.window.width,
            height: (Layout.window.width / 1010) * 276,
          }}
          key={index}
          activeOpacity={1}
          onPress={() => {}}>
          <View
            style={{
              width: Layout.window.width,
              height: (Layout.window.width / 1010) * 276,
            }}>
            <Image
              style={{
                width: Layout.window.width,
                height: (Layout.window.width / 1010) * 276,
              }}
              source={require('../../img/mainbanner2.jpg')}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      );
    } else if (item == 3) {
      return (
        <TouchableOpacity
          style={{
            width: Layout.window.width,
            height: (Layout.window.width / 1010) * 276,
          }}
          key={index}
          activeOpacity={1}
          onPress={() => {}}>
          <View
            style={{
              width: Layout.window.width,
              height: (Layout.window.width / 1010) * 276,
            }}>
            <Image
              style={{
                width: Layout.window.width,
                height: (Layout.window.width / 1010) * 276,
              }}
              source={require('../../img/mainbanner3.jpg')}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      );
    }
  }, []);
  return RefreshBanner();
}

const styles = StyleSheet.create({
  floatingActionView: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default MainScreen;
