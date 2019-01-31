import gql from 'graphql-tag';

export const READ_ME_DATA = gql`
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

export const READ_ESTUDIOS = gql`
  query studies($idUser: String!) {
    studies(idUser: $idUser) {
      id
      idUser
      titulo
      tipo
      instituto
      detalle
      desde
      hasta
      duracionTotal
      duracionUnidad
      estado
    }
  }
`;

export const CREATE_ESTUDIO = gql`
  mutation createStudy($data: EstudioInput!, $idUser: String!) {
    createStudy(data: $data, idUser: $idUser)
  }
`;

export const DELETE_ESTUDIO = gql`
  mutation deleteStudy($id: Int!, $idUser: String!) {
    deleteStudy(id: $id, idUser: $idUser)
  }
`;

export const UPDATE_ESTUDIO = gql`
  mutation updateStudy($data: EstudioInput!, $idUser: String!) {
    updateStudy(data: $data, idUser: $idUser)
  }
`;
export const READ_TRABAJOS = gql`
  query jobs($idUser: String!) {
    jobs(idUser: $idUser) {
      id
      idUser
      puesto
      empresa
      detalle
      desde
      hasta
      duracion
    }
  }
`;

export const CREATE_TRABAJO = gql`
  mutation createJob($data: TrabajoInput!, $idUser: String!) {
    createJob(data: $data, idUser: $idUser)
  }
`;

export const DELETE_TRABAJO = gql`
  mutation deleteJob($id: Int!, $idUser: String!) {
    deleteJob(id: $id, idUser: $idUser)
  }
`;

export const UPDATE_TRABAJO = gql`
  mutation updateJob($data: TrabajoInput!, $idUser: String!) {
    updateJob(data: $data, idUser: $idUser)
  }
`;

export const UPDATE_ME = gql`
  mutation updateMe($data: UserDataInput!, $idUser: String!) {
    updateUserData(data: $data, idUser: $idUser)
  }
`;

export const READ_DIRECCION = gql`
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
  query localidades($provincia: Int!) {
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
  mutation updateAddress($data: DireccionInput!, $idUser: String!) {
    updateAddress(data: $data, idUser: $idUser)
  }
`;
