import { combineReducers } from 'redux';
import auth from './auth';
import navigation from '../components/navigation/reducer';
import notification from '../components/notification/reducer';

const rootReducer = combineReducers({
  auth,
  navigation,
  notification,
});

export default rootReducer;
