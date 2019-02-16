import gql from 'graphql-tag';

export const READ_RESUMEN_PERSONA = gql`
  query resumen($idUser: String!) {
    resumen(idUser: $idUser) {
      nombre
      apellido
      estadoCivil
      hijos
      email
      paisOrigen
      edad
      educacionMax
      telefono
      trabajoActual {
        puesto
        empresa
        desde
        hasta
      }
      direccion {
        calle
        numero
        localidad {
          nombre
          codigoPostal
        }
      }
    }
  }
`;

export const CREATE_HITO = gql`
  mutation createMilestone($data: MilestoneInput!, $idUser: String!) {
    createMilestone(data: $data, idUser: $idUser)
  }
`;
export const READ_HITOS = gql`
  query milestones($idUser: String!) {
      milestones(idUser: $idUser) {
      id
      estado
      createdBy
      createdAt
      comentarios {
        id
        comentario
        createdBy
        createdAt
      }
    }
  }
`;
export const DELETE_HITO = gql`
  mutation deleteMilestone($id: Int!, $idUser: String!) {
    deleteMilestone(id: $id, idUser: $idUser)
  }
`;
export const CREATE_COMENTARIO = gql`
  mutation createCommnent($data: CommentInput!, $idUser: String!) {
    createCommnent(data: $data, idUser: $idUser)
  }
`;
export const DELETE_COMENTARIO = gql`
  mutation deleteCommnent($id: Int!, $idUser: String!) {
    deleteCommnent(id: $id, idUser: $idUser)
  }
`;

export const READ_PERSONAL_DATA = gql`
  query personalData($idUser: String!) {
    personalData(idUser: $idUser) {
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
      avatar
    }
  }
`;

export const UPDATE_PERSONAL_DATA = gql`
  mutation updatePersonalData($data: PersonalDataInput!, $idUser: String!) {
    updatePersonalData(data: $data, idUser: $idUser)
  }
`;

export const UPDATE_AVATAR = gql`
  mutation uploadAvatar($file: Upload!, $idUser: String!) {
    uploadAvatar(file: $file, idUser: $idUser)
  }
`;

export const CREATE_ESTUDIO = gql`
  mutation createStudy($data: EstudioInput!, $idUser: String!) {
    createStudy(data: $data, idUser: $idUser)
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

export const UPDATE_ESTUDIO = gql`
  mutation updateStudy($data: EstudioInput!, $idUser: String!) {
    updateStudy(data: $data, idUser: $idUser)
  }
`;

export const DELETE_ESTUDIO = gql`
  mutation deleteStudy($id: Int!, $idUser: String!) {
    deleteStudy(id: $id, idUser: $idUser)
  }
`;

export const CREATE_TRABAJO = gql`
  mutation createJob($data: TrabajoInput!, $idUser: String!) {
    createJob(data: $data, idUser: $idUser)
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

export const UPDATE_TRABAJO = gql`
  mutation updateJob($data: TrabajoInput!, $idUser: String!) {
    updateJob(data: $data, idUser: $idUser)
  }
`;

export const DELETE_TRABAJO = gql`
  mutation deleteJob($id: Int!, $idUser: String!) {
    deleteJob(id: $id, idUser: $idUser)
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

export const UPDATE_DIRECCION = gql`
  mutation updateAddress($data: DireccionInput!, $idUser: String!) {
    updateAddress(data: $data, idUser: $idUser)
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
