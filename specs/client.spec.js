import { logIn } from '../helpers/general-helper'
import {
  createClient,
  searchClientByID,
  searchAllClients,
  searchClientByName,
} from '../helpers/client-helper'
import { expect } from 'chai'
import request from 'supertest'

describe('Client', () => {
  let response
  before(async () => {
    await logIn(process.env.EMAIL, process.env.PASSWORD)
  })

  afterEach(async () => {})

  it('Create client', async () => {
    response = await createClient()

    await expect(response.statusCode).to.eq(200)
    await expect(response.body.message).to.eq('Client created')
  })

  it('Search client by ID', async () => {
    response = await searchClientByID()

    await expect(response.statusCode).to.eq(200)
    await expect(response.body.message).to.eq('Get Client by id ok')
  })

  it('Search all clients', async () => {
    response = await searchAllClients()

    await expect(response.statusCode).to.eq(200)
    await expect(response.body.message).to.eq('ClientSearch ok')
  })

  it('Search client by name', async () => {
    response = await searchClientByName()

    await expect(response.statusCode).to.eq(200)
    await expect(response.body.message).to.eq('ClientSearch ok')
  })
})
