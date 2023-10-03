import { createClient, logIn, register } from '../helpers/general-helper'
import { expect } from 'chai'
import request from 'supertest'
const chance = require('chance').Chance()

describe('Field validation', () => {
  let res, searchClient, clientName

  it('verify whether spaces in the "Name" field are trimmed when creating a client', async () => {
    await logIn(process.env.EMAIL, process.env.PASSWORD)

    const newEmail = 'user_' + Date.now() + '@gmail.com'

    const phone = Date.now()

    const nameWithSpaces = '   ' + chance.first()

    res = await createClient(nameWithSpaces, phone, newEmail)

    searchClient = await request(process.env.BASE_URL)
      .post('/v5/client/search')
      .send(nameWithSpaces)
      .set('Authorization', process.env.TOKEN)

    clientName = searchClient.body.payload.items[0].name

    expect(clientName).to.eq(clientName.trim())
  })

  it('verify whether spaces in the email field are trimmed during registration', async () => {
    const randomEmail = '    user_' + Date.now() + '@gmail.com'

    await register(
      chance.first(),
      chance.last(),
      randomEmail,
      process.env.PASSWORD
    )

    res = await logIn(randomEmail, process.env.PASSWORD)

    const email = res.body.payload.user.email

    expect(email).to.eq(email.trim())
  })
})
