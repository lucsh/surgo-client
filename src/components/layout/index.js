import React, { Component, Fragment } from 'react';

// UI Components
import { Grommet, Box, Grid } from 'grommet';

import theme from '../../utils/theme';

// Common Components
import Header from '../navigation/header';
import Notificacion from '../notificacion';

// Redux
import { connect } from 'react-redux';

// React Router Routes
import Routes from '../../routes';

//helpers
import { ME_QUERY } from './constants';
import { i, l } from '../../utils/log';
import { Query } from 'react-apollo';

const SIDEBAR = false;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: SIDEBAR,
    };
    this.setSidebar = this.setSidebar.bind(this);
  }

  setSidebar() {
    const { sidebar } = this.state;
    this.setState({ sidebar: sidebar });
  }

  render() {
    i('LAYOUT');
    l(this.props, 'props', this);

    // Grid
    // 0-1
    // 1-1
    return (
      <Grommet theme={theme} style={{ margin: '0 auto' }}>
        <Notificacion />
        <Grid
          alignSelf="center"
          rows={['auto', 'medium']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Query query={ME_QUERY}>
            {(respuesta) => {
              // console.info({ me: respuesta.data.me });
              if (respuesta.loading) return <p>Loading...</p>;
              if (respuesta.data && respuesta.data.me === null) {
                respuesta.startPolling(3000);
                return (
                  <Fragment>
                    <Box gridArea="main" justify="center" align="center" full="true">
                      <Routes isLoggedIn={false} />
                    </Box>
                  </Fragment>
                );
              }
              if (!respuesta.error) {
                return (
                  <Fragment>
                    <Header gridArea="header" user={respuesta.data.me} />
                    <Box gridArea="main" justify="start" align="center" full="true">
                      <Routes isLoggedIn={true} user={respuesta.data.me} />
                    </Box>
                  </Fragment>
                );
              }
              return null;
            }}
          </Query>
        </Grid>
      </Grommet>
    );
  }
}

const mapStateToProps = (state) => ({
  // isLoggedIn: state.auth.isLoggedIn,
  showSidebar: state.navigation.showSidebar,
});

export default connect(mapStateToProps)(Layout);
