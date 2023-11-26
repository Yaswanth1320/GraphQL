import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $confirmpassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmpassword: $confirmpassword
    ) {
      username
      email
      createdAt
    }
  }
`;
