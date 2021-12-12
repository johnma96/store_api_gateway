//const AuthAPI = require("../dataSources/authAPI");

const orderResolver = {
    Query: {
        orderByUsername: async (_, {username}, {dataSources, userIdToken}) => {
            usernameToken = (await dataSources.AuthAPI.getUser(userIdToken).username)
            if(username == usernameToke)
                return await dataSources.orderAPI.OrderByUsername(username);
            else
                return null;
        }
    },
    Mutation: {
        
    }

};

module.exports = orderResolver;