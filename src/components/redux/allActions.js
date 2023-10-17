const setRxLoginInfo = userObj => {
  return {
    type: 'SET_USER',
    payload: userObj,
  };
};

const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};

const allActions = {
  setRxLoginInfo,
  logOut,
};

export default allActions;
