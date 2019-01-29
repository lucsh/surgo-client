import { Mutation } from 'react-apollo';
import React, { Component } from 'react';
import { Box, Form, FormField, Select } from 'grommet/es6';

import { ME_ESTUDIOS, UPDATE_ESTUDIO } from '../../../pages/cuenta/constants';
import TextInput from '../../textInput';
import TextArea from '../../textArea';
import LoadingButton from '../../loadingButton';
import ErrorComponent from '../../error';

class EditarEstudio extends Component {
  render() {
    const { estudio } = this.props;
    console.log('estudio');
    console.log(estudio);
    console.log(estudio);
    const saveEdit = (value, editMe, idUser) => {
      console.log('idUser');
      console.log(idUser);
      //     id: Int!
      //     titulo: String
      //     tipo: String
      //     instituto: String
      //     detalle: String
      //     desde: Date
      //     hasta: Date
      //     duracion_total: String
      //     duracion_unidad: String
      //     estado: String
      //
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
          <Box
            align="center"
            justify="center"
            direction={'row-responsive'}
            gap={'large'}
            pad={'large'}
            width={'large'}
          >
            <Form
              key={this.props.k}
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
              <Box
                align="start"
                direction={'row-responsive'}
                gap={'large'}
                pad={{ vertical: 'xsmall' }}
              >
                <FormField
                  label="TITULO"
                  name="titulo"
                  required
                  width={'medium'}
                  validate={{ regexp: /^[a-z]/i }}
                  style={{ borderBottom: 'solid 1px #888888' }}
                  component={TextInput}
                />
              </Box>
              <Box
                align="start"
                direction={'row-responsive'}
                gap={'large'}
                pad={{ vertical: 'xsmall' }}
              >
                <FormField
                  label="DETALLE"
                  name="detalle"
                  required
                  width={'medium'}
                  validate={{ regexp: /^[a-z]/i }}
                  style={{ borderBottom: 'solid 1px #888888' }}
                  component={TextArea}
                />
              </Box>
              <Box
                align="start"
                direction={'row-responsive'}
                gap={'large'}
                pad={{ vertical: 'xsmall' }}
              >
                <FormField
                  label="INSTITUTO"
                  name="instituto"
                  required
                  width={'medium'}
                  validate={{ regexp: /^[a-z]/i }}
                  style={{ borderBottom: 'solid 1px #888888' }}
                  component={TextInput}
                />
              </Box>
              <Box
                align="start"
                direction={'row-responsive'}
                gap={'large'}
                pad={{ vertical: 'xsmall' }}
              >
                <FormField
                  size={'xsmall'}
                  width={'medium'}

                  label="TIPO DE ESTUDIO"
                  name="tipo"
                  options={['Curso', 'Primario', 'Secundario', 'Terciario', 'Universitario']}
                  required
                  dropHeight={'small'}
                  component={Select}
                  plain
                />
              </Box>
              {/* -- */}
              <Box
                direction="row"
                justify="end"
                margin={{ top: 'medium', bottom: 'meddium' }}
                pad={{ vertical: 'xsmall' }}
              >
                <LoadingButton
                  type="submit"
                  reverse
                  loading={loading}
                  primary
                  label={'Actualizar Estudios'}
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
