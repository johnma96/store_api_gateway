//const AuthAPI = require("../dataSources/authAPI");

const orderResolver = {
    Query: {
        orderByUsername: async (_, {username}, {dataSources}) => {
            return await dataSources.orderAPI.orderByUsername(username);
            
        }
    },
    Mutation: {
        createOrder: async(_, {order},{dataSources}) => {
            return dataSources.orderAPI.sendOrder(order)
        }
        
    }

};

module.exports = orderResolver;