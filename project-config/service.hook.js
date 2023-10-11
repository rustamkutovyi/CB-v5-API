import { getAllServices, deleteService } from '../helpers/service-helper'
before(async () => {
  const response = await getAllServices()

  process.env.SERVICE_ID = response.body.payload.items[0]._id
  process.env.VENDOR_NAME = response.body.payload.items[0].name
})

after(async () => {
  await deleteService()
})
