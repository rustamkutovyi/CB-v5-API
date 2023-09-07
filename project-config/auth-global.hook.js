import request from 'supertest'
import 'dotenv/config'

before(async () => {
  const response = await request(process.env.BASE_URL)
    .post('/user/login')
    .send({ email: process.env.EMAIL, password: process.env.PASSWORD })

  process.env.TOKEN = response.body.payload.token
})
