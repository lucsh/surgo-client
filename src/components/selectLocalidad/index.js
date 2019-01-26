import { Select } from 'grommet/es6';
import React, { Component } from 'react';

class Input extends Component {
  state = {
    genero: '',
    otro: '',
  };

  const;
  componentDidMount() {
    let { value } = this.props;
    value = this.props.numeric ? this.toNumber(value) : value;
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

    return (
      <Select
        size={this.props.size}
        style={{ ...styles }}
        type={type}
        value={`${this.state.value}`}
        onChange={this.onChange}
        plain
      />
    );
  }
}

export default Input;
