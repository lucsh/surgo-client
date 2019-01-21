import { SET_NOTIFICATION, HIDE_NOTIFICATION } from './constants';

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});

export const setNotification = (mensaje) => ({
  type: SET_NOTIFICATION,
  payload: mensaje,
});
