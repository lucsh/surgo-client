import LoadingIcon from '../loading';
import { Button } from 'grommet/es6';
import React, { Component } from 'react';

class LoadingButton extends Component {
  render() {
    console.log('props');

    console.log(this.props);
    console.log('/props');
    const { loading } = this.props;

    const extraProps = loading ? { icon: <LoadingIcon width={'20px'} /> } : {};

    return (
      <Button
        {...this.props}
        {...extraProps}
        reverse
        primary
        style={{ fontWeight: 'bold' }}
        label={'Actualizar Datos'}
        disabled={loading}
      />
    );
  }
}

export default LoadingButton;
