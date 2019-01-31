import React, { Component } from 'react';
import { Box, Form, FormField, Select, Button } from 'grommet/es6';

import { READ_ESTUDIOS } from '../../../pages/cuenta/constants';
import TextInput from '../../textInput';
import TextArea from '../../textArea';
import LoadingButton from '../../loadingButton';
import ErrorComponent from '../../error';
import FechaMaskedInput from '../../fechaMaskedInput';
import GroupedButtonsSelect from '../../groupedButtonsSelect';

class EditarEstudio extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.bottom.scrollIntoView({ behavior: 'smooth' });
  }

  cancelar = () => {
    this.props.updateParentState(this.props.formulario, false);
  };

  render() {
    const { estudio, mutation, loading, error } = this.props;

    const saveEdit = (value, mutation, idUser) => {
      const data = {
        id: value.id,
        titulo: value.titulo,
        tipo: value.tipo,
        instituto: value.instituto,
        detalle: value.detalle,
        desde: value.desde,
        hasta: value.hasta,
        duracionTotal: value.duracionTotal,
        duracionUnidad: value.duracionUnidad,
        estado: value.estado,
      };
      mutation({
        variables: { data, idUser },
        refetchQueries: [{ query: READ_ESTUDIOS, variables: { idUser } }],
      }).then(() => {
        this.props.updateParentState(this.props.formulario, false);
      });
    };

    return (
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
          onSubmit={({ value }) => saveEdit(value, mutation, this.props.user.id)}
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
            estado: estudio.estado,
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
              label="INSTITUTO"
              name="instituto"
              required
              width={'small'}
              validate={{ regexp: /^[a-z]/i }}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={TextInput}
            />

            <FormField
              size={'medium'}
              width={'medium'}
              label="TIPO DE ESTUDIO"
              name="tipo"
              options={['Curso', 'Primario', 'Secundario', 'Terciario', 'Universitario']}
              required
              dropHeight={'medium'}
              component={Select}
              plain
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
              placeholder="Detalle de la carrera, sitio del instituto, etc."
              component={TextArea}
            />
          </Box>
          <Box
            align="start"
            direction={'row-responsive'}
            gap={'large'}
            pad={{ vertical: 'xsmall' }}
            responsive
          >
            <FormField
              size={'small'}
              label="INICIO CURSADA"
              name="desde"
              required
              bounds={['1918-12-31', '2100-12-31']}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={FechaMaskedInput}
            />
            <FormField
              size={'small'}
              label="FIN CURSADA"
              name="hasta"
              bounds={['1918-12-31', '2100-12-31']}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={FechaMaskedInput}
            />
          </Box>
          <Box
            align="start"
            direction={'row-responsive'}
            gap={'large'}
            pad={{ vertical: 'xsmall' }}
          >
            <FormField
              label="DURACION"
              name="duracionTotal"
              required
              width={'xsmall'}
              numeric
              style={{ borderBottom: 'solid 1px #888888' }}
              component={TextInput}
            />

            <FormField
              size={'medium'}
              width={'xsmall'}
              label="UNIDAD"
              name="duracionUnidad"
              options={['Años', 'Meses', 'Horas']}
              required
              dropHeight={'medium'}
              component={Select}
              plain
            />
            <FormField
              size={'small'}
              label="ESTADO"
              name="estado"
              options={['Terminado', 'Inconcluso']}
              required
              icon
              component={GroupedButtonsSelect}
              plain
            />
          </Box>
          {/* -- */}
          <div
            ref={(bottom) => {
              this.bottom = bottom;
            }}
          />
          <Box
            direction="row"
            justify="between"
            margin={{ top: 'medium', bottom: 'meddium' }}
            pad={{ vertical: 'xsmall' }}
          >
            <Button type="reset" label={'Cancelar'} onClick={this.cancelar} />
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
    );
  }
}

export default EditarEstudio;
