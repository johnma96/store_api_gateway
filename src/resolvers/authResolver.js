const userResolver = {
    Query: {
        userDetailById:(_,{userId}, {dataSources}) => {
            return dataSources.authAPI.getUser(userId);
            

        }
    },
    Mutation: {
        signUpUser:async(_, {userInput}, {dataSources}) =>{
            const authInput = {
                username :userInput.username,
                password :userInput.password,
                name     :userInput.name,
                email    :userInput.email
            }

            return await dataSources.authAPI.createUser(authInput);
        },
        logIn: (_, {credentials}, {dataSources}) =>{
            return dataSources.authAPI.authRequest(credentials);
        },
        refreshToken :(_, {token}, {dataSources}) =>{
            return dataSources.authAPI.refreshTokenapi(token)    
        }, 
    }
};

module.exports = userResolver;