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

app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 1337')
})
