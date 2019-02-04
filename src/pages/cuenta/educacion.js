import React, { Component, Fragment } from 'react';
import { READ_ESTUDIOS, UPDATE_ESTUDIO, CREATE_ESTUDIO, DELETE_ESTUDIO } from './constants';
import { Mutation, Query } from 'react-apollo';
import { Box, Heading, ResponsiveContext } from 'grommet/es6';

import { i } from '../../utils/log';

import ErrorComponent from '../../components/error';
import SmallButton from '../../components/smallButton';
import Estudio from '../../components/educacion/estudio';
import EditarEstudio from '../../components/educacion/form';

class Educacion extends Component {
  constructor() {
    super();
    this.state = {
      editando: false,
      agregando: false,
    };
    this.updateParentState = this.updateParentState.bind(this);
  }

  updateParentState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  editar = (estudio) => {
    this.setState({ estudio, editando: estudio.id });
  };

  handleAgregar = () => {
    console.log('handleAgregar');
    this.setState({ agregando: true });
  };

  render() {
    i('[RENDER : EDUCACION]');
    const { user } = this.props;
    const idUser = user.id;

    const { editando, agregando, estudio } = this.state;
    return (
      <ResponsiveContext.Consumer>
        {(size) => {
          let width = 'large';
          switch (size) {
            case 'xsmall':
              width = 'small';
              break;
            case 'small':
              width = 'medium';
              break;
            default:
              break;
          }
          return (
            <Box align="center" alignSelf="center" width={width}>
              <Query query={READ_ESTUDIOS} variables={{ idUser }} skip={!idUser}>
                {(respuesta) => {
                  if (respuesta.loading) return <p>Cargando...</p>;
                  if (respuesta.data && respuesta.data.address === null) {
                    return <ErrorComponent />;
                  }
                  if (!respuesta.error) {
                    const { studies } = respuesta.data;

                    return (
                      <Fragment>
                        <Box align="end" alignSelf="end">
                          <SmallButton
                            type="button"
                            label="+ Agregar"
                            onClick={this.handleAgregar}
                            color="brand"
                          />
                        </Box>
                        <Heading textAlign="start" alignSelf="start" level={3}>
                          Educación
                        </Heading>
                        {studies.map((study) => {
                          if (study.tipo !== 'Curso') {
                            return (
                              <Mutation key={study.id} mutation={DELETE_ESTUDIO}>
                                {(deleteStudy, { loading, error }) => (
                                  <Estudio
                                    estudio={study}
                                    loading={loading}
                                    error={error}
                                    mutation={deleteStudy}
                                    editar={this.editar}
                                    editando={study.id === editando}
                                  />
                                )}
                              </Mutation>
                            );
                          }
                        })}
                        <Heading textAlign="start" alignSelf="start" level={3}>
                          Cursos
                        </Heading>
                        {studies.map((study) => {
                          if (study.tipo === 'Curso') {
                            return (
                              <Mutation key={study.id} mutation={DELETE_ESTUDIO}>
                                {(deleteStudy, { loading, error }) => (
                                  <Estudio
                                    estudio={study}
                                    loading={loading}
                                    error={error}
                                    mutation={deleteStudy}
                                    editar={this.editar}
                                    editando={study.id === editando}
                                  />
                                )}
                              </Mutation>
                            );
                          }
                        })}
                      </Fragment>
                    );
                  }
                  return null;
                }}
              </Query>
              {editando && (
                <Mutation mutation={UPDATE_ESTUDIO}>
                  {(editStudy, { loading, error }) => (
                    <EditarEstudio
                      user={user}
                      k={estudio.id}
                      loading={loading}
                      error={error}
                      estudio={estudio}
                      mutation={editStudy}
                      formulario={'editando'}
                      updateParentState={this.updateParentState}
                    />
                  )}
                </Mutation>
              )}
              {agregando && (
                <Mutation mutation={CREATE_ESTUDIO}>
                  {(createStudy, { loading, error }) => (
                    <EditarEstudio
                      user={user}
                      k={'agregar'}
                      loading={loading}
                      error={error}
                      estudio={{}}
                      mutation={createStudy}
                      formulario={'agregando'}
                      updateParentState={this.updateParentState}
                    />
                  )}
                </Mutation>
              )}
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    );
  }
}

export default Educacion;
