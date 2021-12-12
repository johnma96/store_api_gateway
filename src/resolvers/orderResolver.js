//const AuthAPI = require("../dataSources/authAPI");

const orderResolver = {
    Query: {
        orderByUsername: async (_, {username}, {dataSources, userIdToken}) => {
            usernameToken = (await dataSources.AuthAPI.getUser(userIdToken).username)
            if(username == usernameToken)
                return await dataSources.orderAPI.orderByUsername(username);
            else
                return null;
        }
    },
    Mutation: {
        
    }

};

module.exports = orderResolver;