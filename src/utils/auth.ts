import auth0, { WebAuth } from "auth0-js"
import { navigate } from "gatsby"

export interface User {
  name: string
}

interface Tokens {
  accessToken?: string
  idToken?: string
  expiresAt?: number
}

const isBrowser = typeof window !== "undefined"

const auth: WebAuth | {} = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN as string,
      clientID: process.env.AUTH0_CLIENTID as string,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

const tokens: Tokens = {}

let user: User = {} as User

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  ;(auth as WebAuth).authorize()
}

export const logout = () => {
  localStorage.setItem("isLoggedIn", "false")
  ;(auth as WebAuth).logout({})
}

const setSession = (cb = () => {}) => (err: any, authResult: any) => {
  if (err) {
    navigate("/")
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem("isLoggedIn", "true")
    navigate("/account")
    cb()
  }
}

export const getProfile = (): User => {
  return user
}
export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  ;(auth as WebAuth).parseHash(setSession())
}

export const silentAuth = (callback: () => void) => {
  if (!isAuthenticated()) return callback()
  ;(auth as WebAuth).checkSession({}, setSession(callback))
}
