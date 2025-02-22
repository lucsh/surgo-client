import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import AuthRoute from '../auth/AuthRoute';

// usado para navegar sin integrar sidebar dentro de react router
import history from '../utils/history';

// Components
import Login from '../pages/login';
import Logout from '../pages/logout';
import Verify from '../pages/verify';
import Cuenta from '../pages/cuenta';
import Persona from '../pages/persona';
import General from '../pages/general';
import NoMatch from '../components/noMatch';

// Constants
import {
  LOGIN_PATH,
  LOGOUT_PATH,
  VERIFICATION_PATH,
  DASHBOARD_PATH,
  CUENTA_PATH,
  PERSONA_PATH,
} from '../constants/BaseConfig';

import { i, l } from '../utils/log';

class Routes extends React.Component {
  render() {
    const { isLoggedIn, user } = this.props;
    l(user, 'usuario', this);
    i('[EVENT] ROUTER');

    let RouterSetup;
    RouterSetup = (
      <Router history={history}>
        <Switch>
          <Route
            path={LOGIN_PATH}
            exact
            render={(props) => <Login {...props} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path={VERIFICATION_PATH}
            exact
            render={(props) => <Verify {...props} isLoggedIn={isLoggedIn} />}
          />
          <Route path={LOGOUT_PATH} component={Logout} />

          <AuthRoute isLoggedIn={isLoggedIn} path={DASHBOARD_PATH} component={General} />
          <AuthRoute isLoggedIn={isLoggedIn} path={CUENTA_PATH} component={Cuenta} user={user} />
          <AuthRoute
            access={'private'}
            isLoggedIn={isLoggedIn}
            path={PERSONA_PATH}
            component={Persona}
            user={user}
          />

          <Route exact component={NoMatch} />
        </Switch>
      </Router>
    );

    return RouterSetup;
  }
}

export default Routes;
