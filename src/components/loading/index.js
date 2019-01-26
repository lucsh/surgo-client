import React, { Component } from 'react';
import loading from './three-dots.svg';

class LoadingIcon extends Component {
  render() {
    return (
      <img
        width={this.props.width}
        src={loading}
        style={{ padding: '8px 0 0 0', margin: '0 0 0 -8px' }}
      />
    );
  }
}

export default LoadingIcon;
