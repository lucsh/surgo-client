import React, { Component } from 'react';
import { Box, Grid, Tabs } from 'grommet/es6';
import Tab from '../../components/tab';
import { i, l } from '../../utils/log';
import { READ_RESUMEN_PERSONA } from './constants';

import ResumenPersona from '../../components/resumenPersona';
import Personales from './personales';
import Educacion from './educacion';
import Direccion from './direccion';
import Laborales from './laborales';
import Hitos from './hitos';
import ErrorComponent from '../../components/error';
import { Query } from 'react-apollo';

class Index extends Component {
  state = {
    index: 0,
  };

  onActive = (index) => this.setState({ index });

  render() {
    const user = { id: this.props.match.params.idUser };

    i('[RENDER : PERSONALES]');

    const { index } = this.state;

    return (
      <Grid
        alignSelf="center"
        rows={['auto', 'medium']}
        columns={['auto', 'flex']}
        gap="small"
        fill="horizontal"
        areas={[
          { name: 'resumen', start: [0, 0], end: [1, 0] },
          { name: 'main', start: [0, 1], end: [1, 1] },
        ]}
      >
        <Box gridArea="resumen" direction="row-responsive">
          <Query query={READ_RESUMEN_PERSONA} variables={{ idUser: user.id }}>
            {(respuesta) => {
              if (respuesta.loading) return <p>Cargando...</p>;
              if (respuesta.data && respuesta.data.resumen === null) {
                return <ErrorComponent />;
              }
              if (!respuesta.error) {
                l(respuesta.data, 'RESUMEN PERSONA');
                const persona = respuesta.data.resumen;

                return <ResumenPersona persona={persona} mostrarAvatar={index !== 0} />;
              }
            }}
          </Query>
        </Box>
        <Box gridArea="main">
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
            <Tab title="Historial">
              <Box margin="small" pad="small" align="center">
                <Hitos user={user} />
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </Grid>
    );
  }
}

export default Index;
