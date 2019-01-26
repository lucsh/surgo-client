import gql from 'graphql-tag';

export const ME_DATA = gql`
  query {
    meData {
      idUser
      nombre
      apellido
      estadoCivil
      hijos
      email
      genero
      generoMas
      paisOrigen
      fechaNacimiento
      edad
      educacionMax
      profesion
      dni
      telefono
      cuil
      tieneLicencia
    }
  }
`;

export const UPDATE_ME = gql`
  mutation updateMe($data: UserDataInput!, $idUser: String!) {
    updateUserData(data: $data, idUser: $idUser)
  }
`;

export const ME_DIRECCION = gql`
  query address($idUser: String!) {
    address(idUser: $idUser) {
      calle
      numero
      observaciones
      localidad {
        id
        nombre
        codigoPostal
      }
      provincia {
        id
        nombre
      }
    }
  }
`;

export const LOCALIDADES = gql`
  query localidades($provincia: String!) {
    localidades(provincia: $provincia) {
      id
      nombre
    }
  }
`;
export const PROVINCIAS = gql`
  query {
    provincias {
      id
      nombre
    }
  }
`;

export const UPDATE_DIRECCION = gql`
  mutation updateAddress($data: UserDataInput!, $idUser: String!) {
    updateAddress(data: $data, idUser: $idUser)
  }
`;
