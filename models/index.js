const Sequelize = require('sequelize')
const villains = require('./villains')

const connection = new Sequelize('villains', 'movieVillains', '$cary!', {
  host: 'localhost', dialect: 'mysql', define: { timestamps: false }
})

const scaryVillains = villains(connection, Sequelize)


module.exports = { scaryVillains }
