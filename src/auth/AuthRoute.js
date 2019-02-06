import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect, withRouter } from 'react-router-dom';

import AccessDenied from '../components/accessDenied';

import { LOGIN_PATH } from '../constants/BaseConfig';
import { i } from '../utils/log';

class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    this.safeRender = this.safeRender.bind(this);
    i(`[EVENT: AUTENTICAR / AUTORIZAR]`);
  }

  safeRender(props, isLoggedIn, access, user) {
    const { component: Component } = this.props;
    i('[SAFE RENDER]');

    if (user) {
      const isAdmin = user.roles.includes('superuser') || user.roles.includes('admin');
      if (access === 'private' && !isAdmin) {
        i('access');
        i('private');
        return <AccessDenied />;
      }
      return <Component {...props} user={user} />;
    } else {
      i('!user');
      return <Redirect to={{ pathname: LOGIN_PATH }} />;
    }
  }

  render() {
    const { isLoggedIn, user, access } = this.props;

    return <Route render={(props) => this.safeRender(props, isLoggedIn, access, user)} />;
  }
}

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default withRouter(AuthRoute);
