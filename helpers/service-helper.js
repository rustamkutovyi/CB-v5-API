import request from 'supertest'

function createService(
  name = 'Service' + Date.now(),
  vendor = process.env.VENDOR_ID,
  vendorPrice = 900,
  clientPrice = 700
) {
  return request(process.env.BASE_URL)
    .post('/v5/service')
    .send({ name, vendor, vendorPrice, clientPrice })
    .set('Authorization', process.env.TOKEN)
}

function getAllServices() {
  return request(process.env.BASE_URL)
    .post('/v5/service/search')
    .set('Authorization', process.env.TOKEN)
}

function getServiceById() {
  return request(process.env.BASE_URL)
    .get('/v5/service/' + process.env.SERVICE_ID)
    .set('Authorization', process.env.TOKEN)
}

function getServiceByName() {
  return request(process.env.BASE_URL)
    .post('/v5/service/search')
    .send({ name: process.env.SERVICE_NAME })
    .set('Authorization', process.env.TOKEN)
}

function editService() {
  return request(process.env.BASE_URL)
    .patch('/v5/service/' + process.env.SERVICE_ID)
    .send({
      vendorPrice: '3000',
      clientPrice: '1000',
    })
    .set('Authorization', process.env.TOKEN)
}

function deleteService() {
  return request(process.env.BASE_URL)
    .delete('/v5/service/' + process.env.SERVICE_ID)
    .set('Authorization', process.env.TOKEN)
}

export {
  createService,
  getAllServices,
  getServiceById,
  getServiceByName,
  editService,
  deleteService,
}
