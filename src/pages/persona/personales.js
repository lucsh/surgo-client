import React, { Component, Fragment } from 'react';
import { READ_PERSONAL_DATA, UPDATE_AVATAR, UPDATE_PERSONAL_DATA } from './constants';
import { Box, Form, FormField, ResponsiveContext } from 'grommet/es6';
import { Query, Mutation } from 'react-apollo';
import { Image } from 'grommet-icons';

import { i, l } from '../../utils/log';

import ErrorComponent from '../../components/error';
import UpdateAvatar from '../../components/personales/avatar/update';
import LoadingButton from '../../components/loadingButton';
import DniMaskedInput from '../../components/personales/dniMaskedInput';
import EmailMaskedInput from '../../components/personales/emailMaskedInput';
import CheckBox from '../../components/checkBox';
import TextInput from '../../components/textInput';
import FechaNacimientoMaskedInput from '../../components/fechaMaskedInput';
import GroupedButtonsSelect from '../../components/groupedButtonsSelect';
import GeneroSelect from '../../components/personales/generoSelect';
import theme from '../../utils/theme';

const BRAND_COLOR = theme.global.colors['brand'];

class Personales extends Component {
  constructor() {
    super();
    this.state = {
      mostrarUploadAvatar: false,
    };
    this.updateParentState = this.updateParentState.bind(this);
  }

  updateParentState(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    i('[RENDER : PERSONALES]');
    const handleAvatarClick = () => {
      this.setState({
        mostrarUploadAvatar: true,
      });
    };

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
      editMe({
        variables: { data, idUser },
        refetchQueries: [{ query: READ_PERSONAL_DATA, variables: { idUser } }],
      });
    };

    const { mostrarUploadAvatar } = this.state;
    const idUser = this.props.user.id;

    return (
      <Box align="center" alignSelf="center" direction="row-responsive" animation="slideLeft">
        <ResponsiveContext.Consumer>
          {(size) => {
            let width = 'large';
            switch (size) {
              case 'xsmall':
                width = 'small';
                break;
              case 'small':
                width = 'medium';
                break;
              default:
                break;
            }
            return (
              <Query query={READ_PERSONAL_DATA} variables={{ idUser }}>
                {(respuesta) => {
                  if (respuesta.loading) return <p>Cargando...</p>;
                  if (respuesta.data && respuesta.data.personalData === null) {
                    return <ErrorComponent />;
                  }
                  if (!respuesta.error) {
                    l(respuesta.data, 'me data');
                    const { personalData } = respuesta.data;
                    return (
                      <Fragment>
                        {mostrarUploadAvatar && (
                          <Mutation mutation={UPDATE_AVATAR}>
                            {(uploadFile, { loading, error }) => (
                              <UpdateAvatar
                                updateParentState={this.updateParentState}
                                idUser={personalData.idUser}
                                mutation={uploadFile}
                                loading={loading}
                                error={error}
                                queryToRefetch={{
                                  query: READ_PERSONAL_DATA,
                                  variables: { idUser },
                                }}
                                avatar={personalData.avatar}
                              />
                            )}
                          </Mutation>
                        )}
                        <Mutation mutation={UPDATE_PERSONAL_DATA}>
                          {(editMe, { loading, error }) => (
                            <Box
                              align="center"
                              direction={'row-responsive'}
                              gap={'large'}
                              width={width}
                              justify="center"
                            >
                              <Form
                                onSubmit={({ value }) =>
                                  saveEdit(value, editMe, personalData.idUser)
                                }
                                value={{
                                  apellido: personalData.apellido,
                                  nombre: personalData.nombre,
                                  dniCuil: {
                                    dni: personalData.dni,
                                    cuil: personalData.cuil,
                                  },

                                  estadoCivil: personalData.estadoCivil,
                                  hijos: personalData.hijos,

                                  email: personalData.email,
                                  educacionMax: personalData.educacionMax,
                                  fechaNacimiento: personalData.fechaNacimiento,
                                  genero: {
                                    select: personalData.genero,
                                    otro: personalData.generoMas,
                                  },
                                  paisOrigen: personalData.paisOrigen,
                                  profesion: personalData.profesion,
                                  telefono: personalData.telefono,
                                  tieneLicencia: { checked: personalData.tieneLicencia },
                                }}
                              >
                                <Box
                                  align="start"
                                  direction={'row-responsive'}
                                  gap={'large'}
                                  pad={{ vertical: 'xsmall', horizontal: 'none' }}
                                >
                                  <Box align="start" gap="small">
                                    <div
                                      className={'avatar-box animado'}
                                      onClick={handleAvatarClick}
                                    >
                                      <img
                                        alt="Foto de perfil"
                                        className={'avatar '}
                                        src={personalData.avatar}
                                      />
                                      <div className="overlay animado">
                                        <Image color={BRAND_COLOR} size="large" />
                                        <span>Cambiar Imagen</span>
                                      </div>
                                    </div>
                                  </Box>
                                  <Box direction={'column'}>
                                    <Box direction={'row-responsive'} gap="small">
                                      <FormField
                                        label="APELLIDO"
                                        name="apellido"
                                        required
                                        validate={{ regexp: /^[a-z]/i }}
                                        style={{
                                          borderBottom: 'solid 1px #888888',
                                          // alignSelf: 'flex-end',
                                        }}
                                        component={TextInput}
                                      />

                                      <FormField
                                        label="NOMBRE"
                                        name="nombre"
                                        required
                                        validate={{ regexp: /^[a-z]/i }}
                                        style={{
                                          borderBottom: 'solid 1px #888888',
                                          // alignSelf: 'flex-end',
                                        }}
                                        component={TextInput}
                                      />
                                    </Box>
                                    <FormField
                                      size={'small'}
                                      name="dniCuil"
                                      component={DniMaskedInput}
                                      responsive
                                    />
                                  </Box>
                                </Box>
                                <Box
                                  align="center"
                                  direction={'row-responsive'}
                                  gap={'large'}
                                  pad={{ vertical: 'xsmall', horizontal: width }}
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
                                  pad={{ vertical: 'xsmall', horizontal: width }}
                                >
                                  <FormField
                                    size={'small'}
                                    label="ESTADO CIVIL"
                                    name="estadoCivil"
                                    options={['Casado', 'Soltero', 'Viudo', 'Divorciado']}
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
                                  pad={{ vertical: 'xsmall', horizontal: width }}
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
                                  pad={{ vertical: 'xsmall', horizontal: width }}
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
                                </Box>

                                <Box
                                  align="start"
                                  direction={'row-responsive'}
                                  gap={'large'}
                                  pad={{ vertical: 'xsmall', horizontal: width }}
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
                                  pad={{ vertical: 'xsmall', horizontal: width }}
                                >
                                  <FormField
                                    size={'small'}
                                    label="EMAIL"
                                    name="email"
                                    value={personalData.email} // not editable
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
                                  pad={{ vertical: 'xsmall', horizontal: width }}
                                >
                                  <FormField
                                    size={'small'}
                                    label="NIVEL DE ESTUDIO"
                                    name="educacionMax"
                                    options={[
                                      'Primario',
                                      'Secundario',
                                      'Terciario',
                                      'Universitario',
                                    ]}
                                    required
                                    component={GroupedButtonsSelect}
                                    icon
                                    plain
                                  />
                                </Box>

                                <Box
                                  direction="row"
                                  justify="end"
                                  margin={{ top: 'medium', bottom: 'meddium' }}
                                  pad={{ vertical: 'xsmall', horizontal: width }}
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
            );
          }}
        </ResponsiveContext.Consumer>
      </Box>
    );
  }
}

export default Personales;
