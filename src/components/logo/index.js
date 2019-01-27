import React, { Component } from 'react';
import logo from './logo.svg';

class LoadingIcon extends Component {
  render() {
    return <img width={this.props.width} src={logo} />;
  }
}

export default LoadingIcon;
