import { createError, eventHandler, getRequestHeader } from 'h3'
import { decodeToken, extractTokenFromAuthorizationHeader } from '../../utils/session'
import type { JwtPayload } from '../../utils/session'

export default eventHandler((event) => {
  const authorizationHeader = getRequestHeader(event, 'Authorization')
  if (typeof authorizationHeader === 'undefined') {
    throw createError({ statusCode: 403, message: 'Need to pass valid Bearer-authorization header to access this endpoint' })
  }

  // "Bearer "部分を取り除く
  const requestAccessToken = extractTokenFromAuthorizationHeader(authorizationHeader)
  let decoded: JwtPayload
  try {
    const decodeTokenResult = decodeToken(requestAccessToken)

    if (!decodeTokenResult) {
      throw new Error('Expected decoded JwtPayload to be non-empty')
    }
    decoded = decodeTokenResult
  }
  catch (error) {
    console.error({
      msg: 'Login failed. Here\'s the raw error:',
      error
    })
    throw createError({ statusCode: 403, message: 'You must be logged in to use this endpoint' })
  }

  const { sub, groups, name, exp, iss, jti } = decoded
  return {
    sub,
    groups,
    name,
    exp,
    iss,
    jti,
  }
})
