import React, { Component } from 'react';
import ErrorComponent from '../error/index';
import { Box, Heading, Paragraph } from 'grommet';

class VerificationMessage extends Component {
  componentDidMount() {
    const { submitToConnector } = this.props;
    submitToConnector();
  }
  render() {
    const { loading, error, data } = this.props;
    if (loading) {
      return <div>cargando..</div>;
    }

    if (error) {
      console.error(error);
      return <ErrorComponent />;
    }
    return (
      <Box alignContent="between" pad="xsmall" full="true" fill={'horizontal'}>
        <Heading level={3} margin="none" alignSelf="center">
          <strong>
            {data && data.verify && data.verify.success ? '¡Correcto!' : 'Un momento...'}
          </strong>
        </Heading>
        <Paragraph alignSelf="center" textAlign="center">
          {data && data.verify && data.verify.message}
        </Paragraph>
      </Box>
    );
  }
}

export default VerificationMessage;
