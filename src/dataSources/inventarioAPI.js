const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig       = require('../server');

class InventarioAPI extends RESTDataSource{

    constructor(){
        super();
        this.baseURL = serverConfig.inv_api_url;
    }

    async createProduct(product){
        product = new Object(JSON.parse(JSON.stringify(product)));
        return await this.post('/product/create/', product);
    }

    async productsByUserId(userId){
        return await this.get(`/product/${userId}`);
    } 

    async updateProduct(userId, product){
        product = new Object(JSON.parse(JSON.stringify(product)));
        let productId = product.id;
        return await this.put(`product/update/${userId}/${productId}/`, product);
    }

    async deleteProduct(userId, productId){
        return await this.delete(`/product/remove/${userId}/${productId}`);
    }
}

module.exports = InventarioAPI;