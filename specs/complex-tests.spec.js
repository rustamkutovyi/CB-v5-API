import { logIn, register } from '../helpers/general-helper'
import request from 'supertest'
import { expect } from 'chai'
const chance = require('chance').Chance()

describe('Email confirmation', () => {
  let res, string, endPoint, confirmation
  it('verify status code', async () => {
    const randomEmail = 'user_' + Date.now() + '@gmail.com'

    await register(
      chance.first(),
      chance.last(),
      randomEmail,
      process.env.PASSWORD
    )

    res = await logIn(randomEmail, process.env.PASSWORD)
    expect(res.body.payload.user.roles).to.include('new')

    string = await request(process.env.BASE_URL)
      .post('/email/search/')
      .send({ email: randomEmail })

    endPoint = string.body.payload.items[0].message
      .split('\n')[4]
      .split('https://clientbase.us')[1]

    confirmation = await request(process.env.BASE_URL).get(endPoint)

    res = await logIn(randomEmail, process.env.PASSWORD)

    expect(res.statusCode).to.eq(200)
    expect(res.body.payload.user.roles).to.include('verified')
  })
})
