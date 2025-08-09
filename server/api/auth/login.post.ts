import { createError, eventHandler, readBody } from 'h3'
import { decodeToken } from '../../utils/session'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.token) {
    throw createError({ statusCode: 400, message: 'Token is required' })
  }

  let decoded
  try {
    decoded = decodeToken(body.token)
  } catch (error) {
    console.error('Token decode error:', error)
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  if (!decoded) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  return { token: body.token }
})