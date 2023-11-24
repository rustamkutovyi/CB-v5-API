import {
  createVendor,
  searchAllVendors,
  getVendorByName,
  searchVendorById,
  editVendor,
  deleteVendor,
} from '../helpers/vendor-helper'
import { expect } from 'chai'
import request from 'supertest'

const chance = require('chance').Chance()

describe('Vendor', () => {
  describe('Create vendor', () => {
    let res
    before(async () => {
      res = await createVendor()
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Vendor created')
    })
    it('check if vendor has id', () => {
      expect(res.body.payload).to.be.a('string')
    })
  })

  describe('Search all vendors', () => {
    let res
    before(async () => {
      res = await searchAllVendors()
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('VendorSearch ok')
    })
    it('check if type of items is array', () => {
      expect(res.body.payload.items).to.be.an('array')
    })
  })

  describe('Search vendor by id', () => {
    let res, vendorId
    before(async () => {
      vendorId = (await searchAllVendors()).body.payload.items[0]._id
      res = await searchVendorById(vendorId)
    })
    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Get Vendor by id ok')
    })
  })

  describe('Search vendor by name', () => {
    let res, vendorName
    before(async () => {
      vendorName = (await searchAllVendors()).body.payload.items[0].name
      res = await getVendorByName(vendorName)
    })
    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('VendorSearch ok')
    })
    it('check if vendor name is correct', () => {
      expect(res.body.payload.items[0].name).to.eq(vendorName)
    })
  })

  describe('Edit vendor', () => {
    let res, vendorId, vendorName, vendorUpdatedName
    before(async () => {
      vendorId = (await searchAllVendors()).body.payload.items[0]._id
      vendorName = (await searchAllVendors()).body.payload.items[0].name
      res = await editVendor(vendorId)
      vendorUpdatedName = (await searchVendorById(vendorId)).body.payload.name
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Vendor updated')
    })
    it('check if vendor name was updated', () => {
      expect(vendorName).not.eq(vendorUpdatedName)
    })
  })

  describe('Delete vendor', () => {
    let res, vendorId, getSingleVendor
    before(async () => {
      vendorId = (await searchAllVendors()).body.payload.items[0]._id
      res = await deleteVendor(vendorId)
      getSingleVendor = await searchVendorById(vendorId)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Vendor deleted')
    })
    it('check if vendor was deleted', () => {
      expect(getSingleVendor.statusCode).to.eq(404)
      expect(getSingleVendor.body.message).to.eq('No vendor for provided id')
    })
  })
})

describe('Vendor negative tests', () => {
  describe('Create vendor without authorization', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/vendor')
        .send({ name: chance.name() })
    })

    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })
  describe('Create vendor with empty required field', () => {
    let res
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('/v5/vendor')
        .send({ name: '' })
        .set('Authorization', process.env.TOKEN)
    })

    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Vendor create error')
    })
  })

  describe('Update vendor without authorization', () => {
    let res, vendorId
    before(async () => {
      vendorId = (await searchAllVendors()).body.payload.items[0]._id
      res = await request(process.env.BASE_URL)
        .patch('/v5/vendor/' + vendorId)
        .send({ name: chance.name() })
    })

    it('Check status code', () => {
      expect(res.statusCode).to.eq(400)
    })
    it('Check body message', () => {
      expect(res.body.message).to.eq('Auth failed')
    })
  })
})
