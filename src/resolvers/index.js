const authResolver = require('./authResolver')
const orderResolver = require('./orderResolver')
const inventarioResolver = require('./inventarioResolver')

const lodash = require('lodash')

const resolvers = lodash.merge(authResolver, orderResolver, inventarioResolver)
module.exports = resolvers;