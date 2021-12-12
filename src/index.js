const { ApolloServer} = require('apollo-server');

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const authentication = require('./utils/authentications')

const AuthAPI = require('./dataSources/authAPI')
const InventarioAPI = require('./dataSources/inventarioAPI')
const OrderAPI = require('./dataSources/orderAPI') 

const server = new ApolloServer({
    context: authentication, 
    typeDefs,
    resolvers,
    dataSources:() => ({
        authAPI: new AuthAPI(),
        inventarioAPI: new InventarioAPI(),
        orderAPI: new OrderAPI()

    }),
    instrospection: true,
    playground: true
});

server.listen( process.env.PORT || 4000).then(({url}) => {
        console.log(`Server ready at ${url}`);
    }
);