import React, { Component, Fragment } from 'react';
import {
  READ_HITOS,
  CREATE_HITO,
  DELETE_HITO,
  CREATE_COMENTARIO,
  DELETE_COMENTARIO,
} from './constants';
import { Box, Form, FormField } from 'grommet/es6';
import { Query, Mutation } from 'react-apollo';

import { i } from '../../utils/log';

import ErrorComponent from '../../components/error';
import GroupedButtonsSelect from '../../components/groupedButtonsSelect';
import SmallButton from '../../components/smallButton';
import TextArea from '../../components/hitos/textAreaComentario';
import Hito from '../../components/hitos/hito';

class Hitos extends Component {
  render() {
    i('[RENDER : HITOS]');

    const saveHito = (value, createHito, idUser) => {
      const data = {
        comentario: value.estado,
        estado: value.estado,
      };
      createHito({
        variables: { data, idUser },
        refetchQueries: [{ query: READ_HITOS, variables: { idUser } }],
      });
    };

    // TODO: revisar

    const eliminar = (value, mutation) => {
      mutation({
        variables: { id: value.id, idUser: value.idUser },
        refetchQueries: [{ query: READ_HITOS, variables: { idUser: value.idUser } }],
      });
    };

    const idUser = this.props.user.id;
    return (
      <Box align="center" alignSelf="center" width="size" animation="slideLeft">
        <Query query={READ_HITOS} variables={{ idUser }} skip={!idUser}>
          {(respuesta) => {
            if (respuesta.loading) return <p>Cargando...</p>;
            if (respuesta.error || (respuesta.data && respuesta.data.milestones === null)) {
              return <ErrorComponent />;
            }
            if (!respuesta.error) {
              console.log(' < respuesta > ');
              console.log(respuesta);
              console.log(' < respuesta /> ');

              const { milestones } = respuesta.data;

              return (
                <Fragment>
                  {milestones.map((hito) => (
                    <Mutation key={hito.id} mutation={DELETE_HITO}>
                      {(deleteHito, { loading, error }) => (
                        <Hito hito={hito} loading={loading} error={error} mutation={deleteHito} />
                      )}
                    </Mutation>
                  ))}

                  <Mutation mutation={CREATE_HITO}>
                    {(createMilestone, { loading, error }) => (
                      <Box align="start" direction={'row-responsive'} gap={'large'} pad={'large'}>
                        <Form
                          onSubmit={({ value }) =>
                            saveHito(value, createMilestone, this.props.user.id)
                          }
                          value={{
                            estado: '',
                            comentario: '',
                          }}
                        >
                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              size={'small'}
                              label="NUEVO HITO"
                              name="estado"
                              options={['Entrevistado', 'Calificado']}
                              required
                              component={GroupedButtonsSelect}
                              icon
                              plain
                            />
                          </Box>
                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              label="DETALLE"
                              name="detalle"
                              required
                              width={'medium'}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              placeholder="Comentarios, #etiquetas"
                              component={TextArea}
                            />
                          </Box>
                          <Box align="end" alignSelf="end">
                            <SmallButton
                              type="button"
                              label="+ Agregar"
                              onClick={this.handleAgregar}
                              color="brand"
                            />
                          </Box>

                          {error && <ErrorComponent error={error} />}
                        </Form>
                      </Box>
                    )}
                  </Mutation>
                </Fragment>
              );
            }
            return null;
          }}
        </Query>
      </Box>
    );
  }
}

export default Hitos;
