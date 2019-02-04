import React, { Component } from 'react';
import { MaskedInput } from 'grommet/es6/components/MaskedInput';

class EmailMaskedInput extends Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        style={{ borderBottom: 'none' }}
        mask={[
          {
            regexp: /^[\w\-_.]+$/,
            placeholder: 'ejemplo',
          },
          { fixed: '@' },
          {
            regexp: /^[\w]+$/,
            placeholder: 'servidor',
          },
          { fixed: '.' },
          {
            regexp: /^[\w]+$/,
            placeholder: 'com',
          },
        ]}
      />
    );
  }
}

export default EmailMaskedInput;
