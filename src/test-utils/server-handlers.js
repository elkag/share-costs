// server-handlers.js
// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser. Pretty sweet!
import {rest} from 'msw' // msw supports graphql too!
import { LOGIN_SERVICE_URL } from '../api/services/config/config'
import { loginApi } from '../api/services/loginApi'
import { getGroupApi } from '../api/services/getGroupApi'

const handlers = [
  rest.post(LOGIN_SERVICE_URL, async (req, res, ctx) => {
    const user = await loginApi.login(JSON.parse(req.body))
    return res(ctx.json({user}))
  }),
  
  rest.post('/checkout', async (req, res, ctx) => {
    const user = await getGroupApi.login(JSON.parse(req.body))
    const isAuthorized = user.authorize(req.headers.Authorization)
    if (!isAuthorized) {
      return res(ctx.status(401), ctx.json({message: 'Not authorized'}))
    }
    const shoppingCart = JSON.parse(req.body)
    // do whatever other things you need to do with this shopping cart
    return res(ctx.json({success: true}))
  }),
]
export {handlers}