import React, { Component } from 'react';
import { READ_DIRECCION, UPDATE_DIRECCION } from './constants';
import { Box, Form, FormField } from 'grommet/es6';
import { Query, Mutation } from 'react-apollo';

import { i, l } from '../../utils/log';

import ErrorComponent from '../../components/error';
import TextInput from '../../components/textInput';
import SelectProvinciaLocalidad from '../../components/selectProvinciaLocalidad';
import LoadingButton from '../../components/loadingButton';

class Personales extends Component {
  render() {
    i('[RENDER : DIRECCION]');

    const saveEdit = (value, editMe, idUser) => {
      const data = {
        calle: value.calle,
        numero: value.numero,
        observaciones: value.observaciones,
        idLocalidad: value.provinciaLocalidad.localidad.id,
      };
      editMe({ variables: { data, idUser }, refetchQueries: [{ query: READ_DIRECCION }] });
    };
    const idUser = this.props.user.id;
    return (
      <Query query={READ_DIRECCION} variables={{ idUser }} skip={!idUser}>
        {(respuesta) => {
          if (respuesta.loading) return <p>Cargando...</p>;
          if (respuesta.data && respuesta.data.address === null) {
            return <ErrorComponent />;
          }
          if (!respuesta.error) {
            l(respuesta.data.address, 'address');
            const { address } = respuesta.data;

            return (
              <Mutation mutation={UPDATE_DIRECCION}>
                {(editMe, { loading, error }) => (
                  <Box align="start" direction={'row-responsive'} gap={'large'} pad={'large'}>
                    <Form
                      onSubmit={({ value }) => saveEdit(value, editMe, this.props.user.id)}
                      value={{
                        calle: address.calle,
                        numero: address.numero,
                        observaciones: address.observaciones,
                        provinciaLocalidad: {
                          localidad: {
                            id: address.localidad.id,
                            nombre: address.localidad.nombre,
                            codigoPostal: address.localidad.codigoPostal,
                          },
                          provincia: {
                            id: address.provincia.id,
                            nombre: address.provincia.nombre,
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
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default Personales;
