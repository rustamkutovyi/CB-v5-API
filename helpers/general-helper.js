import request from 'supertest'

function logIn(email, password) {
  return request(process.env.BASE_URL)
    .post('/user/login')
    .send({ email, password })
}

export { logIn }
