import { expect } from 'chai'
import { createClient } from '../helpers/client-helper'
import { createService } from '../helpers/service-helper'
import {
  createOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrderById,
} from '../helpers/order-helper'

describe('Orders', () => {
  describe('Create order', () => {
    let response, clientId, serviceId

    before(async () => {
      clientId = (await createClient()).body.payload
      serviceId = (await createService()).body.payload

      response = await createOrder(clientId, serviceId)
    })

    it('check status code', () => {
      expect(response.statusCode).to.eq(200)
    })

    it('check body message', () => {
      expect(response.body.message).to.eq('Order created')
    })

    it('check if order has id', () => {
      expect(response.body.payload).to.be.a('string')
    })
  })

  describe('Get all orders', () => {
    let res

    before(async () => {
      res = await getAllOrders()
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check body message', () => {
      expect(res.body.message).to.eq('OrderSearch ok')
    })

    it('check if type of items is array', () => {
      expect(res.body.payload.items).to.be.an('array')
    })
  })

  describe('Get order by id', () => {
    let response, clientId, serviceId, orderId, getSingleOrder

    before(async () => {
      clientId = (await createClient()).body.payload
      serviceId = (await createService()).body.payload

      response = await createOrder(clientId, serviceId)
      orderId = await response.body.payload
      getSingleOrder = await getOrderById(orderId)
    })

    it('check status code', () => {
      expect(getSingleOrder.statusCode).to.eq(200)
    })

    it('check body message', () => {
      expect(getSingleOrder.body.message).to.eq('Get Order by id ok')
    })

    it('check if order id is correct', () => {
      expect(getSingleOrder.body.payload._id).to.eq(orderId)
    })

    it('check if order has a client id', () => {
      expect(getSingleOrder.body.payload.client._id).to.eq(clientId)
    })
  })

  describe('Edit order', () => {
    let clientId, serviceId, orderId, res

    before(async () => {
      clientId = (await createClient()).body.payload
      serviceId = (await createService()).body.payload
      orderId = (await createOrder(clientId, serviceId)).body.payload
      res = await editOrder(orderId)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check body message', () => {
      expect(res.body.message).to.eq('Order updated')
    })
  })

  describe('Delete order', () => {
    let clientId, serviceId, orderId, res

    before(async () => {
      clientId = (await createClient()).body.payload
      serviceId = (await createService()).body.payload
      orderId = (await createOrder(clientId, serviceId)).body.payload
      res = await deleteOrder(orderId)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check body body message', () => {
      expect(res.body.message).to.eq('Order deleted')
    })
  })

  after('Delete all orders', async () => {
    const ordersList = (await getAllOrders()).body.payload.items
    for (let i = 0; i < ordersList.length; i++) {
      await deleteOrder(ordersList[i]._id)
    }
  })
})
