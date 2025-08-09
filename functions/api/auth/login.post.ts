import { createError, eventHandler, readBody } from 'h3'
import { decodeToken } from '../../utils/session'

export default eventHandler(async (event) => {
  // リクエストボディを受け取る
  const body = await readBody(event)
  //tokenが含まれていたら
  if (body.token) {
    // JWTをデコードして検証
    const decoded = decodeToken(body.token)
    console.log('Decoded token:', decoded)
    //decodedがnullやundefinedの場合
    if (!decoded) {
      throw createError({
        statusCode: 401,
        message: 'Invalid token'
      })
    }
    
    return { token: body.token }
  }
})
