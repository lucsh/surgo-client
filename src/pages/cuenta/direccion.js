import React, { Component } from 'react';
import { ME_DIRECCION, UPDATE_DIRECCION, LOCALIDADES, PROVINCIAS } from './constants';
import { Box, Form, FormField, Select } from 'grommet/es6';
import { Query, Mutation } from 'react-apollo';

import { i, l } from '../../utils/log';

import ErrorComponent from '../../components/error';
import TextInput from '../../components/textInput';
import SelectProvincia from '../../components/selectProvincia';
import SelectLocalidad from '../../components/selectLocalidad';

class Personales extends Component {
  render() {
    i('[RENDER : DIRECCION]');
    console.log(this.props);

    const saveEdit = (value, editMe, idUser) => {
      const data = {
        calle: value.calle,
        numero: value.numero,
        observaciones: value.observaciones,
        idLocalidad: value.idLocalidad,
      };
      editMe({ variables: { data, idUser }, refetchQueries: [{ query: ME_DIRECCION }] });
    };

    return (
      <Query query={ME_DIRECCION} variables={{ idUser: this.props.user.id }}>
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
                      onSubmit={({ value }) => saveEdit(value, editMe, null)}
                      value={{
                        calle: address.calle,
                        numero: address.numero,
                        observaciones: address.observaciones,
                        localidad: {
                          id: address.localidad.id,
                          nombre: address.localidad.nombre,
                          codigoPostal: address.localidad.codigoPostal,
                        },
                        provincia: {
                          id: address.provincia.id,
                          nombre: address.provincia.nombre,
                        },
                      }}
                    >
                      <Box align="start" direction={'row-responsive'} gap={'large'}>
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
                      >
                        <FormField
                          size={'xlarge'}
                          fill="horizontal"
                          label="OBSERVACIONES"
                          name="observaciones"
                          required
                          validate={{ regexp: /^[a-z]/i }}
                          style={{ borderBottom: 'solid 1px #888888' }}
                          component={TextInput}
                        />
                      </Box>
                      <Box
                        align="start"
                        fill="horizontal"
                        direction={'row-responsive'}
                        gap={'large'}
                      >
                        <FormField
                          fill="horizontal"
                          label="PROVINCIA"
                          name="provincia"
                          // required
                          // options={provincias}
                          component={SelectProvincia}
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
