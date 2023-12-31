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
  query ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      email
      token
    }
  }
`;
export const GET_USERS = gql`
  query {
    getUsers {
      email
      username
      createdAt
      imageUrl
      latestMessage {
        from
        to
        content
        createdAt
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query ($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
      reactions{
        uuid
        content
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation ($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;

export const REACT_TO_MESSAGE = gql`
  mutation($uuid: String!, $content: String!){
  reactToMessage(uuid: $uuid, content: $content) {
    uuid
    content
    createdAt
  }
}
`
