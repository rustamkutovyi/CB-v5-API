import { expect } from 'chai'
import request from 'supertest'
import 'dotenv/config'
import { logIn } from '../helpers/general-helper'

describe('Authentication', () => {
  describe('Authentication with valid credentials', () => {
    let res
    before(async () => {
      res = await logIn(process.env.EMAIL, process.env.PASSWORD)
    })

    it('validate response message', async () => {
      expect(res.body.message).to.eq('Auth success')
    })
    it('validate status code', async () => {
      expect(res.statusCode).to.eq(200)
    })

    it('check if the token exist', async () => {
      expect(res.body.payload.token).to.be.a('string')
    })

    it('check if success return true', async () => {
      expect(res.body.success).to.be.a('boolean')
    })

    it('check if acl is array', async () => {
      expect(res.body.payload.acl).to.be.a('array')
    })

    it('check confirmation link', async () => {
      expect(res.body.payload.confirmEmailLink).to.include(
        '/user/verify/email/'
      )
    })
    it('check if user id is a string', async () => {
      expect(res.body.payload.userId).to.be.a('string')
    })
  })
  describe('Auth with invalid credentials', () => {
    let res
    it('validate status code entering invalid email', async () => {
      res = await logIn('invalid', 'invalid')

      expect(res.statusCode).to.eq(400)
    })

    it('validate response message entering invalid email', async () => {
      let res
      res = await request(process.env.BASE_URL + '/v5')
        .post('/user/login')
        .send({ email: 'jeff334@martin.com', password: '12345' })

      expect(res.body.message).to.eq('Auth failed')
    })

    it('validate status code entering invalid password', async () => {
      let res
      res = await request(process.env.BASE_URL + '/v5')
        .post('/user/login')
        .send({ email: 'jeff334@martin.com', password: '123' })

      expect(res.statusCode).to.eq(400)
    })

    it('validate response message entering invalid password', async () => {
      let res
      res = await request(process.env.BASE_URL + '/v5')
        .post('/user/login')
        .send({ email: 'jeff334@martin.com', password: '123' })

      expect(res.body.message).to.eq('Auth failed')
    })

    it('validate status code entering both invalid email and password', async () => {
      let res
      res = await request(process.env.BASE_URL + '/v5')
        .post('/user/login')
        .send({ email: 'jeff332@martin.com', password: '123' })

      expect(res.statusCode).to.eq(400)
    })

    it('validate message response entering both invalid email and password', async () => {
      let res
      res = await request(process.env.BASE_URL + '/v5')
        .post('/user/login')
        .send({ email: 'jeff332@martin.com', password: '123' })

      expect(res.body.message).to.eq('Auth failed')
    })
  })
})
