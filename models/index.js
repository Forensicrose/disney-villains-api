const Sequelize = require('sequelize')
const villains = require('./villains')

const connection = new Sequelize('disneyVillains', 'movieVillains', '$cary!', {
  host: 'localhost', dialect: 'mysql',
})


const scaryVillains = villains(connection, Sequelize)


module.exports = { scaryVillains }
