import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LOGIN_PATH } from '../constants/BaseConfig';
import * as AuthActions from '../actions/auth';
import { l, i } from '../utils/log';

class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    this.safeRender = this.safeRender.bind(this);
    i(`[EVENT: AUTENTICAR AUTORIZAR] -> [LOGGED IN: ${this.props.isLoggedIn}]`);
  }

  safeRender(props) {
    const { component: Component, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to={{ pathname: LOGIN_PATH }} />;
    }

    if (isLoggedIn) {
      return <Component {...props}  />;
    }
    return null;
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return <Route {...rest} render={this.safeRender} />;
  }
}

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.object,
};
const mapStateToProps = (state) => ({
  // isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(AuthActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthRoute),
);
