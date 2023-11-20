import {
  createClient,
  searchClientByID,
  searchAllClients,
  searchClientByName,
  editClient,
  deleteClient,
  searchClientByPhone,
} from '../helpers/client-helper'
import { expect } from 'chai'
import request from 'supertest'

const chance = require('chance').Chance()

describe('Clients', () => {
  describe('Create client', () => {
    let res
    before(async () => {
      res = await createClient()
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Client created')
    })
    it('check if client has id', () => {
      expect(res.body.payload).to.be.a('string')
    })
  })

  describe('Search client by Id', () => {
    let res, clientId
    before(async () => {
      clientId = (await createClient()).body.payload
      res = await searchClientByID(clientId)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Get Client by id ok')
    })
  })

  describe('Search all clients', () => {
    let res
    before(async () => {
      res = await searchAllClients()
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('ClientSearch ok')
    })
    it('check if type of items is array', () => {
      expect(res.body.payload.items).to.be.an('array')
    })
  })

  describe('Search client by name', () => {
    let res, clientName
    before(async () => {
      clientName = (await searchAllClients()).body.payload.items[0].name
      res = await searchClientByName(clientName)
    })
    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('ClientSearch ok')
    })
    it('check if client name is correct', () => {
      expect(res.body.payload.items[0].name).to.eq(clientName)
    })
  })

  describe('Search client by phone', () => {
    let res, clientPhone
    before(async () => {
      clientPhone = (await searchAllClients()).body.payload.items[0].phone
      res = await searchClientByPhone(clientPhone)
    })
    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('ClientSearch ok')
    })
    it('check if client phone is correct', () => {
      expect(res.body.payload.items[0].phone).to.eq(clientPhone)
    })
  })

  describe('Edit client', () => {
    let res, clientId, clientPhone, clientUpdatedPhone

    before(async () => {
      clientId = (await searchAllClients()).body.payload.items[0]._id
      clientPhone = (await searchAllClients()).body.payload.items[0].phone
      res = await editClient(clientId)
      clientUpdatedPhone = (await searchClientByID(clientId)).body.payload.phone
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Client updated')
    })
    it('check if client phone was updated', () => {
      expect(clientPhone).not.eq(clientUpdatedPhone)
    })
  })

  describe('Delete client', () => {
    let res, clientId, getSingleClient
    before(async () => {
      clientId = (await searchAllClients()).body.payload.items[0]._id
      res = await deleteClient(clientId)
      getSingleClient = await searchClientByID(clientId)
    })

    it('check status code', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('check body message', () => {
      expect(res.body.message).to.eq('Client deleted')
    })
    it('Check if client was deleted', () => {
      expect(getSingleClient.statusCode).to.eq(404)
      expect(getSingleClient.body.message).to.eq('No client for provided id')
    })
  })

  after('Delete all clients', async () => {
    const clientsList = (await searchAllClients()).body.payload.items
    for (let i = 0; i < clientsList.length; i++) {
      await deleteClient(clientsList[i]._id)
    }
  })
})

describe('Negative tests for Client', () => {
  let res, clientId

  it('Create client without authorization', async () => {
    res = await request(process.env.BASE_URL).post('/v5/client').send({
      name: chance.name(),
      phone: chance.phone(),
    })

    expect(res.statusCode).to.eq(400)
    expect(res.body.message).to.eq('Auth failed')
  })

  it('Create client with empty fields', async () => {
    res = await request(process.env.BASE_URL)
      .post('/v5/client')
      .send({
        name: '',
        phone: '',
      })
      .set('Authorization', process.env.TOKEN)

    expect(res.statusCode).to.eq(400)
    expect(res.body.message).to.eq('Client create error')
  })
  before(async () => {
    clientId = (await createClient()).body.payload
  })

  it('Edit client without authorization', async () => {
    res = await request(process.env.BASE_URL)
      .patch('/v5/client/' + clientId)
      .send({
        name: chance.name(),
        phone: chance.phone(),
      })

    expect(res.statusCode).to.eq(400)
    expect(res.body.message).to.eq('Auth failed')
  })

  it('Edit client with empty fields', async () => {
    res = await request(process.env.BASE_URL)
      .patch('/v5/client/' + clientId)
      .send({
        name: '',
        phone: '',
      })
      .set('Authorization', process.env.TOKEN)

    expect(res.statusCode).to.eq(400)
    expect(res.body.message).to.eq('Client update error')
  })

  before(async () => {
    clientId = (await createClient()).body.payload
    res = await deleteClient(clientId)
  })

  it('Delete not existing client', async () => {
    res = await request(process.env.BASE_URL)
      .delete('/v5/client/' + clientId)
      .set('Authorization', process.env.TOKEN)
    expect(res.statusCode).to.eq(400)
    expect(res.body.message).to.eq('Client not found')
  })

  it('Delete client without authorization', async () => {
    res = await request(process.env.BASE_URL).delete('/v5/client/' + clientId)
    expect(res.statusCode).to.eq(400)
    expect(res.body.message).to.eq('Auth failed')
  })
})
