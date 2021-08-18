/* eslint-disable eqeqeq */
const express = require('express')
const villains = require('./villains')
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  // eslint-disable-next-line no-console
  return response.send('Hello World')
})

// display all villains
app.get('/villains', (request, response) => {
  return response.send({ villains })
})

// display villains by slug
// select all from villians where slug = slug
app.get('/villains/:slug', (request, response) => {
  // deconstruct slug and any slug that comes from the request.params(from browser) // gets stored in slug; also set up a 404
  const { slug } = request.params
  const villainBySlug = villains.filter(villain => villain.slug == slug)

  if (villainBySlug.length < 1) {
    return response.sendStatus(404)
  }

  return response.send(villainBySlug)
})

// create new villain
// add new villain below to database
app.post('/villains', (request, response) => {
  const { name, movie, slug } = request.body
  const newVillain = {
    name: name,
    movie: movie,
    slug: slug
  }

  if (!name || !movie || !slug) {
    return response.status(403).send('missing resource')
  }
  villains.push(newVillain)

  return response.send(newVillain)
})

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 1337')
})

const teams = require('./villains')

// eslint-disable-next-line no-console
teams.forEach((({ name, movie, slug }) => console.log(`('${name}', '${movie}', '${slug}'`)))
