import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Box, Text } from 'grommet';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSidebarStatus } from '../actions';

// Components
import DropMenu from './dropMenu';
import Navigation from './navigation';

class Header extends Component {
  render() {
    const { user } = this.props;
    // burger status color

    return (
      <Box
        full="horizontal"
        gridArea="header"
        direction="row"
        align="start"
        justify="between"
        margin={{ bottom: 'xsmall' }}
        pad="none"
      >
        <Box direction="row" align="center" pad="small">
          <Navigation />
        </Box>

        <Text size={'12px'} alignSelf="center">
          <DropMenu user={user} />
        </Text>
      </Box>
    );
  }
}

Header.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  setSidebarStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showSidebar: state.navigation.showSidebar,
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarStatus: bindActionCreators(setSidebarStatus, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
