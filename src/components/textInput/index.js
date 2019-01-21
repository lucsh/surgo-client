import { TextInput } from 'grommet/es6';
import React, { Component } from 'react';

class Input extends Component {
  render() {
    let styles = { borderRadius: 0, borderBottom: 'none' };
    if (this.props.borderBottom) {
      styles = { ...styles, borderBottom: 'solid 1px #888888' };
    }
    return <TextInput {...this.props} style={{ ...styles }} plain />;
  }
}

export default Input;
