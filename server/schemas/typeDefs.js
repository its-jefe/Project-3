const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    userName: String!
    password: String!
    email: String
    Highscores: [userScores]
  }

  type userScores {
    _id: ID
    highscore: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    highscores(_id: ID!): userScores
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
