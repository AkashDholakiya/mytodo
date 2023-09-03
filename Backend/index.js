const mongoConnect = require('./db')
const express = require('express')

mongoConnect();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello bro!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})