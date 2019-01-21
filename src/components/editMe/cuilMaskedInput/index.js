import React, { Component, Fragment } from 'react';
import { MaskedInput } from 'grommet/es6/components/MaskedInput';
import { i } from '../../../utils/log';

class CuilMaskedInput extends Component {
  state = {
    dni: '',
    cuil: '',
  };

  componentDidMount() {
    console.log('mount');
    this.setState({ dni: this.props.value.dni.match(/\d/g).join(''), cuil: this.props.value.cuil });
  }

  onChange = (e) => {
    console.log(e);
    const dni = this.state.dni;
    const cuil = e.target.value;
    this.setState({ cuil });
    this.props.onChange({ value: { dniCuil: { dni, cuil } } });
  };

  render() {
    i('CuilMaskedInput');
    console.log(this.props.value);
    return (
      <MaskedInput
        {...this.props}
        value={this.state.cuil}
        onChange={this.onChange}
        mask={[
          {
            length: [1, 2],
            regexp: /^[0-9]{1,2}$/,
            placeholder: '##',
          },
          { fixed: `-${this.state.dni}-` },
          {
            length: [1],
            regexp: /^[0-9]$/,
            placeholder: '#',
          },
        ]}
      />
    );
  }
}

export default CuilMaskedInput;
