const { gql } = require('apollo-server')

const inventarioTypes = gql `

    type Product{
        id:Int!
        name: String!
        price: Int!
        amount: Int!
    }
    
    type ProductInput{
        name: String!
        price: Int!
        amount: Int!
    }

    type ProductUpdate {
        id : Int!
        amount : Int!
    }

    extend type Query{
        ProductByName(name:String!):Product
    }

    extend type Mutation{
        createProduct(product:ProductInput!):Product
        updateProduct(product:ProductUpdate!):Product
        deleteProduct(id:Id!):
    }



`;

module.exports = inventarioTypes;