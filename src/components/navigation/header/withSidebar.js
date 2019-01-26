import PropTypes from 'prop-types';
import { Menu } from 'grommet-icons';
import React, { Component } from 'react';
import { Box, Button, Text, ResponsiveContext } from 'grommet';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSidebarStatus } from '../actions';

import { CLIENT } from '../../../constants/a11y';

// Components
import DropMenu from './dropMenu';
import theme from '../../../utils/theme';

const COLOR = theme.global.colors['brand'];

class Header extends Component {
  render() {
    const { user } = this.props;
    // burger status color
    const color = this.props.showSidebar ? COLOR : 'black';

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
        <Box direction="row" align="center" pad="none">
          <Button onClick={() => this.props.setSidebarStatus()} icon={<Menu color={color} />} />
          <ResponsiveContext.Consumer>
            {(size) => <Box>{size !== 'small' && <Text>{`${CLIENT}`}</Text>}</Box>}
          </ResponsiveContext.Consumer>
        </Box>

        <Text alignSelf="end">
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
