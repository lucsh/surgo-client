import gql from 'graphql-tag';
export const ME_QUERY = gql`
  query {
    me {
      id
      nombre
      email
      roles
    }
  }
`;
