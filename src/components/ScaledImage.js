import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const ScaledImage = ({uri, width, height}) => {
  const [imageWidth, setImageWidth] = useState(width);
  const [imageHeight, setImageHeight] = useState(height);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {width: width1, height: height1} = await FastImage.preload([
          {uri},
        ]);

        if (width && !height) {
          setImageWidth(width);
          setImageHeight(height1 * (width / width1));
        } else if (!width && height) {
          setImageWidth(width1 * (height / height1));
          setImageHeight(height);
        } else {
          setImageWidth(width1);
          setImageHeight(height1);
        }
      } catch (error) {
        console.log('ScaledImage - Error while loading image:', error);
      }
    };

    fetchData();
  }, [uri, width, height]);

  return imageHeight ? (
    <View style={[styles.container, {width: imageWidth, height: imageHeight}]}>
      <FastImage
        style={{width: imageWidth, height: imageHeight}}
        source={{uri}}
        resizeMode={FastImage.resizeMode.cover}
        priority={FastImage.priority.high}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
});

export default ScaledImage;
