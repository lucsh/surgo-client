import React, { Component } from 'react';
import { Box, Tabs } from 'grommet/es6';
import Tab from '../../components/tab'
import { i, l } from '../../utils/log';

import Personales from './personales';
import Educacion from './educacion';
import Laborales from './laborales';

class Index extends Component {
  state = {
    index: 0,
  };

  onActive = (index) => this.setState({ index });

  render() {
    i('[RENDER : CUENTA]');
    l(this.state, 'state', this);
    l(this.props, 'props', this);
    const { index } = this.state;

    // ToDo: Agregar campos de dirección
    // ToDo: Agregar campo de estado civil
    // ToDo: Agregar campo cantidad de hijos
    // ToDo: Agregar campo para subir foto
    // ToDo: El dato de nivel de estudio debería ser dinamico desde la tabla `user_educacion`

    return (
      <Tabs align="center" justify={'center'} flex={'grow'} activeIndex={index} onActive={this.onActive}>
        <Tab title="Datos Personales" tabContents={'ggwp'}>
          <Box margin="small" pad="medium" align="center">
            <Personales />
          </Box>
        </Tab>
        <Tab title="Educación">
          <Box margin="small" pad="medium" align="center">
            <Educacion />
          </Box>
        </Tab>
        <Tab title="Laboral">
          <Box margin="small" pad="medium" align="center">
            <Laborales />
          </Box>
        </Tab>
      </Tabs>
    );
  }
}

export default Index;
