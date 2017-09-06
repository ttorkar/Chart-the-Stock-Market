'use strict';

//Bring in our requirements
const http = require('http')
const express = require('express')
const path = require('path')
const stocks = require('./stocks')
const sockets = require('./sockets')

const app = express()
const server = http.Server(app)

sockets(server)

//Set the views
app.set('views', path.join(__dirname,'views'))
app.set('view engine','pug')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', stocks.index)

//Start listening
server.listen(3000, () => {
  console.log('Listen on PORT 3000')
})
