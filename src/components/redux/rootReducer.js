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
var redux_1 = require('redux');

var initialState = {
  rxLoginInfo: null,
};

var rxLoginInfo = function (state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case 'SET_USER':
      return __assign({}, state, {rxLoginInfo: action.payload});
    case 'LOG_OUT':
      return __assign({}, state, {rxLoginInfo: null});
    default:
      return state;
  }
};

var rootReducer = (0, redux_1.combineReducers)({
  rxLoginInfo: rxLoginInfo,
});

exports.default = rootReducer;
