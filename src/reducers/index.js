import { combineReducers } from 'redux';
import auth from './auth';
import navigation from '../components/navigation/reducer';

const rootReducer = combineReducers({
  auth,
  navigation,
});

export default rootReducer;
