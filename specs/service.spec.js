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
import request from 'supertest'

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

describe('Negative tests for services', () => {
  describe('Create service without authorization', () => {
    let res, vendorId

    before(async () => {
      vendorId = (await searchAllVendors()).body.payload.items[0]._id
      res = await request(process.env.BASE_URL)
        .post('/v5/service')
        .send({
          name: 'Service' + Date.now(),
          vendor: vendorId,
          vendorPrice: Math.floor(Math.random() * 100),
          clientPrice: Math.floor(Math.random() * 100),
        })
    })

    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })

  describe('Create service without filling out required fields', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/service')
        .send({
          name: '',
          vendor: '',
          vendorPrice: '',
          clientPrice: '',
        })
        .set('Authorization', process.env.TOKEN)
    })

    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Service create error')
    })
  })

  describe('Get all services without authorization', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL).post('/v5/service/search')
    })

    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })

  describe('Search service by not existing id', () => {
    let res, servId
    before(async () => {
      servId = (await getAllServices()).body.payload.items[0]._id
      await deleteService(servId)
      res = await request(process.env.BASE_URL)
        .get('/v5/service/' + servId)
        .set('Authorization', process.env.TOKEN)
    })

    it('Check status code', () => {
      expect(res.statusCode).to.eq(404)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('No service for provided id')
    })
  })

  describe('Search service by id without authorization', () => {
    let res, servId
    before(async () => {
      servId = (await getAllServices()).body.payload.items[0]._id
      res = await request(process.env.BASE_URL).get('/v5/service/' + servId)
    })

    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })

  describe('Edit service without filling out required fields', () => {
    let res, servId
    before(async () => {
      servId = (await getAllServices()).body.payload.items[0]._id
      res = await request(process.env.BASE_URL)
        .patch('/v5/service/' + servId)
        .send({
          name: '',
          vendor: '',
          vendorPrice: '',
          clientPrice: '',
        })
        .set('Authorization', process.env.TOKEN)
    })
    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Service update error')
    })
  })

  describe('Verify that vendorPrice and clientPrice fields does not accept letters while updating', () => {
    let res, servId, vendorId
    before(async () => {
      servId = (await getAllServices()).body.payload.items[0]._id
      vendorId = (await searchAllVendors()).body.payload.items[0]._id
      res = await request(process.env.BASE_URL)
        .patch('/v5/service/' + servId)
        .send({
          name: 'Service' + Date.now(),
          vendor: vendorId,
          vendorPrice: 'Example',
          clientPrice: 'Example',
        })
        .set('Authorization', process.env.TOKEN)
    })
    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Service update error')
    })
  })

  describe('Delete service without authorization', () => {
    let res, servId
    before(async () => {
      servId = (await getAllServices()).body.payload.items[0]._id
      res = await request(process.env.BASE_URL).delete('/v5/service/' + servId)
    })
    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })

  describe('Delete not existing service', () => {
    let res, servId
    before(async () => {
      servId = (await getAllServices()).body.payload.items[0]._id
      await deleteService(servId)
      res = await request(process.env.BASE_URL)
        .delete('/v5/service/' + servId)
        .set('Authorization', process.env.TOKEN)
    })
    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Service not found')
    })
  })
})
