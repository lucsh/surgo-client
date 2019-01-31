import React, { Component } from 'react';
import { Box, Form, FormField, Button } from 'grommet/es6';

import { READ_TRABAJOS } from '../../../pages/cuenta/constants';
import TextInput from '../../textInput';
import TextArea from '../../textArea';
import LoadingButton from '../../loadingButton';
import ErrorComponent from '../../error';
import FechaMaskedInput from '../../fechaMaskedInput';

class EditarTrabajo extends Component {
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
    const { trabajo, mutation, loading, error } = this.props;

    const saveEdit = (value, mutation, idUser) => {
      const data = {
        id: value.id,
        puesto: value.puesto,
        empresa: value.empresa,
        detalle: value.detalle,
        desde: value.desde,
        hasta: value.hasta,
      };
      mutation({
        variables: { data, idUser },
        refetchQueries: [{ query: READ_TRABAJOS, variables: { idUser } }],
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
            id: trabajo.id,
            idUser: trabajo.idUser,
            puesto: trabajo.puesto,
            empresa: trabajo.empresa,
            detalle: trabajo.detalle,
            desde: trabajo.desde,
            hasta: trabajo.hasta,
          }}
        >
          <Box
            align="start"
            direction={'row-responsive'}
            gap={'large'}
            pad={{ vertical: 'xsmall' }}
          >
            <FormField
              label="PUESTO"
              name="puesto"
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
              label="EMPRESA"
              name="empresa"
              required
              width={'small'}
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
              label="DESDE"
              name="desde"
              required
              bounds={['1918-12-31', '2100-12-31']}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={FechaMaskedInput}
            />
            <FormField
              size={'small'}
              label="HASTA"
              name="hasta"
              bounds={['1918-12-31', '2100-12-31']}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={FechaMaskedInput}
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
              label={'Actualizar Trabajos'}
            />
          </Box>
          {error && <ErrorComponent error={error} />}
        </Form>
      </Box>
    );
  }
}

export default EditarTrabajo;
