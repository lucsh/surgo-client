import { Box, Text } from 'grommet/es6';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { PROVINCIAS, LOCALIDADES } from '../../pages/cuenta/constants';
import { Q_GENERIC } from '../usuario/a11y';
import ErrorComponent from '../error';
import SelectWithSearch from '../selectWithSearch';

class Input extends Component {
  componentDidMount() {
    let { value } = this.props;
    this.setState({
      value,
    });
  }

  onChangeProvincia = (e) => {
    let provincia = e.option;

    //limpio la localidad
    const localidad = {};
    const value = { localidad, provincia };
    this.props.onChange({ value });
    this.setState({
      value,
    });
  };

  onChangeLocalidad = (e) => {
    let localidad = e.option;
    const { provincia } = this.state.value;
    const value = { localidad, provincia };
    this.props.onChange({ value });
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
                    let provincias = qProvincias.data.provincias;
                    return (
                      <Box
                        direction="row"
                        basis="full"
                        align="center"
                        justify="between"
                        pad="none"
                        gap={'small'}
                      >
                        <SelectWithSearch
                          size={this.props.size}
                          valueKey="id"
                          labelKey="nombre"
                          options={provincias}
                          onChange={this.onChangeProvincia}
                          value={provincia}
                          plain
                        />
                        <SelectWithSearch
                          size={this.props.size}
                          valueKey="id"
                          labelKey="nombre"
                          options={qLocalidades.data.localidades}
                          onChange={this.onChangeLocalidad}
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
