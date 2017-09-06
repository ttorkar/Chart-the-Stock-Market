const socket = io()

function updateRemoveButtons(stocks){
  const $stockBtns = $('#stock-btns')
  $('#message').hide()
  if (stocks.length) {
    $('#remove-stocks').show()
  } else {
    $('#remove-stocks').hide()
}

$stockBtns.find('li').remove()

$.each(stocks, (index, stock) => {
  const lastPrice = stock.data[stock.data.length -1][1].toFixed(2)
  const $li = $('<li/>', { class: 'list-group-item'})
  const $p = $('<h4/>', {
    class: 'list-group-item-heading',
    html: `${stock.name.toUpperCase()} <small> $${lastPrice} </small>`,
  })
  const $button = $('<span/>', {
    class: 'pull-right',
    html: '<button class= "btn btn-danger">&times;</button>',
  })
  $button.click(() => {
    socket.emit('remove stock', stock.name)
    return false
  });
  $li.append($button).append($p).prependTo($stockBtns)
})
}

$(() => {
  $('#message').hide()

  $('form').submit(() => {
    socket.emit('add stock', $('#symbol').val())
    $('#symbol').val('')
    $('#message').hide()
    return false
  })
  socket.on('not found', (symbol) => {
    $('#message').text(`Unable to find stock symbol: ${symbol}`)
    $('#message').show()
  })

  socket.on('stocks changed', updateChart)
  socket.on('stocks changed', updateRemoveButtons)
})
