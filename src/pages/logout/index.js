import React from 'react';
import { Box, Paragraph } from 'grommet/es6';

import { i, l } from '../../utils/log/index';

// helper paths
import { CLIENT, GENERAL_DESPEDIDA } from '../../constants/a11y';
import history from '../../utils/history'
import { LOGIN_PATH } from '../../constants/BaseConfig'

class Logout extends React.Component {
  constructor(props) {
    super(props);
    i('[EVENT: PROMPT LOGOUT]');
    l(props, 'PROPS', this);
  }

  componentDidMount() {
    localStorage.removeItem('token');
    setTimeout(() => {
      history.push(LOGIN_PATH);
    }, '1500');
  }

  render() {
    l(this.props, 'LOGOUT PROPS', this);

    return (
      <Box alignContent="between" pad="xsmall" full="true" fill={'horizontal'}>
        <Paragraph color="dark-1" alignSelf="center" textAlign="center" size="xlarge">
          {GENERAL_DESPEDIDA}
        </Paragraph>
        <Paragraph alignSelf="center" textAlign="center">
          {CLIENT}
        </Paragraph>
      </Box>
    );
  }
}


export default (Logout);
