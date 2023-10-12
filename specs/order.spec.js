import {
  createOrder,
  getAllOrders,
  getOrderById,
} from '../helpers/order-helper'
import { expect } from 'chai'

describe('Order', () => {
  let res

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
})
