import { Box, TextInput } from 'grommet/es6';
import React, { Component } from 'react';

class Input extends Component {
  state = {
    value: '',
  };

  componentDidMount() {
    let { value } = this.props;
    console.log('value en input cdi props', value);

    value = this.props.numeric ? this.toNumber(value) : value;
    console.log('value en input cdi state', value);

    this.setState({
      value,
    });
  }

  toNumber = (value) => {
    if (!value) return 0;
    if (typeof value === 'number') {
      return value;
    }
    const parsed = value.match(/\d/g);
    return parseInt(parsed.join(''));
  };

  onChange = (e) => {
    let value = e.target.value;
    value = this.props.numeric ? this.toNumber(value) : value;
    console.log('valor: ', value);
    this.props.onChange({ target: { value } });
    this.setState({
      value,
    });
  };

  render() {
    let styles = { borderRadius: 0, borderBottom: 'none' };
    let type = 'text';
    if (this.props.borderBottom) {
      styles = { ...styles, borderBottom: 'solid 1px #888888' };
    }
    if (this.props.numeric) {
      type = 'number';
    }

    console.log('value en input render', this.state.value);

    return (
      <Box
        align="start"
        direction={'row-responsive'}
        gap={'large'}
        pad={{ vertical: 'xsmall' }}
        width={this.props.width}
      >
        <TextInput
          size={this.props.size}
          placeholder={this.props.placeholder}
          style={{ ...styles }}
          type={type}
          value={`${this.state.value}`}
          onChange={this.onChange}
          plain
        />
      </Box>
    );
  }
}

export default Input;
