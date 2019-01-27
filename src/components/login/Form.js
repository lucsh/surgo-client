import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i } from '../../utils/log/index';

import { FormField, Button } from 'grommet';
import TextInput from '../textInput';

class Form extends Component {
  state = {
    email: 'lucasdp@live.com', // FixMe : Cambiar a ''
  };

  onChangeEmail = (event) => this.setState({ email: event.target.value });
  onSubmit = () => {
    console.log('onsubmit');
    this.props
      .mutation({
        variables: { input: { email: this.state.email } },
      })
      .then((response) => {
        i(response.data.register.securityCode);
        this.props.updateParentState('securityCode', response.data.register.securityCode);
        this.props.updateParentState('email', this.state.email);
      });
  };
  render() {
    const { email } = this.state;
    return (
      <React.Fragment>
        <FormField label="E-Mail">
          <TextInput
            borderBottom
            id="email"
            type="text"
            placeholder="Tu correo electronico.."
            value={email}
            onChange={this.onChangeEmail}
          />
        </FormField>
        <Button label="Enviar" onClick={() => this.onSubmit()} />
      </React.Fragment>
    );
  }
}

Form.propTypes = {
  mutation: PropTypes.func.isRequired,
  updateParentState: PropTypes.func.isRequired,
};

export default Form;
