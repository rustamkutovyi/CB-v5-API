import request from 'supertest'

const chance = require('chance').Chance()

function createClient(name = chance.first(), phone = Date.now()) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .send({ name, phone })
    .set('Authorization', process.env.TOKEN)
}

function searchClientByID(clientId) {
  return request(process.env.BASE_URL)
    .get('/v5/client/' + clientId)
    .set('Authorization', process.env.TOKEN)
}

function searchAllClients() {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .set('Authorization', process.env.TOKEN)
}

function searchClientByName(clientName) {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .send({ name: clientName })
    .set('Authorization', process.env.TOKEN)
}
function searchClientByPhone(clientPhone) {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .send({ phone: clientPhone })
    .set('Authorization', process.env.TOKEN)
}
function editClient(
  clientId,
  phone = Date.now(),
  email = 'user_' + Date.now() + '@gmail.com'
) {
  return request(process.env.BASE_URL)
    .patch('/v5/client/' + clientId)
    .send({ phone, email })
    .set('Authorization', process.env.TOKEN)
}

function deleteClient(clientId) {
  return request(process.env.BASE_URL)
    .delete('/v5/client/' + clientId)
    .set('Authorization', process.env.TOKEN)
}

export {
  createClient,
  searchClientByID,
  searchAllClients,
  searchClientByName,
  editClient,
  deleteClient,
  searchClientByPhone,
}
