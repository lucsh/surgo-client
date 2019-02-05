import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

import { GENERAL_SALUDO, GENERAL_ALERT } from '../constants/a11y';

class General extends React.PureComponent {
  render() {
    return (
      <Box alignContent="between" pad="xsmall" full="true" fill={'horizontal'}>
        <Heading level={3} margin="none" alignSelf="center">
          <strong>{GENERAL_SALUDO}</strong>
        </Heading>
        <Paragraph color="status-critical" alignSelf="center" textAlign="center">
          {GENERAL_ALERT}
        </Paragraph>
      </Box>
    );
  }
}

export default General;
