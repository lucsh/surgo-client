import { Box, Select, Text } from 'grommet/es6';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { PROVINCIAS } from '../../pages/cuenta/constants';
import { l } from '../../utils/log';
import { ME_QUERY } from '../usuario/constants';
import { Q_USUARIO } from '../usuario/a11y';
import ErrorComponent from '../error';

class Input extends Component {
  state = {
    genero: '',
    otro: '',
  };

  const;
  componentDidMount() {
    let { value } = this.props;
    this.setState({
      value,
    });
  }

  onChange = (e) => {
    let value = e.target.value;
    console.log('valor: ', value);
    // TODO cambiar aca
    this.props.onChange({ target: { value } });
    this.setState({
      value,
    });
  };

  render() {
    const { provincia, localidad } = this.props.value;
    return (
      <Query query={PROVINCIAS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Text a11yTitle={Q_USUARIO}>{Q_USUARIO}</Text>;
          }
          if (data && !data.provincias) {
            return <ErrorComponent error={error} />;
          }
          if (!error) {
            return (
              <Select
                size={this.props.size}
                valueKey="id"
                labelKey="nombre"
                options={data.provincias}
                onChange={this.onChange}
                value={provincia}
                plain
              />
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default Input;
