import React, { Component, Fragment } from 'react';
import { READ_ME_DATA, UPDATE_AVATAR, UPDATE_ME } from './constants';
import { Box, Form, FormField } from 'grommet/es6';
import { Query, Mutation } from 'react-apollo';
import Avatar from 'react-avatar-edit';

import { i, l } from '../../utils/log';
import { base64ToImage } from './helpers/avatar';

import ErrorComponent from '../../components/error';
import LoadingButton from '../../components/loadingButton';
import DniMaskedInput from '../../components/editMe/dniMaskedInput';
import EmailMaskedInput from '../../components/editMe/emailMaskedInput';
import CheckBox from '../../components/checkBox';
import TextInput from '../../components/textInput';
import FechaNacimientoMaskedInput from '../../components/fechaMaskedInput';
import GroupedButtonsSelect from '../../components/groupedButtonsSelect';
import GeneroSelect from '../../components/editMe/generoSelect';

class Personales extends Component {
  state = {
    preview: null,
  };
  render() {
    i('[RENDER : PERSONALES]');

    const saveEdit = (value, editMe, idUser) => {
      const data = {
        nombre: value.nombre,
        apellido: value.apellido,

        estadoCivil: value.estadoCivil,
        hijos: value.hijos,

        genero: value.genero.select,
        generoMas: value.genero.otro,

        paisOrigen: value.paisOrigen,
        fechaNacimiento: value.fechaNacimiento,
        educacionMax: value.educacionMax,
        profesion: value.profesion,
        telefono: value.telefono,

        dni: value.dniCuil.dni,
        cuil: value.dniCuil.cuil,

        tieneLicencia: value.tieneLicencia.checked,
      };
      editMe({ variables: { data, idUser }, refetchQueries: [{ query: READ_ME_DATA }] });
    };

    const onCropAvatar = (preview) => {
      console.log(preview);
      this.setState({ preview });
    };

    const onCloseAvatar = () => {
      this.setState({ preview: null });
    };

    const uploadAvatarHandler = () => {
      console.log(this.state.preview);
    };

    return (
      <Box align="center" alignSelf="center" width="large">
        <Query query={READ_ME_DATA}>
          {(respuesta) => {
            if (respuesta.loading) return <p>Cargando...</p>;
            if (respuesta.data && respuesta.data.meData === null) {
              return <ErrorComponent />;
            }
            if (!respuesta.error) {
              l(respuesta.data.meData, 'me data');
              const { meData } = respuesta.data;
              // this.setState({ meData });
              return (
                <Fragment>
                  <Mutation mutation={UPDATE_AVATAR}>
                    {(uploadFile, { loading }) => (
                      <Box
                        align="center"
                        direction={'row-responsive'}
                        alignSelf="center"
                        width="xlarge"
                      >
                        <Avatar
                          label="Seleecioná una foto"
                          width={190}
                          height={190}
                          onCrop={onCropAvatar}
                          onClose={onCloseAvatar}
                        />
                        <img
                          alt=""
                          style={{ width: '150px', height: '150px' }}
                          src={this.state.preview}
                        />
                        <Box
                          direction="row"
                          justify="end"
                          margin={{ top: 'medium', bottom: 'meddium' }}
                          pad={{ vertical: 'xsmall' }}
                        >
                          <LoadingButton
                            type="submit"
                            reverse
                            loading={loading}
                            primary
                            label={'Cambiar imagen de perfil'}
                            onClick={() =>
                              uploadFile({
                                variables: {
                                  file: base64ToImage(this.state.preview),
                                  idUser: meData.idUser,
                                },
                              })
                            }
                          />
                        </Box>
                      </Box>
                    )}
                  </Mutation>
                  <Mutation mutation={UPDATE_ME}>
                    {(editMe, { loading, error }) => (
                      <Box align="center" direction={'row-responsive'} gap={'large'}>
                        <Form
                          onSubmit={({ value }) => saveEdit(value, editMe, meData.idUser)}
                          value={{
                            apellido: meData.apellido,
                            nombre: meData.nombre,
                            dniCuil: {
                              dni: meData.dni,
                              cuil: meData.cuil,
                            },

                            estadoCivil: meData.estadoCivil,
                            hijos: meData.hijos,

                            email: meData.email,
                            educacionMax: meData.educacionMax,
                            fechaNacimiento: meData.fechaNacimiento,
                            genero: {
                              select: meData.genero,
                              otro: meData.generoMas,
                            },
                            paisOrigen: meData.paisOrigen,
                            profesion: meData.profesion,
                            telefono: meData.telefono,
                            tieneLicencia: { checked: meData.tieneLicencia },
                          }}
                        >
                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              label="APELLIDO"
                              name="apellido"
                              required
                              validate={{ regexp: /^[a-z]/i }}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={TextInput}
                            />

                            <FormField
                              label="NOMBRE"
                              name="nombre"
                              required
                              validate={{ regexp: /^[a-z]/i }}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={TextInput}
                            />
                          </Box>
                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              size={'small'}
                              label="PAIS ORIGEN"
                              name="paisOrigen"
                              required
                              validate={{ regexp: /^[a-z]/i }}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={TextInput}
                            />
                          </Box>
                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              size={'small'}
                              label="ESTADO CIVIL"
                              name="estadoCivil"
                              options={['Casado', 'Soltero', 'Viudo', 'Divorciado']}
                              required
                              component={GroupedButtonsSelect}
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
                              size={'small'}
                              label="HIJOS"
                              name="hijos"
                              required
                              numeric
                              validate={{ regexp: /^[0-9]/i }}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={TextInput}
                            />
                          </Box>
                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              size={'small'}
                              label="GENERO"
                              name="genero"
                              options={['Masculino', 'Femenino', 'Otro']}
                              // required
                              component={GeneroSelect}
                            />
                          </Box>
                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                            responsive
                          >
                            <FormField
                              size={'small'}
                              label="FECHA DE NACIMIENTO"
                              name="fechaNacimiento"
                              required
                              bounds={['1918-12-31', '2010-12-31']}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={FechaNacimientoMaskedInput}
                            />
                            <FormField
                              size={'small'}
                              name="dniCuil"
                              component={DniMaskedInput}
                              responsive
                            />
                          </Box>

                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              size={'small'}
                              label="PROFESION"
                              name="profesion"
                              required
                              validate={{ regexp: /^[a-z]/i }}
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={TextInput}
                            />
                            <FormField
                              size={'small'}
                              label={'POSEE LICENCIA?'}
                              etiqueta="LICENCIA DE CONDUCIR"
                              name="tieneLicencia"
                              toggle
                              component={CheckBox}
                            />
                          </Box>

                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              size={'small'}
                              label="EMAIL"
                              name="email"
                              value={meData.email} // not editable
                              required
                              style={{ borderBottom: 'solid 1px #888888' }}
                              component={EmailMaskedInput}
                            />

                            <FormField
                              // error="string | React.ReactNode"
                              size={'small'}
                              label="TELEFONO"
                              name="telefono"
                              required
                              borderBottom
                              validate={{ regexp: /^[0-9]/i }}
                              component={TextInput}
                            />
                          </Box>

                          <Box
                            align="start"
                            direction={'row-responsive'}
                            gap={'large'}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <FormField
                              size={'small'}
                              label="NIVEL DE ESTUDIO"
                              name="educacionMax"
                              options={['Primario', 'Secundario', 'Terciario', 'Universitario']}
                              required
                              component={GroupedButtonsSelect}
                              plain
                            />
                          </Box>

                          <Box
                            direction="row"
                            justify="end"
                            margin={{ top: 'medium', bottom: 'meddium' }}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <LoadingButton
                              type="submit"
                              reverse
                              loading={loading}
                              primary
                              label={'Actualizar Datos'}
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

export default Personales;
