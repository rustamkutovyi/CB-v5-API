import { createClient, logIn } from '../helpers/general-helper'
import { expect } from 'chai'
import request from 'supertest'
const chance = require('chance').Chance()

describe('Field validation', () => {
  let res, searchClient, clientName

  it('check if spaces in field are trimmed', async () => {
    before(async () => {
      const response = await logIn(process.env.EMAIL, process.env.PASSWORD)

      process.env.TOKEN = response.body.payload.token
    })

    const newEmail = 'user_' + Date.now() + '@gmail.com'

    const nameWithSpaces = '   ' + chance.first()

    res = await createClient(nameWithSpaces, '34732394239', newEmail)

    searchClient = await request(process.env.BASE_URL)
      .post('/v5/client/search')
      .send(nameWithSpaces)
      .set('Authorization', process.env.TOKEN)

    clientName = searchClient.body.payload.items[0].name

    expect(clientName).to.eq(clientName.trim())
  })
})
