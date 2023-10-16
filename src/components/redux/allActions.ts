// ActionTypes
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

// User object type
interface User {
  // Define the structure of the user object here
  // For example:
  id: number;
  name: string;
  // Add other properties as needed
}

// Action Types
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface LogOutAction {
  type: typeof LOG_OUT;
}

type UserActionTypes = SetUserAction | LogOutAction;

// Action Creators
export const setRxLoginInfo = (userObj: User): SetUserAction => ({
  type: SET_USER,
  payload: userObj,
});

export const logOut = (): LogOutAction => ({
  type: LOG_OUT,
});

// Reducer
interface UserState {
  rxLoginInfo: User | null;
}

const initialState: UserState = {
  rxLoginInfo: null,
};

const rxLoginInfo = (
  state: UserState = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        rxLoginInfo: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        rxLoginInfo: null,
      };
    default:
      return state;
  }
};

export {rxLoginInfo};
