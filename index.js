/* eslint-disable eqeqeq */
const express = require('express')
// const villains = require('./villains')
const { getVillains, villainBySlug, newVillain } = require('./controllers/villains')
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  // eslint-disable-next-line no-console
  return response.send('Hello World')
})

// display all villains
app.get('/villains', getVillains)

// display villains by slug
// select all from villians where slug = slug
app.get('/villains/:slug', villainBySlug)


// create new villain
// add new villain below to database
app.post('/villains', newVillain)

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 1337')
})


