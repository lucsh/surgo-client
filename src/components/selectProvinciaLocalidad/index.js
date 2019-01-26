import { Box, Select, Text } from 'grommet/es6';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { PROVINCIAS, LOCALIDADES } from '../../pages/cuenta/constants';
import { Q_GENERIC } from '../usuario/a11y';
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
        {(qProvincias) => {
          if (qProvincias.loading) {
            return <Text a11yTitle={Q_GENERIC}>{Q_GENERIC}</Text>;
          }
          if (qProvincias.data && !qProvincias.data.provincias) {
            return <ErrorComponent error={qProvincias.error} />;
          }
          if (!qProvincias.error) {
            return (
              <Query query={LOCALIDADES} variables={{ provincia: provincia.id }}>
                {(qLocalidades) => {
                  if (qLocalidades.loading) {
                    return <Text a11yTitle={Q_GENERIC}>{Q_GENERIC}</Text>;
                  }
                  if (qLocalidades.data && !qLocalidades.data.localidades) {
                    return <ErrorComponent error={qLocalidades.error} />;
                  }
                  if (!qLocalidades.error) {
                    return (
                      <Box
                        direction="row"
                        basis="full"
                        align="center"
                        justify="between"
                        pad="none"
                        gap={'small'}
                      >
                        <Select
                          size={this.props.size}
                          valueKey="id"
                          labelKey="nombre"
                          options={qProvincias.data.provincias}
                          onChange={this.onChange}
                          value={provincia}
                          plain
                        />
                        <Select
                          size={this.props.size}
                          valueKey="id"
                          labelKey="nombre"
                          options={qLocalidades.data.localidades}
                          onChange={this.onChange}
                          value={localidad}
                          plain
                        />
                      </Box>
                    );
                  }
                  return null;
                }}
              </Query>
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default Input;
