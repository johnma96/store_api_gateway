const { gql } = require('apollo-server')

const inventarioTypes = gql `

    type Product{
        id:Int!
        name:String!
        price:Int!
        amount:Int!
    }
    
    input ProductInput{
        name:String!
        price:Int!
        amount:Int!
    }

    input ProductUpdate {
        id:Int!
        amount:Int!
    }

    extend type Query{
        productsByUserId(userId:String!):[Product]
    }

    extend type Mutation{
        createProduct(productName:ProductInput!):Product
        updateProduct(userId:String!,productId:ProductUpdate!):Product
        deleteProduct(userId:String!,productId:String!):String
    }
`;

module.exports = inventarioTypes;