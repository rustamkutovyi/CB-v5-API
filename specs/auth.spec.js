import { expect } from 'chai'
import request from 'supertest'

describe('Authentication', () => {
  describe('Authentication with valid credentials', () => {
    it('validate response message', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff3@martin.com', password: '12345' })

      expect(res.body.message).to.eq('Auth success')
    })
    it('validate status code', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff3@martin.com', password: '12345' })

      expect(res.statusCode).to.eq(200)
    })

    it('check if the token exist', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff3@martin.com', password: '12345' })

      expect(res.body.payload.token).to.be.a('string')
    })

    it('check if success return true', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff3@martin.com', password: '12345' })
      expect(res.body.success).to.be.a('boolean')
    })

    it('check if acl is array', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff3@martin.com', password: '12345' })
      expect(res.body.payload.acl).to.be.a('array')
    })

    it('check confirmation link', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff3@martin.com', password: '12345' })
      expect(res.body.payload.confirmEmailLink).to.include(
        '/user/verify/email/'
      )
    })
    it('check if user id is a string', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff3@martin.com', password: '12345' })
      expect(res.body.payload.userId).to.be.a('string')
    })
  })
  describe('Auth with invalid credentials', () => {
    it('validate status code entering invalid email', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff334@martin.com', password: '12345' })

      expect(res.statusCode).to.eq(400)
    })

    it('validate response message entering invalid email', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff334@martin.com', password: '12345' })

      expect(res.body.message).to.eq('Auth failed')
    })

    it('validate status code entering invalid password', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff334@martin.com', password: '123' })

      expect(res.statusCode).to.eq(400)
    })

    it('validate response message entering invalid password', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff334@martin.com', password: '123' })

      expect(res.body.message).to.eq('Auth failed')
    })

    it('validate status code entering both invalid email and password', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff332@martin.com', password: '123' })

      expect(res.statusCode).to.eq(400)
    })

    it('validate message response entering both invalid email and password', async () => {
      let res
      res = await request('https://clientbase-server.herokuapp.com/v5')
        .post('/user/login')
        .send({ email: 'jeff332@martin.com', password: '123' })

      expect(res.body.message).to.eq('Auth failed')
    })
  })
})
