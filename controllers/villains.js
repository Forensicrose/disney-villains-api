const models = require('../models')

// eslint-disable-next-line no-console
console.log(models)

const getVillains = async (request, response) => {
  const villains = await models.scaryVillains.findAll()

  return response.send(villains)
}

const villainBySlug = async (request, response) => {
  const { slug } = request.params
  const villainBySlug = await models.scaryVillains.findOne({ where: { slug } })

  return response.send(villainBySlug)
}

const newVillain = async (request, response) => {
  const { name, movie, slug } = request.body


  if (!name || !movie || !slug) {
    return response.status(403).send('missing resource')
  }
  const newVillain = await models.scaryVillains.create({
    name, movie, slug, updatedAt: new Date(), createdAt: new Date()
  })

  response.status(201).send(newVillain)
}

module.exports = { getVillains, villainBySlug, newVillain }
