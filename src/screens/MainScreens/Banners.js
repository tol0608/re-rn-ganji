import React, {useState, useCallback, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel-v4';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

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

export default MainScreen;
