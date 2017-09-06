'use strict';

const socketIo = require('socket.io')
const stocksController = require('./stocks')

module.exports = function Io(server) {
  const io = socketIo(server)
  io.on('connection', (socket) => {
    console.log('User Connected')
    socket.emit('stocks changed', stocksController.stocks)

    socket.on('disconnect', () => {
      console.log('User Disconnected')
    })

    socket.on('add stock', (symbol) => {
      console.log(`Stock Added: ${symbol}`)
      stocksController.add(symbol.toUpperCase())
      .then((stocks) => {
        io.emit('stocks changed', stocks)
      })

      .catch((err) => {
        if (err === 'not found') {
          console.log(`Stock not found: ${symbol}`)
          return socket.emit('not found', symbol)
        }
        return Promise.reject(err)
      })
      .catch(console.error)
      })

      socket.on('remove stock', (symbol) => {
        console.log(`Stock Removed: ${symbol}`)
        stocksController.remove(symbol)
        .then((stocks) => {
          io.emit('stocks changed', stocks)
        })
        .catch(console.error)
      })
  })
  return io
}
