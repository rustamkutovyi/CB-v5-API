import request from 'supertest'
import

function createClient(name = chance.first(), phone = Date.now(), email) {
  return request(process.env.BASE_URL)
    .post('/v5/client')
    .send({ name, phone, email })
    .set('Authorization', process.env.TOKEN)
}

export { createClient }
