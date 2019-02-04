import React, { Component, Fragment } from 'react';
import { READ_TRABAJOS, UPDATE_TRABAJO, CREATE_TRABAJO, DELETE_TRABAJO } from './constants';
import { Mutation, Query } from 'react-apollo';
import { Box, Heading, ResponsiveContext } from 'grommet/es6';

import { i, l } from '../../utils/log';

import ErrorComponent from '../../components/error';
import SmallButton from '../../components/smallButton';
import Trabajo from '../../components/laborales/trabajo';
import EditarTrabajo from '../../components/laborales/form';

class Laborales extends Component {
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

  editar = (trabajo) => {
    this.setState({ trabajo, editando: trabajo.id });
  };

  handleAgregar = () => {
    console.log('handleAgregar');
    this.setState({ agregando: true });
  };

  render() {
    i('[RENDER : LABORAL]');
    const { user } = this.props;
    const idUser = user.id;

    const { editando, agregando, trabajo } = this.state;
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
              <Query query={READ_TRABAJOS} variables={{ idUser }} skip={!idUser}>
                {(respuesta) => {
                  if (respuesta.loading) return <p>Cargando...</p>;
                  if (respuesta.data && respuesta.data.address === null) {
                    return <ErrorComponent />;
                  }
                  if (!respuesta.error) {
                    l(respuesta.data, 'respuesta');
                    const { jobs } = respuesta.data;

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
                          Experiencia Laboral
                        </Heading>
                        {jobs.map((job) => {
                          return (
                            <Mutation key={job.id} mutation={DELETE_TRABAJO}>
                              {(deleteJob, { loading, error }) => (
                                <Trabajo
                                  trabajo={job}
                                  loading={loading}
                                  error={error}
                                  mutation={deleteJob}
                                  editar={this.editar}
                                  editando={job.id === editando}
                                />
                              )}
                            </Mutation>
                          );
                        })}
                      </Fragment>
                    );
                  }
                  return null;
                }}
              </Query>
              {editando && (
                <Mutation mutation={UPDATE_TRABAJO}>
                  {(editWork, { loading, error }) => (
                    <EditarTrabajo
                      user={user}
                      k={trabajo.id}
                      loading={loading}
                      error={error}
                      trabajo={trabajo}
                      mutation={editWork}
                      formulario={'editando'}
                      updateParentState={this.updateParentState}
                    />
                  )}
                </Mutation>
              )}
              {agregando && (
                <Mutation mutation={CREATE_TRABAJO}>
                  {(createWork, { loading, error }) => (
                    <EditarTrabajo
                      user={user}
                      k={'agregar'}
                      loading={loading}
                      error={error}
                      trabajo={{}}
                      mutation={createWork}
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

export default Laborales;
