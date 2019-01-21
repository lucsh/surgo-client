import PropTypes from 'prop-types';
import ErrorComponent from '../../error';
import { withApollo, Query } from 'react-apollo';
import React, { Component } from 'react';

import { Text } from 'grommet';
import { ME_QUERY } from '../constants';
import { Q_USUARIO } from '../a11y';

class QueryUsuario extends Component {
  render() {
    const { component: Component } = this.props;
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Text a11yTitle={Q_USUARIO}>{Q_USUARIO}</Text>;
          }
          if (data && !data.me) {
            return <ErrorComponent error={error} />;
          }
          return <Component data={data} />;
        }}
      </Query>
    );
  }
}

QueryUsuario.propTypes = {
  component: PropTypes.func.isRequired,
};

export default withApollo(QueryUsuario);
