import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i, l } from '../../../utils/log/index';

import { FormField, Button, Box } from 'grommet';
import TextInput from '../../textInput';
import GeneroSelect from '../generoSelect';
import FechaNacimientoMaskedInput from '../fechaNacimientoMaskedInput';
import DniMaskedInput from '../dniMaskedInput';
import CheckBox from '../../checkBox';
import EmailMaskedInput from '../emailMaskedInput';
import GroupedButtonsSelect from '../../groupedButtonsSelect';

class Form extends Component {
  saveEdit = (value) => {
    i('on submit');
    console.log(value);
    this.props.mutation({
      variables: { input: { email: this.state.email } },
    });
  };
  render() {
    console.log(this.props);
    const { meData } = this.props;
    l(meData, 'ME FUCKING DATA', this);
    return (
      <Box align="start" direction={'row-responsive'} gap={'large'} pad={'large'}>
        <Form
          // onSubmit={({ value }) => this.saveEdit(value)}
          value={{
            apellido: meData.apellido,
            nombre: meData.nombre,
            dniCuil: {
              dni: meData.dni,
              cuil: meData.cuil,
            },
            email: meData.email,
            educacionMax: meData.educacionMax,
            fechaNacimiento: meData.fechaNacimiento,
            genero: {
              select: meData.genero,
              otro: meData.generoMas,
            },
            paisOrigen: meData.paisOrigen,
            profesion: meData.profesion,
            telefono: meData.telefono,
            tieneLicencia: meData.tieneLicencia,
          }}
        >
          <Box align="start" direction={'row-responsive'} gap={'large'}>
            <FormField
              label="APELLIDO"
              name="apellido"
              required
              validate={{ regexp: /^[a-z]/i }}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={TextInput}
            />

            <FormField
              label="NOMBRE"
              name="nombre"
              required
              validate={{ regexp: /^[a-z]/i }}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={TextInput}
            />
          </Box>
          <Box align="start" direction={'row-responsive'} gap={'large'}>
            <FormField
              size={'small'}
              label="PAIS ORIGEN"
              name="paisOrigen"
              required
              validate={{ regexp: /^[a-z]/i }}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={TextInput}
            />
          </Box>
          <Box align="start" direction={'row-responsive'} gap={'large'}>
            <FormField
              size={'small'}
              label="GENERO"
              name="genero"
              options={['Masculino', 'Femenino', 'Otro']}
              // required
              component={GeneroSelect}
            />
          </Box>
          <Box align="start" direction={'row-responsive'} gap={'large'} responsive>
            <FormField
              size={'small'}
              label="FECHA DE NACIMIENTO"
              name="fechaNacimiento"
              required
              bounds={['1918-12-31', '2010-12-31']}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={FechaNacimientoMaskedInput}
            />
            <FormField size={'small'} name="dniCuil" component={DniMaskedInput} responsive />
          </Box>

          <Box align="start" direction={'row-responsive'} gap={'large'}>
            <FormField
              size={'small'}
              label="PROFESION"
              name="profesion"
              required
              validate={{ regexp: /^[a-z]/i }}
              style={{ borderBottom: 'solid 1px #888888' }}
              component={TextInput}
            />
            <FormField
              size={'small'}
              label={'POSEE LICENCIA?'}
              etiqueta="LICENCIA DE CONDUCIR"
              name="tieneLicencia"
              toggle
              component={CheckBox}
            />
          </Box>

          <Box align="start" direction={'row-responsive'} gap={'large'}>
            <FormField
              size={'small'}
              label="EMAIL"
              name="email"
              value={meData.email} // not editable
              required
              style={{ borderBottom: 'solid 1px #888888' }}
              component={EmailMaskedInput}
            />

            <FormField
              size={'small'}
              label="TELEFONO"
              name="telefono"
              required
              borderBottom
              validate={{ regexp: /^[0-9]/i }}
              component={TextInput}
            />
          </Box>

          <Box align="start" direction={'row-responsive'} gap={'large'}>
            <FormField
              size={'small'}
              label="NIVEL DE ESTUDIO"
              name="educacionMax"
              options={['Primario', 'Secundario', 'Terciario', 'Universitario']}
              required
              component={GroupedButtonsSelect}
              plain
            />
          </Box>

          <Box direction="row" justify="end" margin={{ top: 'medium', bottom: 'meddium' }}>
            <Button type="submit" label="Actualizar Datos" primary />
          </Box>
        </Form>
      </Box>
    );
  }
}

Form.propTypes = {
  mutation: PropTypes.func.isRequired,
  // updateParentState: PropTypes.func.isRequired,
};

export default Form;
