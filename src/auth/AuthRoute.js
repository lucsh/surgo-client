import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect, withRouter } from 'react-router-dom';

import { LOGIN_PATH } from '../constants/BaseConfig';
import { i } from '../utils/log';

class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    this.safeRender = this.safeRender.bind(this);
    i(`[EVENT: AUTENTICAR / AUTORIZAR]`);
  }

  safeRender(props) {
    const { component: Component, isLoggedIn, user } = this.props;
    i('[SAFE RENDER]');
    console.log({ isLoggedIn });
    console.log({ user });

    if (isLoggedIn) {
      i('isLoggedIn');
      return <Component {...props} user={user} />;
    } else {
      i('!isLoggedIn');
      return <Redirect to={{ pathname: LOGIN_PATH }} />;
    }
  }

  render() {
    const { ...rest } = this.props;
    return <Route render={this.safeRender} />;
  }
}

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default withRouter(AuthRoute);
