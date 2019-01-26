import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Box, Button, ResponsiveContext, Text } from 'grommet';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveMenu } from '../actions';

// usado para navegar sin integrar sidebar dentro de react router
import history from '../../../utils/history';

import { DASHBOARD_PATH, CUENTA_PATH } from '../../../constants/BaseConfig';

import { GENERAL, CUENTA } from '../a11y';
import Logo from '../../logo';
import { CLIENT } from '../../../constants/a11y';
import { Anchor } from 'grommet/es6';

class Navigation extends Component {
  goto(place) {
    this.props.setActiveMenu(place);
    history.push(place);
  }

  render() {
    const { activeMenu } = this.props;
    return (
      <Box
        direction="row"
        gridArea="header"
        animation={[{ type: 'fadeid', duration: 500 }]}
      >
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box direction="row" pad="none" height={'50px'}>
              <Anchor
                icon={<Logo width={'30px'} />}
                onClick={() => {
                  this.goto(DASHBOARD_PATH);
                }}
              />
              {size === 'large' && <Text>{`${CLIENT}`}</Text>}
            </Box>
          )}
        </ResponsiveContext.Consumer>
        <Button
          key="general"
          onClick={() => {
            this.goto(DASHBOARD_PATH);
          }}
          hoverIndicator
          active={activeMenu === DASHBOARD_PATH}
        >
          <Box pad={{ horizontal: 'medium' }}>
            <Text>{GENERAL}</Text>
          </Box>
        </Button>

        <Button
          key="cuenta"
          onClick={() => {
            this.goto(CUENTA_PATH);
          }}
          hoverIndicator
          active={activeMenu === CUENTA_PATH}
        >
          <Box pad={{ horizontal: 'medium' }}>
            <Text>{CUENTA}</Text>
          </Box>
        </Button>
      </Box>
    );
  }
}

Navigation.propTypes = {
  setActiveMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeMenu: state.navigation.activeMenu,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveMenu: bindActionCreators(setActiveMenu, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
