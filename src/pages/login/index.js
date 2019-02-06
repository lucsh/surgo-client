import React from 'react';
import { Mutation } from 'react-apollo';
import { Box, Button, Heading, Paragraph } from 'grommet/es6';

import Form from '../../components/login/Form';
import { i, l } from '../../utils/log/index';
import { REGISTER_MUTATION } from '../../auth/constant';

// helper paths
import { DASHBOARD_PATH } from '../../constants/BaseConfig';
import { A_BACK_BUTTON, BACK_BUTTON } from '../../constants/a11y';

class Login extends React.Component {
  constructor(props) {
    super(props);
    i('[EVENT: PROMPT LOGIN]');
    l(props, 'PROPS', this);
  }

  state = {
    securityCode: null,
    email: null,
    blurred: false,
  };

  componentDidMount() {
    // this.props.isLoggedIn && this.props.history.push({ pathname: DASHBOARD_PATH });
    // window.addEventListener('blur', () => {
    //   i('[EVENT: WINDOW BLURED]');
    //   this.setState({ blurred: true });
    // });
    // window.addEventListener('focus', () => {
    //   i('[EVENT: WINDOW FOCUSED]');
    //   this.props.isLoggedIn && this.props.history.push({ pathname: DASHBOARD_PATH });
    // });
  }

  updateParentState = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const from = { pathname: DASHBOARD_PATH };
    const { securityCode, email } = this.state;
    const { isLoggedIn } = this.props;
    l(this.props, 'LOGIN PROPS', this);

    return (
      <React.Fragment>
        {securityCode && email && (
          <Box alignContent="between" pad="xsmall" full="true" fill={'horizontal'}>
            <Heading level={3} margin="none" alignSelf="center">
              <strong>Esperando Confirmación</strong>
            </Heading>
            <Paragraph alignSelf="center" textAlign="center">
              Por favor, revisá tu casilla de correo y verificá que el codigo sea:
            </Paragraph>
            <Paragraph color="dark-1" alignSelf="center" textAlign="center" size="xlarge">
              {securityCode}
            </Paragraph>
          </Box>
        )}
        {!isLoggedIn && !securityCode && !email && (
          <Mutation mutation={REGISTER_MUTATION}>
            {(mutation) => <Form mutation={mutation} updateParentState={this.updateParentState} />}
          </Mutation>
        )}

        {!isLoggedIn && securityCode && email ? (
          <Paragraph alignSelf="center" textAlign="center">
            <Button
              a11yTitle={A_BACK_BUTTON}
              label={BACK_BUTTON}
              onClick={() => this.props.history.push(from)}
            />
          </Paragraph>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Login;
