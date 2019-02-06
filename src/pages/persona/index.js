import React, { Component } from 'react';
import { Box, Tabs } from 'grommet/es6';
import Tab from '../../components/tab';
import { i, l } from '../../utils/log';

import Personales from './personales';
import Educacion from './educacion';
import Direccion from './direccion';
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
    const { user } = this.props;

    // ToDo: el path deberia ser con ese parametro usr id
    // ToDo: Cambiar todos los input para que solo muestre info como en los mockups
    // ToDo: Agregar campo para dejar comentarios de los administradores
    // ToDo: Agregar queries para dejar comentarios de los administradores
    // ToDo: Agregar campo para #etiquetar (o las etiquetas van en los comments?)

    return (
      <Tabs
        align="center"
        justify={'center'}
        flex={'grow'}
        activeIndex={index}
        onActive={this.onActive}
      >
        <Tab title="Datos Personales">
          <Box
            margin="small"
            pad="small"
            align="center"
            responsive={true}
            direction={'row-responsive'}
          >
            <Personales user={user} />
          </Box>
        </Tab>
        <Tab title="Dirección">
          <Box margin="small" pad="small" align="center">
            <Direccion user={user} />
          </Box>
        </Tab>
        <Tab title="Educación">
          <Box margin="small" pad="small" align="center">
            <Educacion user={user} />
          </Box>
        </Tab>
        <Tab title="Laboral">
          <Box margin="small" pad="small" align="center">
            <Laborales user={user} />
          </Box>
        </Tab>
      </Tabs>
    );
  }
}

export default Index;
