import {combineReducers} from 'redux';

interface LoginState {
  rxLoginInfo: null | User; // Replace 'User' with your user object type
}

interface User {
  // Define your user object properties here
}

interface SetUserAction {
  type: 'SET_USER';
  payload: User;
}

interface LogOutAction {
  type: 'LOG_OUT';
}

type ActionTypes = SetUserAction | LogOutAction;

const initialState: LoginState = {
  rxLoginInfo: null,
};

const rxLoginInfo = (state = initialState, action: ActionTypes): LoginState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        rxLoginInfo: action.payload,
      };
    case 'LOG_OUT':
      return {
        ...state,
        rxLoginInfo: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  rxLoginInfo,
});

export default rootReducer;
