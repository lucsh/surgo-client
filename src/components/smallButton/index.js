import { Box, Button } from 'grommet/es6';
import React, { Component } from 'react';

class LoadingButton extends Component {
  render() {
    return (
      <Box
        background={{ color: 'brand' }}
        round="xsmall"
        pad={{ horizontal: 'xsmall', vertical: '1px' }}
      >
        <Button {...this.props} plain style={{ color: 'white' }} />
      </Box>
    );
  }
}

export default LoadingButton;
