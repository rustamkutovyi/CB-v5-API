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

function getVendorByName() {
  return request(process.env.BASE_URL)
    .post('/v5/vendor/search')
    .send({ name: process.env.VENDOR_NAME })
    .set('Authorization', process.env.TOKEN)
}

function searchVendorById() {
  return request(process.env.BASE_URL)
    .get('/v5/vendor/' + process.env.VENDOR_ID)
    .set('Authorization', process.env.TOKEN)
}

function editVendor(name = chance.first()) {
  return request(process.env.BASE_URL)
    .patch('/v5/vendor/' + process.env.VENDOR_ID)
    .send({ name })
    .set('Authorization', process.env.TOKEN)
}

function deleteVendor() {
  return request(process.env.BASE_URL)
    .delete('/v5/vendor/' + process.env.VENDOR_ID)
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
