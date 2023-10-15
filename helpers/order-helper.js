import request from 'supertest'

function createOrder() {
  const randomNumFirst = Math.floor(Math.random() * 10000)
  const randomNumSecond = Math.floor(Math.random() * 10000)
  const randomNumThird = Math.floor(Math.random() * 10000)

  return request(process.env.BASE_URL)
    .post('/v5/order')
    .send({
      // client: process.env.ID,
      // service: process.env.SERVICE_ID,
      clientPrice: randomNumFirst,
      clientPaid: randomNumSecond,
      vendorPrice: randomNumThird,
      vendorPaid: randomNumThird,
      notes: 'First Order',
    })
    .set('Authorization', process.env.TOKEN)
}

function getAllOrders() {
  return request(process.env.BASE_URL)
    .post('/v5/order/search')
    .set('Authorization', process.env.TOKEN)
}

function getOrderById() {
  return request(process.env.BASE_URL)
    .get('/v5/order/' + process.env.ORDER_ID)
    .set('Authorization', process.env.TOKEN)
}

function editOrder() {
  const randomNumFirst = Math.floor(Math.random() * 10000)
  const randomNumSecond = Math.floor(Math.random() * 10000)
  const randomNumThird = Math.floor(Math.random() * 10000)
  return request(process.env.BASE_URL)
    .patch('/v5/order/' + process.env.ORDER_ID)
    .send({
      clientPrice: randomNumFirst,
      clientPaid: randomNumSecond,
      vendorPrice: randomNumThird,
      vendorPaid: randomNumThird,
    })
    .set('Authorization', process.env.TOKEN)
}

function deleteOrder() {
  return request(process.env.BASE_URL)
    .delete('/v5/order/' + process.env.ORDER_ID)
    .set('Authorization', process.env.TOKEN)
}

export { createOrder, getAllOrders, getOrderById, editOrder, deleteOrder }
