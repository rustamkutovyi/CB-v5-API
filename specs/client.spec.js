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

describe('Client', () => {
  let response

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

  it('Search client by phone', async () => {
    response = await searchClientByPhone()

    expect(response.statusCode).to.eq(200)
    expect(response.body.message).to.eq('ClientSearch ok')
  })

  it('Edit client', async () => {
    response = await editClient()

    await expect(response.statusCode).to.eq(200)
    await expect(response.body.message).to.eq('Client updated')
  })

  it('Delete client', async () => {
    response = await deleteClient()

    await expect(response.statusCode).to.eq(200)
    await expect(response.body.message).to.eq('Client deleted')
  })
})
