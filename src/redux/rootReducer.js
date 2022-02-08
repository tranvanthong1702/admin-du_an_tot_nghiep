import { combineReducers } from 'redux';

import authReducer from './reducers/auth';

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  // if (action.type === 'LOGOUT') {
  //   return appReducer(undefined, action);
  // }
  return appReducer(state, action);
};

export default rootReducer;
