import { authLogout } from '../actions/auth';

export const hasRole = (usuario, roles) => {
  if (!usuario.roles) {
    return false;
  }
  return usuario.roles.some((ur) => roles.indexOf(ur.name) >= 0);
};

export const loginHandler = () => {
  //
};

export const logoutHandler = () => {
  localStorage.removeItem('token');
  authLogout();
};
