const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig       = require('../server');

class OrderAPI extends RESTDataSource{

    constructor(){
        super();
        this.baseURL = serverConfig.order_api_url;

    }

    async createOrder(order){
        order = new Object(JSON.parse(JSON.stringify(order)));
        return await this.post('/order', order)
    } 

    async OrderByUsername(username){
        return await this.get(`/order/${username}`)
    }

}

module.exports = OrderAPI;