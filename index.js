const express = require('express')
const app = express()

app.get('/', (request, response) => {
  // eslint-disable-next-line no-console
  return response.send('Hello World')
})
app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 1337')
})
