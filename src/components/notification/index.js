import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Layer, Box, Text, Button } from 'grommet';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNotification, hideNotification } from './actions';

// Error
import { DEFAULT_ERROR } from '../../constants/a11y';

/**
 * Notification
 * Necesitas notificarle algo al usuario ? llegaste al lugar correcto!
 *
 * mostrar -> ... mostrar
 * mensaje -> mensaje a Notificar
 */

class Notification extends Component {
  constructor(props) {
    super(props);
    this.descartar = this.descartar.bind(this);
    this.montar = this.montar.bind(this);
  }

  // TODO: Tener permitido hacer click por fuera y salir deberia ser contextual
  descartar() {
    this.props.hideNotification();
  }

  // Armar el componente por defecto
  montar() {
    const { mostrar, mensaje } = this.props;

    // mensaje por defecto va a ser el default error
    const notificar = mensaje || DEFAULT_ERROR;
    // dependiendo la main action que provea el usuario
    const mainAction = this.descartar || this.descartar;

    let montar;
    let LayerComponent;

    // componente por defecto
    LayerComponent = (
      <Layer position="center" onClickOutside={this.descartar}>
        <Box pad="large" gap="medium">
          <Text>{notificar}</Text>
          <Box direction="row" gap="medium" align="center">
            <Button label="Ok" onClick={mainAction} />
          </Box>
        </Box>
      </Layer>
    );

    montar = mostrar ? LayerComponent : '';

    return montar;
  }

  // TODO: render deberia poder renderizar custom components
  render() {
    let NotificationComponent = this.montar();
    return NotificationComponent;
  }
}

const mapStateToProps = (state) => ({
  mostrar: state.notification.mostrar,
  mensaje: state.notification.mensaje,
});

const mapDispatchToProps = (dispatch) => ({
  hideNotification: bindActionCreators(hideNotification, dispatch),
  setNotification: bindActionCreators(setNotification, dispatch),
});

Notification.propTypes = {
  mostrar: PropTypes.bool.isRequired,
  mensaje: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification);
