import { Box, CheckBox, Text } from 'grommet/es6';
import React, { Component } from 'react';

class Index extends Component {
  render() {
    console.log('props');

    console.log(this.props);
    console.log('/props');
    const onChange = (e) => {
      this.props.onChange({ value: { checked: e.target.checked } });
    };
    return (
      <Box direction="row" align="center" gap="xsmall" pad={'xsmall'}>
        <CheckBox {...this.props} checked={this.props.value.checked} onChange={onChange} label={''} style={{ borderBottom: 'none' }} />
        <Text size={'xsmall'}>{this.props.etiqueta}</Text>
      </Box>
    );
  }
}

export default Index;
