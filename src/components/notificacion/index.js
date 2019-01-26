import React, { Component } from 'react';
import { Layer, Box, Text } from 'grommet/es6';

// Error
import { DEFAULT_ERROR } from '../../constants/a11y';

import theme from '../../utils/theme';

import { FormClose } from 'grommet-icons';

class Notificacion extends Component {
  state = {
    mostrar: false,
  };

  componentDidMount() {
    this.setState({ mostrar: this.props.mostrar });
    setTimeout(() => {
      this.setState({ mostrar: false });
    }, this.props.duration * 1000 || '4500');
  }

  render() {
    const { error, warn, info } = this.props;

    const { mostrar } = this.state;

    const COLOR = info || warn || error ? 'white' : 'black';

    const ERROR_COLOR = theme.global.colors['status-error'];
    const WARN_COLOR = theme.global.colors['status-warning'];
    const INFO_COLOR = theme.global.colors['status-ok'];

    let styles = {};

    if (info) {
      styles = {
        backgroundColor: INFO_COLOR,
        color: COLOR,
      };
    }
    if (warn) {
      styles = {
        backgroundColor: WARN_COLOR,
        color: COLOR,
      };
    }
    if (error) {
      styles = {
        backgroundColor: ERROR_COLOR,
        color: COLOR,
      };
    }

    const descartar = () => {
      this.setState({ mostrar: false });
    };

    const mensaje = this.props.mensaje || DEFAULT_ERROR;
    return mostrar ? (
      <Layer
        style={{ ...styles }}
        modal={false}
        position="top"
        full={'horizontal'}
        onClickOutside={descartar}
      >
        <Box pad="small" gap="small" direction={'row-responsive'} justify="between">
          <Text textAlign={'start'}>{mensaje}</Text>
          <FormClose color={COLOR} onClick={descartar} style={{ cursor: 'pointer' }} />
        </Box>
      </Layer>
    ) : null;
  }
}

export default Notificacion;
