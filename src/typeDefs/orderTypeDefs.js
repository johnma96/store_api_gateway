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

    input OrderInput{
        username:String!
        name:String!
        quantity:Int!
        total:Int!
    }

    extend type Mutation{
        createOrder(order:OrderInput!):Order
    }

`;

module.exports = orderTypes;