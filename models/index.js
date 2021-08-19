const Sequelize = require('sequelize')
const villains = require('./villains')

const connection = new Sequelize('disneyvillains', 'movieVillains', '$cary!', {
  host: 'localhost', dialect: 'mysql', define: { timestamps: false }
})

const scaryVillains = villains(connection, Sequelize)


module.exports = { scaryVillains }
