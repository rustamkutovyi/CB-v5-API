import { logIn } from '../helpers/general-helper'
import { createClient } from '../helpers/client-helper'

describe('Client', () => {
  before(async () => {
    await logIn(process.env.EMAIL, process.env.PASSWORD)
  })

  it('Create client', async () => {
    const res = await createClient()
    console.log(res.body)
  })
})
