import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Box, Button, Text } from 'grommet';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveMenu } from '../actions';

// usado para navegar sin integrar sidebar dentro de react router
import history from '../../../utils/history';

import { DASHBOARD_PATH } from '../../../constants/BaseConfig';

import { GENERAL } from '../a11y';

class Sidebar extends Component {
  goto(place) {
    history.push(place);
  }

  render() {
    const { activeMenu } = this.props;
    return (
      <Box
        gridArea="sidebar"
        width="small"
        animation={[
          { type: 'slideRight', duration: 500 },
          { type: 'fadeIn', size: 'xlarge', duration: 250 },
        ]}
      >
        <Button
          key="general"
          onClick={() => {
            this.goto(DASHBOARD_PATH);
          }}
          hoverIndicator
          active={activeMenu === DASHBOARD_PATH}
        >
          <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
            <Text>{GENERAL}</Text>
          </Box>
        </Button>

        {/*<Button*/}
        {/*key="personal"*/}
        {/*onClick={() => {*/}
        {/*this.goto(E_PERSONAL_PATH);*/}
        {/*}}*/}
        {/*hoverIndicator*/}
        {/*active={activeMenu === E_PERSONAL_PATH}*/}
        {/*>*/}
        {/*<Box pad={{ horizontal: 'medium', vertical: 'small' }}>*/}
        {/*<Text>{PERSONAL}</Text>*/}
        {/*</Box>*/}
        {/*</Button>*/}
      </Box>
    );
  }
}

Sidebar.propTypes = {
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
)(Sidebar);
