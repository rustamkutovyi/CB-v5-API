import request from 'supertest'

const chance = require('chance').Chance()

function createClient(
  name = chance.first(),
  phone = Date.now(),
  email = 'user_' + Date.now() + '@gmail.com'
) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .send({ name, phone, email })
    .set('Authorization', process.env.TOKEN)
}

export { createClient }
