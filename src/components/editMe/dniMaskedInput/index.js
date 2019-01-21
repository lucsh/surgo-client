import React, { Component } from 'react';
import { MaskedInput } from 'grommet/es6/components/MaskedInput';
import { Box, FormField } from 'grommet/es6';

class DniMaskedInput extends Component {
  state = {
    dni: '',
    parsedDni: '',
    cuil: '',
  };

  componentDidMount() {
    const dni = this.props.value.dni;
    const cuil = this.props.value.cuil;
    let parsedDni = dni;
    const parsedDniMatch = dni.match(/\d/g);
    if (parsedDniMatch) {
      parsedDni = parsedDniMatch.join('');
    }
    this.setState({
      dni,
      cuil,
      parsedDni,
    });
  }

  onChangeDNI = (e) => {
    const dni = e.target.value;
    let parsedDni = dni;

    const parsedDniMatch = dni.match(/\d/g);
    if (parsedDniMatch) {
      parsedDni = parsedDniMatch.join('');
    }

    let cuil = this.state.cuil.split('-');
    cuil = `${cuil[0]}-${parsedDni}-${cuil[2]}`;

    this.setState({ dni, cuil });
    this.props.onChange({ value: { dni, cuil } });
  };

  onChangeCUIL = (e) => {
    const dni = this.state.dni;
    const cuil = e.target.value;
    this.setState({ cuil });
    this.props.onChange({ value: { dniCuil: { dni, cuil } } });
  };

  render() {
    return (
      <Box direction="row" align="center" gap="xsmall" pad="none">
        <FormField label="DNI">
          <MaskedInput
            label={'asd'}
            {...this.props}
            value={this.state.dni}
            style={{ borderBottom: 'solid 1px #888888', borderRadius: 0 }}
            onChange={this.onChangeDNI}
            mask={[
              {
                length: [1, 2],
                regexp: /^[0-9]{1,2}$/,
                placeholder: '##',
              },
              { fixed: '.' },
              {
                length: [2, 3],
                regexp: /^[0-9]{1,3}$/,
                placeholder: '###',
              },
              { fixed: '.' },
              {
                length: [3],
                regexp: /^[0-9]{1,3}$/,
                placeholder: '###',
              },
            ]}
          />
        </FormField>
        <FormField
          label="CUIL"
          // required={this.props.require}
        >
          <MaskedInput
            {...this.props}
            value={this.state.cuil}
            style={{ borderBottom: 'solid 1px #888888', borderRadius: 0 }}
            onChange={this.onChangeCUIL}
            mask={[
              {
                length: [1, 2],
                regexp: /^[0-9]{1,2}$/,
                placeholder: '##',
              },
              { fixed: `-${this.state.parsedDni}-` },
              {
                length: [1],
                regexp: /^[0-9]$/,
                placeholder: '#',
              },
            ]}
          />
        </FormField>
      </Box>
    );
  }
}

export default DniMaskedInput;
