import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';

export default props => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    async function fetchData() {
      Image.getSize(
        props.uri,
        (width1, height1) => {
          if (props.width && !props.height) {
            setWidth(props.width);
            setHeight(height1 * (props.width / width1));
          } else if (!props.width && props.height) {
            setWidth(width1 * (props.height / height1));
            setHeight(props.height);
          } else {
            setWidth(width1);
            setHeight(height1);
          }

          return () => {};
        },
        error => {
          // console.log("ScaledImage,Image.getSize failed with error: ", error)
          setWidth(props.width);
          setHeight(props.width);

          return () => {};
        },
      );
    }
    fetchData();
  }, [props.height, props.uri, props.width]);

  return height ? (
    <View
      style={{
        height: height,
        width: width,
        borderRadius: 5,
        backgroundColor: 'lightgray',
      }}>
      <FastImage
        style={{height: height, width: width}}
        source={{
          uri: props.uri,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  ) : (
    <></>
  );
};
