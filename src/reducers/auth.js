import { i } from '../utils/log';
import { AUTH_LOGOUT } from '../constants/ActionTypes';

const initialState = {
  user: '',
  roles: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGOUT:
      i('[EVENT: LOGOUT]');
      localStorage.removeItem('token');
      return state;
    default:
      return state;
  }
}
