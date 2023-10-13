'use strict';
exports.__esModule = true;
var react_1 = require('react');
var react_native_1 = require('react-native');
var styles = react_native_1.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
var LoadingScreen = function () {
  return (
    <react_native_1.View style={styles.container}>
      <react_native_1.ActivityIndicator color="#0000ff" />
    </react_native_1.View>
  );
};
exports.default = LoadingScreen;
