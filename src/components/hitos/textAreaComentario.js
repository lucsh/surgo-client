import { Box, TextArea } from 'grommet/es6';
import React, { Component } from 'react';

class InputArea extends Component {
  state = {
    value: '',
  };
  componentDidMount() {
    let { value } = this.props;
    this.setState({
      value,
    });
  }

  onChange = (e) => {
    let value = e.target.value;
    this.setState({
      value,
    });
    this.props.onChange({ target: { value } });
  };

  render() {
    let styles = { fontWeight: 400, borderRadius: 0, borderBottom: 'none' };
    if (this.props.borderBottom) {
      styles = { ...styles, borderBottom: 'solid 1px #888888' };
    }

    return (
      <Box
        align="start"
        direction={'row-responsive'}
        gap={'large'}
        pad={{ vertical: 'xsmall' }}
        width={this.props.width}
      >
        <TextArea
          {...this.props}
          fill
          placeholder={this.props.placeholder}
          style={{ ...styles }}
          onChange={this.onChange}
          plain
        />
      </Box>
    );
  }
}

export default InputArea;
