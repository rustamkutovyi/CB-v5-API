import { logIn } from '../helpers/general-helper'
import { createClient } from '../helpers/client-helper'
import { expect } from 'chai'

describe('Client', () => {
  before(async () => {
    await logIn(process.env.EMAIL, process.env.PASSWORD)
  })

  it('Create client', async () => {
    const response = await createClient()

    await expect(response.statusCode).to.eq(200)
    await expect(response.body.message).to.eq('Client created')
  })

  it('Search client by ID', async () => {
    await
  });
})
