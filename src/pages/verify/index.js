import React, { Component } from 'react';
import Mutation from 'react-apollo/Mutation';

import { VERIFICATION_MUTATION } from '../../auth/constant';
import VerificationMessage from '../../components/verify/VerificationMessage';
import { DASHBOARD_PATH } from '../../constants/BaseConfig';

class Verify extends Component {
  state = {
    confirmed: false,
  };
  render() {
    const { email, verificationToken } = this.props.match.params;
    const { isLoggedIn } = this.props;
    isLoggedIn && this.props.history.push({ pathname: DASHBOARD_PATH });
    return (
      <Mutation
        mutation={VERIFICATION_MUTATION}
        variables={{ input: { email, verificationToken } }}
        pollInterval={3000}
        fetchPolicy="no-cache"
        onCompleted={(data) => {
          const { token } = data.verify;
          if (token) {
            localStorage.setItem('token', token);
            this.setState({
              confirmed: true,
            });
          }
        }}
      >
        {(verify, { data, loading, error }) => (
          <div>
            {loading && 'loading'}
            {error && error}
            <VerificationMessage
              submitToConnector={verify}
              data={data}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

export default Verify;
