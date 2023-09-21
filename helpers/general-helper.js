import request from 'supertest'

function logIn(email, password) {
  return request(process.env.BASE_URL)
    .post('/user/login')
    .send({ email, password })
}

function register(firstName, lastName, email, password) {
  return request(process.env.BASE_URL)
    .post('/user')
    .send({ firstName, lastName, email, password })
}
export { register }
export { logIn }
