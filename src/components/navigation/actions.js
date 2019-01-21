import { SET_SIDEBAR_STATUS, SET_ACTIVE_MENU } from './constants';

export const setSidebarStatus = () => ({
  type: SET_SIDEBAR_STATUS,
});

export const setActiveMenu = (menu) => ({
  type: SET_ACTIVE_MENU,
  payload: menu,
});
