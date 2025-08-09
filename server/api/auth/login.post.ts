import { createError, eventHandler, readBody } from 'h3'
import { decodeToken } from '../../utils/session'

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body.token) {
      throw createError({ statusCode: 400, message: 'Token is required' })
    }

    const decoded = decodeToken(body.token)
    if (!decoded) {
      throw createError({ statusCode: 401, message: 'Invalid token' })
    }

    return { token: body.token }
  } catch (error) {
    console.error('Login handler error:', error)
    throw createError({ statusCode: 500, message: 'Internal Server Error' })
  }
})
