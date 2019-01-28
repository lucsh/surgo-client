import React, { Component } from 'react';
import { ME_ESTUDIOS } from './constants';
import { Query } from 'react-apollo';

import { i, l } from '../../utils/log';

import ErrorComponent from '../../components/error';
import Estudio from '../../components/educacion/estudio';

class Personales extends Component {
  editar = (id) => {
    console.log('editar', id);
  };

  eliminar = (id) => {
    console.log('eliminar', id);
  };
  render() {
    i('[RENDER : EDUCACION]');
    // id
    // id_user
    // titulo
    // tipo
    // instituto
    // detalle
    // desde
    // hasta
    // duracion_total
    // duracion_unidad

    const idUser = this.props.user.id;

    return (
      <Query query={ME_ESTUDIOS} variables={{ idUser }} skip={!idUser}>
        {(respuesta) => {
          if (respuesta.loading) return <p>Cargando...</p>;
          if (respuesta.data && respuesta.data.address === null) {
            return <ErrorComponent />;
          }
          if (!respuesta.error) {
            l(respuesta.data.address, 'address');
            const { studies } = respuesta.data;

            return studies.map((study) => (
              <Estudio
                key={study.id}
                estudio={study}
                eliminar={this.eliminar}
                editar={this.editar}
              />
            ));
          }
          return null;
        }}
      </Query>
    );
  }
}

export default Personales;
