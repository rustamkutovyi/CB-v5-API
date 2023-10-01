import { logIn } from '../helpers/general-helper'
import { expect } from 'chai'
import request from 'supertest'

describe('Field validation', () => {
  let newClient, searchClient, clientName
  it('check if spaces in field are trimmed', async () => {
    before(async () => {
      const response = await logIn(process.env.EMAIL, process.env.PASSWORD)

      process.env.TOKEN = response.body.payload.token
    })

    newClient = await request(process.env.BASE_URL)
      .post('/v5/client')
      .send({
        name: '   Philip',
        phone: '43534',
        email: 'philip@gmail.com',
      })
      .set('Authorization', process.env.TOKEN)

    searchClient = await request(process.env.BASE_URL)
      .post('/v5/client/search')
      .send({
        name: '   Philip',
      })
      .set('Authorization', process.env.TOKEN)

    clientName = searchClient.body.payload.items[0].name

    expect(clientName).to.eq(clientName.trim())
  })
})
