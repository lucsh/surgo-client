import React, { Component, Fragment } from 'react';
import { READ_HITOS, CREATE_HITO, DELETE_HITO } from './constants';
import { Box, Form, FormField } from 'grommet/es6';
import { Query, Mutation } from 'react-apollo';

import { i } from '../../utils/log';

import ErrorComponent from '../../components/error';
import TextInput from '../../components/textInput';
import SelectProvinciaLocalidad from '../../components/selectProvinciaLocalidad';
import LoadingButton from '../../components/loadingButton';

class Hitos extends Component {
  render() {
    i('[RENDER : HITOS]');

    const saveHito = (value, createHito, idUser) => {
      const hito = {
        observacion: value.observacion,
        estado: value.estado,
      };
      createHito({
        variables: { hito, idUser },
        refetchQueries: [{ query: READ_HITOS, variables: { idUser } }],
      });
    };

    const eliminar = (value, mutation) => {
      mutation({
        variables: { id: value.id, idUser: value.idUser },
        refetchQueries: [{ query: READ_HITOS, variables: { idUser: value.idUser } }],
      });
    };

    const idUser = this.props.user.id;
    return (
      <Box align="center" alignSelf="center" width="size" animation="slideLeft">
        <Query query={READ_HITOS} variables={{ idUser }} skip={!idUser}>
          {(respuesta) => {
            if (respuesta.loading) return <p>Cargando...</p>;
            if (respuesta.error || (respuesta.data && respuesta.data.hitos === null)) {
              return <ErrorComponent />;
            }
            if (!respuesta.error) {
              console.log(
                '%c < respuesta.data.hitos > ',
                'background: #181718; color: #white; line-height:110%',
              );
              console.log(respuesta.data.hitos);
              console.log(
                '%c < respuesta.data.hitos /> ',
                'background: #181718; color: #white; line-height:110%',
              );

              const { hitos } = respuesta.data;

              return (
                <Fragment>
                  {hitos.map((hito) => (
                    <Mutation key={hito.id} mutation={DELETE_HITO}>
                      {/*TODO agregar componente "hito" similar a estudio*/}
                      {(deleteHito, { loading, error }) => <div />}
                    </Mutation>
                  ))}

                  <Mutation mutation={CREATE_HITO}>
                    {(createHito, { loading, error }) => (
                      <Box align="start" direction={'row-responsive'} gap={'large'} pad={'large'}>
                        <Form
                          onSubmit={({ value }) => saveHito(value, createHito, this.props.user.id)}
                          value={{
                            calle: hitos.calle,
                            numero: hitos.numero,
                            observaciones: hitos.observaciones,
                            provinciaLocalidad: {
                              localidad: {
                                id: hitos.localidad.id,
                                nombre: hitos.localidad.nombre,
                                codigoPostal: hitos.localidad.codigoPostal,
                              },
                              provincia: {
                                id: hitos.provincia.id,
                                nombre: hitos.provincia.nombre,
                              },
                            },
                          }}
                        >
                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              label="CALLE"
                              name="calle"
                              required
                              validate={{ regexp: /^[a-z]/i }}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={TextInput}
                            />
                            <FormField
                              size={'small'}
                              label="NÚMERO"
                              name="numero"
                              required
                              numeric
                              validate={{ regexp: /^[0-9]/i }}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={TextInput}
                            />
                          </Box>
                          <Box
                            align="start"
                            fill="horizontal"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              fill="horizontal"
                              label="OBSERVACIONES"
                              name="observaciones"
                              style={{ borderBottom: 'solid 1px #888888' }}
                              placeholder={'Sin Observaciones'}
                              component={TextInput}
                            />
                          </Box>
                          <Box
                            align="start"
                            fill="horizontal"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              fill="horizontal"
                              label="PROVINCIA Y LOCALIDAD"
                              name="provinciaLocalidad"
                              component={SelectProvinciaLocalidad}
                            />
                          </Box>
                          <Box
                            direction="row"
                            justify="end"
                            pad={{ vertical: 'xsmall' }}
                            margin={{ top: 'medium', bottom: 'meddium' }}
                          >
                            <LoadingButton
                              type="submit"
                              reverse
                              loading={loading}
                              primary
                              label={'Actualizar Dirección'}
                            />
                          </Box>
                          {error && <ErrorComponent error={error} />}
                        </Form>
                      </Box>
                    )}
                  </Mutation>
                </Fragment>
              );
            }
            return null;
          }}
        </Query>
      </Box>
    );
  }
}

export default Hitos;
