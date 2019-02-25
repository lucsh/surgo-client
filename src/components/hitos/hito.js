import React, { Component, Fragment } from 'react';
import { Box } from 'grommet/es6/components/Box';
import { Menu, ResponsiveContext, Text } from 'grommet/es6';
import moment from 'moment';
import theme from '../../utils/theme/index';
import { More } from 'grommet-icons';
import { READ_TRABAJOS } from '../../pages/cuenta/constants';
import { Mutation } from 'react-apollo';
import { DELETE_COMENTARIO } from '../../pages/persona/constants';
import Comentario from './comentario';

class Hito extends Component {
  render() {
    const BRAND_COLOR = theme.global.colors['brand'];

    const eliminar = (value, mutation) => {
      mutation({
        variables: { id: value.id, idUser: value.idUser },
        refetchQueries: [{ query: READ_TRABAJOS, variables: { idUser: value.idUser } }],
      });
    };

    const eliminarComentario = (value, mutation) => {
      mutation({
        variables: { id: value.id, idUser: value.idUser },
        refetchQueries: [{ query: READ_TRABAJOS, variables: { idUser: value.idUser } }],
      });
    };

    const { hito, mutation } = this.props;
    const createdAt = moment(hito.createdAt).fromNow();

    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Fragment>
            <Box
              alignContent="start"
              justify="start"
              align="start"
              direction={'column'}
              pad="medium"
              margin={{ top: '15px' }}
              width="large"
              elevation="small"
            >
              <Box
                align="start"
                justify="between"
                direction={size === 'xsmall' ? 'column' : 'row'}
                width="large"
                gap={'small'}
                pad={'none'}
              >
                <Box direction="row">
                  <Text
                    size={'xsmall'}
                    weight={'normal'}
                    margin={{ right: '5px', top: '2px' }}
                    color={BRAND_COLOR}
                  >
                    &#11044;{'    '}
                  </Text>
                  <Text size={'small'} weight={'bold'} pad={'small'}>
                    {hito.estado}
                  </Text>
                </Box>
                <Box
                  align="start"
                  direction={size === 'xsmall' ? 'column' : 'row'}
                  gap={'none'}
                  pad={'none'}
                  justify={size === 'xsmall' ? 'start' : 'end'}
                  width={size === 'xsmall' ? 'small' : 'medium'}
                >
                  <Text size={'xsmall'} weight={'bold'} color={'#7C8284'}>
                    {hito.createdby} {createdAt}
                  </Text>
                  <Menu
                    alignSelf={'end'}
                    size="small"
                    icon={<More size="small" />}
                    items={[
                      {
                        label: 'Eliminar',
                        onClick: () => {
                          eliminar(hito, mutation);
                        },
                      },
                    ]}
                  />
                </Box>
              </Box>
            </Box>
              {hito.comentarios.map((comentario) => (
                <Mutation key={comentario.id} mutation={DELETE_COMENTARIO}>
                  {(deleteHito, { loading, error }) => (
                    <Comentario
                      comentario={comentario}
                      loading={loading}
                      error={error}
                      mutation={eliminarComentario}
                    />
                  )}
                </Mutation>
              ))}
          </Fragment>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default Hito;
