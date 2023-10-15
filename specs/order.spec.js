import { expect } from 'chai'
import * as clientHelper from '../helpers/client-helper'
import * as serviceHelper from '../helpers/service-helper'
import { createOrder } from '../helpers/order-helper'

describe('Orders', () => {
  describe('Create order', () => {
    let res, clientId, serviceId

    before(async () => {
      clientId = (await clientHelper.createClient()).body.payload
      serviceId = (await serviceHelper.createService()).body.payload

      res = await createOrder(clientId, serviceId)
    })
    it('check status code', () => {
      // expect(res.statusCode).to.eq(200)
      console.log(res.body)
    })
  })

  it('Check status code', () => {
    expect(res.statusCode).to.eq(200)
  })
})

it('Create an order', async () => {
  res = await createOrder()

  expect(res.statusCode).to.eq(200)
  expect(res.body.message).to.eq('Order created')
})

it('Get all orders', async () => {
  res = await getAllOrders()

  expect(res.statusCode).to.eq(200)
  expect(res.body.message).to.eq('OrderSearch ok')
})

it('Get order by id', async () => {
  res = await getOrderById()

  expect(res.statusCode).to.eq(200)
  expect(res.body.message).to.eq('Get Order by id ok')
})

it('Edit order', async () => {
  res = await editOrder()

  expect(res.statusCode).to.eq(200)
  expect(res.body.message).to.eq('Order updated')
})

it('Delete order', async () => {
  res = await deleteOrder()

  expect(res.statusCode).to.eq(200)
  expect(res.body.message).to.eq('Order deleted')
})
