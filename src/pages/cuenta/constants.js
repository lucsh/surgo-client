import gql from 'graphql-tag';
export const ME_DATA = gql`
  query {
    meData {
      idUser
      nombre
      apellido
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
