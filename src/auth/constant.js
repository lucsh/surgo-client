import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
  mutation register($input: RegisterMutationInput!) {
    register(input: $input) {
      code
      success
      message
      securityCode
    }
  }
`;

export const VERIFICATION_MUTATION = gql`
  mutation verify($input: VerifyMutationInput!) {
    verify(input: $input) {
      code
      success
      message
      token
    }
  }
`;
