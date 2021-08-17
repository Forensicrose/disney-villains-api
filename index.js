/* eslint-disable eqeqeq */
const express = require('express')
const villains = require('./villains')
const app = express()

app.get('/', (request, response) => {
  // eslint-disable-next-line no-console
  return response.send('Hello World')
})

// display all villains
app.get('/villains', (request, response) => {
  return response.send({ villains })
})

// display villains by slug
app.get('/villains/:slug', (request, response) => {
  // deconstruct slug and any slug that comes from the request.params(from browser) // gets stored in slug; also set up a 404
  const { slug } = request.params
  const villainBySlug = villains.filter(villain => villain.slug == slug)

  if (villainBySlug.length < 1) {
    return response.sendStatus(404)
  }

  return response.send(villainBySlug)
})


app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 1337')
})
