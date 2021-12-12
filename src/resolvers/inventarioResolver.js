const inventarioResolver = {
    Query: {
        productsByUserId: async(_, {userId}, { dataSources }) => {
            return await dataSources.inventarioAPI.productsByUserId(userId);
        }
    },
    Mutation: {
        createProduct: async(_, {product}, { dataSources }) => {
            return await dataSources.inventarioAPI.createProduct(product)

        } ,

        updateProduct: async(_, {userId, product}, { dataSources }) => {
            return await dataSources.inventarioAPI.updateProduct(userId, product)
            
        },

        deleteProduct: async(_, {userId, productId}, { dataSources }) => {
            return await dataSources.inventarioAPI.deleteProduct(userId, productId)
        }
    }
};

module.exports = inventarioResolver;