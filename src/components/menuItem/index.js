import React, { Component } from 'react';
import { Box, Text, Button } from 'grommet/es6';

class MenuItem extends Component {
  render() {
    const { k, onClick, hoverIndicator, active, text } = this.props;
    console.log(text, hoverIndicator);
    const style = active
      ? { borderBottom: '2px solid black', fontWeight: 400 }
      : { fontWeight: 300, color: 'grey' };
    return (
      <Button hoverIndicator style={style} plain key={k} onClick={onClick}>
        <Box pad={{ horizontal: 'medium' }}>
          <Text size={'12px'}>{text}</Text>
        </Box>
      </Button>
    );
  }
}

export default MenuItem;
