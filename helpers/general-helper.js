import request from 'supertest'

const chance = require('chance').Chance()

function logIn(email, password) {
  return request(process.env.BASE_URL + '/v5')
    .post('/user/login')
    .send({ email, password })
}

function createClient(name = chance.first(), phone = Date.now(), email) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .send({ name, phone, email })
    .set('Authorization', process.env.TOKEN)
}

function register(
  firstName = chance.first(),
  lastName = chance.last(),
  email,
  password = process.env.PASSWORD
) {
  return request(process.env.BASE_URL + '/v5')
    .post('/user')
    .send({ firstName, lastName, email, password })
}

export { logIn, register, createClient }
