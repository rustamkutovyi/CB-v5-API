import request from 'supertest'

const chance = require('chance').Chance()

function createClient(name = chance.first(), phone = Date.now()) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .send({ name, phone })
    .set('Authorization', process.env.TOKEN)
}

function searchClientByID() {
  return request(process.env.BASE_URL)
    .get('/v5/client/' + process.env.ID)
    .set('Authorization', process.env.TOKEN)
}

function searchAllClients() {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .set('Authorization', process.env.TOKEN)
}

function searchClientByName() {
  return request(process.env.BASE_URL)
    .post('/v5/client/search')
    .send({ name: process.env.CLIENT_NAME })
    .set('Authorization', process.env.TOKEN)
}

function editClient(
  name = chance.first(),
  phone = Date.now(),
  email = 'user_' + Date.now() + '@gmail.com'
) {
  return request(process.env.BASE_URL)
    .patch('/v5/client/' + process.env.ID)
    .send(name, phone, email)
    .set('Authorization', process.env.TOKEN)
}

function deleteClient() {
  return request(process.env.BASE_URL)
    .delete('/v5/client/' + process.env.ID)
    .set('Authorization', process.env.TOKEN)
}

export {
  createClient,
  searchClientByID,
  searchAllClients,
  searchClientByName,
  editClient,
  deleteClient,
}
