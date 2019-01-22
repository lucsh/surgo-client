import { Box, Tab } from 'grommet/es6';
import React, { Component } from 'react';
import theme from '../../utils/theme';

class CustomTab extends Component {
  render() {
    const BRAND_COLOR = theme.global.colors['brand'];
    const BLACK_COLOR = '#BABABA';
    console.log(this.props);
    const { active } = this.props;
    let styles = {
      padding: '10px 15px',
      // paddingBottom: '15px',
      borderRadius: 0,
      borderBottom: `solid 1px ${BLACK_COLOR}`,
    };
    if (active) {
      styles = { ...styles, borderBottom: `solid 2px ${BRAND_COLOR}`, color: `${BRAND_COLOR}` };
    }

    const triangle = {
      width: 0,
      height: 0,
      borderLeft: '7px solid transparent',
      borderRight: '7px solid transparent',
      borderBottom: `solid 7px ${BRAND_COLOR}`,
      marginTop: '-9px',
      marginLeft: '12px',
    };
    return (
      <Box>
        <Tab {...this.props} plain style={{ ...styles }} />
        {active && <Box style={{ ...triangle }} />}
      </Box>
    );
  }
}

export default CustomTab;
