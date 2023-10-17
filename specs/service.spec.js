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
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Service created')
    })
    it('check if created service has id', () => {
      expect(res.body.payload).to.be.a('string')
    })
  })

  describe('Get all services', () => {
    let res
    before(async () => {
      res = await getAllServices()
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Service Search ok')
    })
    it('check if type of items is array', () => {
      expect(res.body.payload.items).to.be.an('array')
    })
  })

  describe('Get service by id', () => {
    let res, serviceId
    before(async () => {
      serviceId = (await getAllServices()).body.payload.items[0]._id
      res = await getServiceById(serviceId)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Get Service by id ok')
    })
  })

  describe('Get service by name', () => {
    let res, serviceName
    before(async () => {
      serviceName = (await getAllServices()).body.payload.items[0].name
      res = await getServiceByName(serviceName)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Service Search ok')
    })
  })

  describe('Edit service', () => {
    let res, serviceId
    before(async () => {
      serviceId = (await getAllServices()).body.payload.items[0]._id
      res = await editService(serviceId)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Service updated')
    })
  })

  describe('Delete service', () => {
    let res, serviceId, getSingleService
    before(async () => {
      serviceId = (await getAllServices()).body.payload.items[0]._id
      res = await deleteService(serviceId)
      getSingleService = await getServiceById(serviceId)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Service deleted')
    })
    it('check if service was deleted', () => {
      expect(getSingleService.statusCode).to.eq(404)
      expect(getSingleService.body.message).to.eq('No service for provided id')
    })
  })
})
