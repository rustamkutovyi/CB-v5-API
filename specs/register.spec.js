import { expect } from 'chai'
const chance = require('chance').Chance()
import { register } from '../helpers/general-helper'

describe('Create a user with valid credentials', () => {
  let res
  const newEmail = 'user_' + Date.now() + '@gmail.com'
  before(async () => {
    res = await register(
      chance.first(),
      chance.last(),
      newEmail,
      process.env.PASSWORD
    )
  })

  it('verify response status code', async () => {
    expect(res.statusCode).to.eq(201)
  })

  it('verify response message', () => {
    expect(res.body.message).contain('created successfully')
  })
})
