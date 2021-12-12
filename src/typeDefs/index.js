// llamar todos los typeDefs
const authTypes       = require('./authTypeDefs')
const inventarioTypes = require('./inventarioTypeDefs')
const orderTypes      = require('./orderTypeDefs')


const schemaArrays = [authTypes, inventarioTypes, orderTypes]
module.exports     = schemaArrays