import {
  createVendor,
  searchAllVendors,
  getVendorByName,
  searchVendorById,
  editVendor,
  deleteVendor,
} from '../helpers/vendor-helper'
import { expect } from 'chai'

describe('Tests for vendor', () => {
  let response

  it('Create vendor', async () => {
    response = await createVendor()
    // process.env.VENDOR_ID = response.body.payload

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Vendor created')
  })

  it('Search all vendors', async () => {
    response = await searchAllVendors()
    // process.env.VENDOR_NAME = response.body.payload.items[0].name

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('VendorSearch ok')
  })

  it('Search vendor by name', async () => {
    response = await getVendorByName()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('VendorSearch ok')
  })

  it('Search vendor by id', async () => {
    response = await searchVendorById()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Get Vendor by id ok')
  })

  it('Edit vendor', async () => {
    response = await editVendor()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Vendor updated')
  })

  it('Delete vendor', async () => {
    response = await deleteVendor()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('Vendor deleted')
  })
})
