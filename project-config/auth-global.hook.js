import 'dotenv/config'
import { logIn } from '../helpers/general-helper'

before(async () => {
  const response = await logIn(process.env.EMAIL, process.env.PASSWORD)

  process.env.TOKEN = response.body.payload.token
})
