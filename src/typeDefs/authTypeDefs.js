const { gql } = require('apollo-server');

const authTypes = gql `
    type Tokens {
        refresh:String!
        access:String!
    }

    type Access {
        access:String!
    }

    type CredentialsInput {
        username:String!
        password:String!
    }

    type SignUpInput {
        username:String!
        password:String!
        name:String!
        email:String!
    }

    type UserDetail {
        id:Int!
        username:String!
        name:String!
        email:String!
    }

    type Query {
        userDetailById(userId:Int!):UserDetail!
    }

    type Mutation{
        signUpUser(userInput:$SignUpInput):Tokens!
        logIn(credentials:$CredentialsInput!):Tokens!
        refreshToken(token:String!):Access!
    }
`;

module.exports = authTypes;