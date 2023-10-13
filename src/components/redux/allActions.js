'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) {
              t[p] = s[p];
            }
          }
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
exports.rxLoginInfo = exports.logOut = exports.setRxLoginInfo = void 0;
// ActionTypes
var SET_USER = 'SET_USER';
var LOG_OUT = 'LOG_OUT';
// Action Creators
var setRxLoginInfo = function (userObj) {
  return {
    type: SET_USER,
    payload: userObj,
  };
};
exports.setRxLoginInfo = setRxLoginInfo;
var logOut = function () {
  return {
    type: LOG_OUT,
  };
};
exports.logOut = logOut;
// Reducer
var initialState = {
  rxLoginInfo: null,
};
var rxLoginInfo = function (state, action) {
  if (state === void 0) {
    state = initialState;
  }
  switch (action.type) {
    case SET_USER:
      return __assign(__assign({}, state), {rxLoginInfo: action.payload});
    case LOG_OUT:
      return __assign(__assign({}, state), {rxLoginInfo: null});
    default:
      return state;
  }
};
exports.rxLoginInfo = rxLoginInfo;
