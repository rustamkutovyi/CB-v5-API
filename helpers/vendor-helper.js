import request from 'supertest'

const chance = require('chance').Chance()

function createVendor(
  name = chance.first(),
  phone = Date.now(),
  email = 'user_' + Date.now() + '@gmail.com'
) {
  return request(process.env.BASE_URL)
    .post('/v5/vendor')
    .send({ name, phone, email })
    .set('Authorization', process.env.TOKEN)
}

function searchAllVendors() {
  return request(process.env.BASE_URL)
    .post('/v5/vendor/search')
    .set('Authorization', process.env.TOKEN)
}

function getVendorByName(vendorName) {
  return request(process.env.BASE_URL)
    .post('/v5/vendor/search')
    .send({ name: vendorName })
    .set('Authorization', process.env.TOKEN)
}

function searchVendorById(vendorId) {
  return request(process.env.BASE_URL)
    .get('/v5/vendor/' + vendorId)
    .set('Authorization', process.env.TOKEN)
}

function editVendor(vendorId, name = chance.first()) {
  return request(process.env.BASE_URL)
    .patch('/v5/vendor/' + vendorId)
    .send({ name })
    .set('Authorization', process.env.TOKEN)
}

function deleteVendor(vendorId) {
  return request(process.env.BASE_URL)
    .delete('/v5/vendor/' + vendorId)
    .set('Authorization', process.env.TOKEN)
}

export {
  createVendor,
  searchAllVendors,
  getVendorByName,
  searchVendorById,
  editVendor,
  deleteVendor,
}
