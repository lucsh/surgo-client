import { ME_ESTUDIOS, UPDATE_ESTUDIO } from '../../../pages/cuenta/constants'
import { Box, Form, FormField } from 'grommet/es6';
import TextInput from '../../textInput';
import SelectProvinciaLocalidad from '../../selectProvinciaLocalidad';
import LoadingButton from '../../loadingButton';
import ErrorComponent from '../../error';
import { Mutation } from 'react-apollo';
import React, { Component } from 'react';

class EditarEstudio extends Component {
  render() {
    const { estudio } = this.props.estudio;

    const saveEdit = (value, editMe, idUser) => {
      console.log('idUser');
      console.log(idUser);
      const data = {
        calle: value.calle,
        numero: value.numero,
        observaciones: value.observaciones,
        idLocalidad: value.provinciaLocalidad.localidad.id,
      };
      editMe({ variables: { data, idUser }, refetchQueries: [{ query: ME_ESTUDIOS }] });
    };

    return (
      <Mutation mutation={UPDATE_ESTUDIO}>
        {(editMe, { loading, error }) => (
          <Box align="start" direction={'row-responsive'} gap={'large'} pad={'large'}>
            <Form
              onSubmit={({ value }) => saveEdit(value, editMe, this.props.user.id)}
              value={{
                id: estudio.id,
                idUser: estudio.idUser,
                titulo: estudio.titulo,
                tipo: estudio.tipo,
                instituto: estudio.instituto,
                detalle: estudio.detalle,
                desde: estudio.desde,
                hasta: estudio.hasta,
                duracionTotal: estudio.duracionTotal,
                duracionUnidad: estudio.duracionUnidad,
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
              <Box align="start" fill="horizontal" direction={'row-responsive'} gap={'large'}>
                <FormField
                  fill="horizontal"
                  label="OBSERVACIONES"
                  name="observaciones"
                  style={{ borderBottom: 'solid 1px #888888' }}
                  placeholder={'Sin Observaciones'}
                  component={TextInput}
                />
              </Box>
              <Box align="start" fill="horizontal" direction={'row-responsive'} gap={'large'}>
                <FormField
                  fill="horizontal"
                  label="PROVINCIA Y LOCALIDAD"
                  name="provinciaLocalidad"
                  component={SelectProvinciaLocalidad}
                />
              </Box>
              <Box direction="row" justify="end" margin={{ top: 'medium', bottom: 'meddium' }}>
                <LoadingButton
                  type="submit"
                  reverse
                  loading={loading}
                  primary
                  label={'Actualizar Datos'}
                />
              </Box>
              {error && <ErrorComponent error={error} />}
            </Form>
          </Box>
        )}
      </Mutation>
    );
  }
}

export default EditarEstudio;
