import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

interface ScaledImageProps {
  uri: string; // 이미지 URI
  width?: number; // 원하는 가로 크기 (선택 사항)
  height?: number; // 원하는 세로 크기 (선택 사항)
}

const ScaledImage: React.FC<ScaledImageProps> = ({uri, width, height}) => {
  const [imageWidth, setImageWidth] = useState<number | undefined>(undefined);
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      Image.getSize(
        uri,
        (width1, height1) => {
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
        },
        error => {
          console.log('ScaledImage - Image.getSize failed with error: ', error);
          setImageWidth(width);
          setImageHeight(height);
        },
      );
    }
    fetchData();
  }, [uri, width, height]);

  return imageHeight ? (
    <View
      style={{
        height: imageHeight,
        width: imageWidth,
        borderRadius: 5,
        backgroundColor: 'lightgray',
      }}>
      <FastImage
        style={{height: imageHeight, width: imageWidth}}
        source={{
          uri: uri,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  ) : null;
};

export default ScaledImage;
