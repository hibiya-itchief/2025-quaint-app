import { sign, verify } from 'jsonwebtoken'

const PRIVATE_KEY = process.env.PRIVATE_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY

//型宣言
export interface User {
  sub: string
  groups: string[]
  name: string
}

//型宣言（Userを継承）
export interface JwtPayload extends User {
  exp: number
  iss: string
  jti: string
}

//アクセス・リフレッシュトークンの対応関係を管理
interface TokensByUser {
  access: Map<string, string>
  refresh: Map<string, string>
}

//型宣言
interface UserTokens {
  accessToken: string
  refreshToken: string
}

/**
 * Function for getting the data from a JWT
 */
//解読
export function decodeToken(token: string): JwtPayload | undefined {
  return verify(token, PUBLIC_KEY as string) as JwtPayload | undefined
}

type CheckUserTokensResult = { valid: true, knownAccessToken: string } | { valid: false, knownAccessToken: undefined }

/**
 * Function for checking the validity of the access/refresh token pair.
 * Your implementation will probably use the DB call.
 * @param tokensByUser A helper for demo purposes
 */
//リフレッシュトークンとアクセストークンのペアが正しいかどうかを検証
export function checkUserTokens(tokensByUser: TokensByUser, requestAccessToken: string, requestRefreshToken: string): CheckUserTokensResult {
  const knownAccessToken = tokensByUser.refresh.get(requestRefreshToken)

  return {
    valid: !!knownAccessToken && knownAccessToken === requestAccessToken,
    knownAccessToken
  } as CheckUserTokensResult
}

export function checkUserAccessToken(tokensByUser: TokensByUser, requestAccessToken: string): CheckUserTokensResult {
  const knownAccessToken = tokensByUser.access.has(requestAccessToken) ? requestAccessToken : undefined

  return {
    valid: !!knownAccessToken,
    knownAccessToken
  } as CheckUserTokensResult
}

//指定したトークンを無効化
export function invalidateAccessToken(tokensByUser: TokensByUser, accessToken: string) {
  tokensByUser.access.delete(accessToken)
}

export function refreshUserAccessToken(tokensByUser: TokensByUser, refreshToken: string): Promise<UserTokens | undefined> {
  // リフレッシュトークンに対応する古いアクセストークンを取得
  const oldAccessToken = tokensByUser.refresh.get(refreshToken)
  if (!oldAccessToken) {
    // 対応するアクセストークンがなければ undefined を返す
    return Promise.resolve(undefined)
  }

  // 古いアクセストークンを無効化（削除）
  invalidateAccessToken(tokensByUser, oldAccessToken)

  //リフレッシュトークンからユーザー情報を復元（JWTをデコード）
  const jwtUser = decodeToken(refreshToken)
  if (!jwtUser) {
    return Promise.resolve(undefined)
  }

  //ユーザー情報を作成
  const user: User = {
    sub: jwtUser.sub,
    groups: jwtUser.groups,
    name: jwtUser.name
  }

  //新しいアクセストークンを発行（有効期限5分）
  const accessToken = sign({ ...user, scope: ['test', 'user'] }, PRIVATE_KEY as string, {
    expiresIn: 60 * 5 // 5 minutes
  })
  // 新しいアクセストークンとリフレッシュトークンの対応関係を保存
  tokensByUser.refresh.set(refreshToken, accessToken)
  tokensByUser.access.set(accessToken, refreshToken)

  //新しいトークンを返す
  return Promise.resolve({
    accessToken,
    refreshToken
  })
}

// HTTPリクエストのAuthorizationヘッダーからトークン部分だけを抜き出す
export function extractTokenFromAuthorizationHeader(authorizationHeader: string): string {
  return authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.slice(7)
    : authorizationHeader
}
