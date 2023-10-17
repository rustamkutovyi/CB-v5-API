import {
  createVendor,
  searchAllVendors,
  getVendorByName,
  searchVendorById,
  editVendor,
  deleteVendor,
} from '../helpers/vendor-helper'
import { expect } from 'chai'

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

  // after('Delete all vendors', async () => {
  //   const vendorsList = (await searchAllVendors()).body.payload.items
  //   for (let i = 0; i < vendorsList.length; i++) {
  //     await deleteVendor(vendorsList[i]._id)
  //   }
  // })
})
