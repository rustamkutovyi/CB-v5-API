import 'dotenv/config'
import { logIn } from '../helpers/general-helper'
import { createClient, deleteClient } from '../helpers/client-helper'
import { searchAllClients } from '../helpers/client-helper'

before(async () => {
  const response = await logIn(process.env.EMAIL, process.env.PASSWORD)

  process.env.TOKEN = response.body.payload.token
})

before(async () => {
  const response = await createClient()

  process.env.ID = response.body.payload
})

before(async () => {
  const response = await searchAllClients()

  process.env.CLIENT_NAME = response.body.payload.items[0].name
  process.env.PHONE = response.body.payload.items[0].phone
})

after(async () => {
  await deleteClient()
})
