import React, { Component, Fragment } from 'react';

// UI Components
import { Grommet, Box, Grid } from 'grommet';

import theme from '../../utils/theme';

// Common Components
import Header from '../navigation/header';
import Sidebar from '../navigation/sidebar';
import Notification from '../notification';

// Redux
import { connect } from 'react-redux';

// React Router Routes
import Routes from '../../routes';

//helpers
import { ME_QUERY } from './constants';
import { i, l } from '../../utils/log';
import { Query } from 'react-apollo';

class Layout extends Component {
  constructor(props) {
    super(props);
    console.log('*!*!*!**!**!');
    console.log(props);
    console.log(Grommet);
    this.state = {
      sidebar: true,
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
    const { showSidebar } = this.props;

    let SidebarComponent;
    let HeaderComponent;

    HeaderComponent = <Header setSidebar={this.setSidebar} />;
    SidebarComponent = showSidebar && <Sidebar />;

    // Grid
    // 0-1
    // 1-1
    return (
      <Grommet theme={theme} style={{ margin: '0 auto' }}>
        <Notification />
        <Grid
          rows={['auto', 'medium']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
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
                    {HeaderComponent}
                    {SidebarComponent}
                    <Box gridArea="main" justify="start" align="start" full="true">
                      <Routes isLoggedIn={true} />
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
