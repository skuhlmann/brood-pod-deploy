import { gql } from "graphql-request";

export const GET_POD_TOKENS = gql`
  {
    podtokens(first: 1000, orderBy: createdAt, orderDirection: desc) {
      id
      createdAt
      tokenId
      uri
      totalClaims
    }
  }
`;

export const GET_POD_TOKEN = gql`
  query podtoken($tokenId: String!) {
    podtoken(id: $tokenId) {
      id
      createdAt
      tokenId
      uri
      totalClaims
      balances(first: 100, orderBy: value, orderDirection: desc) {
        id
        value
        account {
          id
          address
        }
      }
    }
  }
`;

export const GET_POD_TOKENS_FOR_ACCOUNT = gql`
  query account($account: String!) {
    account(id: $account) {
      id
      address
      balances(first: 100, orderBy: value, orderDirection: desc) {
        id
        value
        token {
          id
        }
      }
    }
  }
`;

export const GET_CLAIM_STATUS = gql`
  query claim($id: String!) {
    claim(id: $id) {
      id
      code
    }
  }
`;
