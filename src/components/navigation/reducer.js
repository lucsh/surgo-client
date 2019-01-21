import { i } from '../../utils/log';
import history from '../../utils/history';
import update from 'immutability-helper';
import { DASHBOARD_PATH } from '../../constants/BaseConfig';
import { SET_SIDEBAR_STATUS, SET_ACTIVE_MENU } from './constants';

// Si recargamos la pagina queremos mantener el activity de navegacion
const location = history.location.pathname || DASHBOARD_PATH;

const initialState = {
  showSidebar: true,
  activeMenu: location,
};

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_STATUS:
      i('[EVENT: SET_SIDEBAR_STATUS]');
      return update(state, {
        showSidebar: { $set: !state.showSidebar },
      });
    case SET_ACTIVE_MENU:
      i('[EVENT: SET_ACTIVE_MENU]');
      return update(state, {
        activeMenu: { $set: action.payload },
      });

    default:
      return state;
  }
}
