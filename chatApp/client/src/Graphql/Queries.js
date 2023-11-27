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

export const LOGIN_USER = gql`
    query($email: String!, $password: String!){
    login(email: $email, password: $password) {
    username
    email
    token
  }
}
`
