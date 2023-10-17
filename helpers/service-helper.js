import request from 'supertest'

function createService(vendorId) {
  const vendorPrice = Math.floor(Math.random() * 100)
  const clientPrice = Math.floor(Math.random() * 100)
  const name = 'Service' + Date.now()

  return request(process.env.BASE_URL)
    .post('/v5/service')
    .send({
      name: name,
      vendor: vendorId,
      vendorPrice: vendorPrice,
      clientPrice: clientPrice,
    })
    .set('Authorization', process.env.TOKEN)
}

function getAllServices() {
  return request(process.env.BASE_URL)
    .post('/v5/service/search')
    .set('Authorization', process.env.TOKEN)
}

function getServiceById(serviceId) {
  return request(process.env.BASE_URL)
    .get('/v5/service/' + serviceId)
    .set('Authorization', process.env.TOKEN)
}

function getServiceByName(serviceName) {
  return request(process.env.BASE_URL)
    .post('/v5/service/search')
    .send({ name: serviceName })
    .set('Authorization', process.env.TOKEN)
}

function editService(serviceId) {
  return request(process.env.BASE_URL)
    .patch('/v5/service/' + serviceId)
    .send({
      vendorPrice: '3000',
      clientPrice: '1000',
    })
    .set('Authorization', process.env.TOKEN)
}

function deleteService(serviceId) {
  return request(process.env.BASE_URL)
    .delete('/v5/service/' + serviceId)
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
