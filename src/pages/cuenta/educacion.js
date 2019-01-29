import React, { Component, Fragment } from 'react';
import { ME_ESTUDIOS } from './constants';
import { Query } from 'react-apollo';

import { i, l } from '../../utils/log';

import ErrorComponent from '../../components/error';
import Estudio from '../../components/educacion/estudio';
import EditarEstudio from '../../components/educacion/form';

class Personales extends Component {
  state = { editando: false };
  editar = (estudio) => {
    console.log('editar', estudio);
    this.setState({ editando: estudio.id });
    this.setState({ estudio });
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

    const { editando, estudio } = this.state;
    return (
      <Fragment>
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
                  editando={study.id === editando}
                />
              ));
            }
            return null;
          }}
        </Query>
        {editando && <EditarEstudio k={estudio.id} estudio={estudio} />}
      </Fragment>
    );
  }
}

export default Personales;
