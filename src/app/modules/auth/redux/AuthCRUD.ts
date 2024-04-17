import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'
import { ApiManager } from '../../../../setup/axios/ApiManager'
// import axios from 'axios'

export const GET_USER_BY_ACCESSTOKEN_URL = `/api/user/validate`
export const LOGIN_URL = `/api/user/login`
export const REGISTER_URL = `/auth/register`
export const REQUEST_PASSWORD_URL = `/auth/forgot-password`

// Server should return AuthModel
export function login(username: string, password: string) {
  return ApiManager.post<UserModel>(LOGIN_URL, { data: { username, password } })
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string) {
  return ApiManager.post<AuthModel>(REGISTER_URL, {
    data: {
      email,
      firstname,
      lastname,
      password,
    }
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return ApiManager.post<{result: boolean}>(REQUEST_PASSWORD_URL, { data: { email } })
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return ApiManager.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}
