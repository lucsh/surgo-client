import { has } from 'lodash';
import { e } from '../../utils/log';
import React, { Component, Fragment } from 'react';

import { DEFAULT_ERROR } from '../../constants/a11y';

class ErrorComponent extends Component {
  render() {
    const { error } = this.props;
    let errorParsed;
    let errorStackGQL;

    if (error) {
      errorParsed = JSON.parse(JSON.stringify(error));
    }

    if (has(errorParsed, 'graphQLErrors')) {
      errorStackGQL = errorParsed.graphQLErrors[0].message;
    } else {
      errorStackGQL = DEFAULT_ERROR;
    }

    e(errorStackGQL);

    return (
      <Fragment>
        <p>{DEFAULT_ERROR}</p>
      </Fragment>
    );
  }
}

export default ErrorComponent;
