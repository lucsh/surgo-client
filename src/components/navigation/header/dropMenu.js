import { Menu } from 'grommet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authLogout } from '../../../actions/auth';
import { setActiveMenu } from '../actions';

import { SALIR, CUENTA, ANONIMO } from '../a11y';
import { CUENTA_PATH, LOGOUT_PATH } from '../../../constants/BaseConfig';
import history from '../../../utils/history';
import { i } from '../../../utils/log';

class UsuarioDropMenu extends Component {
  goto(place) {
    this.props.setActiveMenu(place);
    history.push(place);
  }

  render() {
    const { user } = this.props;
    let label = ANONIMO;
    let itemsMenu = [
      {
        label: SALIR,
        onClick: () => {
          i('logout...');
          this.goto(LOGOUT_PATH);
        },
      },
      {
        label: CUENTA,
        onClick: () => {
          i('logout...');
          this.goto(CUENTA_PATH);
        },
      },
    ];
    if (user && user.email) {
      label = user.email;
    }

    if (user && user.nombre) {
      label = user.nombre;
    }

    return <Menu align="center" size={'12px'} label={label} items={itemsMenu} />;
  }
}

UsuarioDropMenu.propTypes = {
  user: PropTypes.object.isRequired,
  authLogout: PropTypes.func.isRequired,
  setActiveMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // isLoggedIn: state.auth.isLoggedIn,
  activeMenu: state.navigation.activeMenu,
});

const mapDispatchToProps = (dispatch) => ({
  authLogout: bindActionCreators(authLogout, dispatch),
  setActiveMenu: bindActionCreators(setActiveMenu, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsuarioDropMenu);
