import update from 'immutability-helper';
import { SET_NOTIFICATION, HIDE_NOTIFICATION } from './constants';
import { i } from '../../utils/log';

const initialState = {
  mostrar: false,
  mensaje: '',
};

export default function notification(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      i('[EVENT: SET_NOTIFICATION]');
      // en caso de estar abierto solo ejecutar el lyfecycle.
      let stateMostrar = !state.mostrar ? !state.mostrar : state.mostrar;
      return update(state, {
        mostrar: { $set: stateMostrar },
        mensaje: { $set: !action.payload.mensaje },
      });
    case HIDE_NOTIFICATION:
      i('[EVENT: HIDE_NOTIFICATION]');
      return update(state, {
        mostrar: { $set: false },
      });

    default:
      return state;
  }
}
