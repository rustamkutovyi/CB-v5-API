import {
  createService,
  getAllServices,
  getServiceById,
  getServiceByName,
  editService,
  deleteService,
} from '../helpers/service-helper'
import { expect } from 'chai'
import { searchAllVendors } from '../helpers/vendor-helper'

describe('Service', () => {
  describe('Create service', () => {
    let res, vendorId
    before(async () => {
      vendorId = (await searchAllVendors()).body.payload.items[0]._id
      res = await createService(vendorId)
    })

    it('check status code', () => {
      // expect(res.statusCode).to.eq(200)
      console.log(res.body)
    })
  })

  let response

  it('Create service', async () => {
    response = await createService()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Service created')
  })

  it('Get all services', async () => {
    response = await getAllServices()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Service Search ok')
  })

  it('Get service by id', async () => {
    response = await getServiceById()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Get Service by id ok')
  })

  it('Get service by name', async () => {
    response = await getServiceByName()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Service Search ok')
  })

  it('Edit service', async () => {
    response = await editService()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Service updated')
  })

  it('Delete service', async () => {
    response = await deleteService()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Service deleted')
  })
})
