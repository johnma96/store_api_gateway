const { gql } = require('apollo-server')

const orderTypes = gql `

    type Order {
        id:String!
        username:String!
        name:String!
        quantity:Int!
        total:Int!
        date:String!
    }

    extend type Query{
        orderByUsername(username:String!):[Order]
    }

`;

module.exports = orderTypes;