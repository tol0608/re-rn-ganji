import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoadingScreen: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator color="#0000ff" />
  </View>
);

export default LoadingScreen;
