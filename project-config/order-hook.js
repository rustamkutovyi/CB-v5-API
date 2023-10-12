import { getAllOrders } from '../helpers/order-helper'

before(async () => {
  const res = await getAllOrders()

  process.env.ORDER_ID = res.body.payload.items[0]._id
})
