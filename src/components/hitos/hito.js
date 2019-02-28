import React, { Component } from 'react';
import { Box } from 'grommet/es6/components/Box';
import { Button, Form, FormField, Keyboard, Menu, ResponsiveContext, Text } from 'grommet/es6';
import remove from 'lodash/remove';
import find from 'lodash/find';
import moment from 'moment';
import theme from '../../utils/theme/index';
import { More } from 'grommet-icons';
import { Mutation } from 'react-apollo';
import { DELETE_COMENTARIO, READ_HITOS } from '../../pages/persona/constants';
import Comentario from './comentario';
import TextArea from './textAreaComentario';
import SmallButton from '../smallButton';

require('moment/locale/es');

class Hito extends Component {
  state = { showCommentForm: false };

  render() {
    const BRAND_COLOR = theme.global.colors['brand'];

    const eliminar = (value, mutation) => {
      mutation({
        variables: { id: value.id, idUser: value.idUser },
        refetchQueries: [{ query: READ_HITOS, variables: { idUser: value.idUser } }],
      });
    };

    const eliminarComentario = (value, mutation) => {
      mutation({
        variables: { id: value.id, idUser: value.idUser },
        refetchQueries: [{ query: READ_HITOS, variables: { idUser: value.idUser } }],
      });
    };

    const saveComentario = (value) => {
      const data = {
        comentario: value.comentario,
        idHito: this.props.hito.id,
      };
      const idUser = this.props.idUser;
      this.props.createComentario({
        variables: { data, idUser },
        refetchQueries: [{ query: READ_HITOS, variables: { idUser } }],
      });
    };

    const { hito, mutation, idUser } = this.props;
    const createdAt = moment(hito.createdAt).fromNow();

    const { showCommentForm } = this.state;
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            alignContent="start"
            justify="start"
            align="start"
            direction={'column'}
            // pad="medium"
            margin={{ top: '15px' }}
            width="large"
            elevation="xsmall"
          >
            <Box
              alignContent="start"
              justify="start"
              align="start"
              direction={'column'}
              pad="medium"
              // margin={{ top: '15px' }}
              width="large"
              // elevation="xsmall"
            >
              <Box
                align="center"
                justify="between"
                direction={size === 'xsmall' ? 'column' : 'row'}
                width="large"
                gap={'small'}
                pad={'none'}
              >
                <Box direction="row">
                  <Text size={'xsmall'} weight={'normal'} margin={{ right: '5px' }} color={'brand'}>
                    &#11044;{'    '}
                  </Text>
                  <Text size={'small'} pad={'small'}>
                    Fue <span style={{ color: BRAND_COLOR }}>{hito.estado}</span> por{' '}
                    <span style={{ color: BRAND_COLOR }}>{hito.createdBy}</span>
                    <span style={{ color: '#7C8284' }}> · {createdAt}</span>
                  </Text>
                </Box>
                <Box align="end" justify="end">
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
            <Box
              align="center"
              justify="center"
              direction={'row-responsive'}
              background={'#f5f8fa'}
              width={'large'}
              pad={{ vertical: 'xsmall' }}
            >
              {!showCommentForm && (
                <Box
                  align="center"
                  justify={'center'}
                  direction={'row-responsive'}
                  width={'medium'}
                  animation={'fadeIn'}
                  background={'white'}
                  round={'xsmall'}
                >
                  <Button
                    plain
                    onClick={() => this.setState({ showCommentForm: true })}
                    style={{
                      color: '#7C8284',
                      fontSize: '10px',
                    }}
                  >
                    Agregar nuevo comentario o #etiquetas
                  </Button>
                </Box>
              )}
              {showCommentForm && (
                <Box align="start" alignSelf="start">
                  <Box
                    style={{
                      position: 'absolute',
                      zIndex: 101,
                    }}
                    align="center"
                    justify="center"
                    alignSelf="end"
                  >
                    <Button
                      onClick={() => this.setState({ showCommentForm: false })}
                      type="button"
                      plain
                      label="&times;"
                      style={{
                        padding: '18px',
                        color: '#F04953',
                        fontSize: '18px',
                      }}
                    />
                  </Box>
                  <Box
                    align="center"
                    justify={'center'}
                    direction={'row-responsive'}
                    width={'large'}
                    animation={'fadeIn'}
                  >
                    <Form
                      onSubmit={({ value }) => saveComentario(value)}
                      value={{
                        comentario: '',
                      }}
                    >
                      <Keyboard
                        onEsc={() => {
                          this.setState({ showCommentForm: false });
                        }}
                      >
                        <Box align="start" direction={'row-responsive'} gap={'none'}>
                          <FormField
                            label=""
                            name="comentario"
                            required
                            width={'large'}
                            placeholder="Agregar nuevo comentario o #etiquetas"
                            rows="1"
                            component={TextArea}
                          />
                        </Box>
                      </Keyboard>
                      <Box align="end" alignSelf="end" pad={{ horizontal: 'small' }}>
                        <SmallButton type="submit" label="+ Agregar" color="brand" />
                      </Box>
                    </Form>
                  </Box>
                </Box>
              )}
            </Box>
            {hito.comentarios.map((comentario) => (
              <Mutation
                key={comentario.id}
                mutation={DELETE_COMENTARIO}
                update={(cache) => {
                  const { milestones } = cache.readQuery({
                    query: READ_HITOS,
                    variables: { idUser },
                  });
                  const milestone = find(milestones, ['id', hito.id]);
                  remove(milestone.comentarios, { id: comentario.id });
                }}
              >
                {(eliminarComentario, { loading, error }) => (
                  <Comentario
                    idUser={idUser}
                    comentario={comentario}
                    loading={loading}
                    error={error}
                    mutation={eliminarComentario}
                  />
                )}
              </Mutation>
            ))}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default Hito;
