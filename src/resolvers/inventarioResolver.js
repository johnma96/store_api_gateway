const inventarioResolver = {
    Query: {
        ProductByName: async(_, {name}, {dataSources}) => {
            dataSources.orderAPI.prodcut == name
                return product
        }
    },
    Mutation: {
        
    }

};

module.exports = inventarioResolver;