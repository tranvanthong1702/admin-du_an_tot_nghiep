import axios from 'axios'
import { API_ENDPOINT } from '../../../../configs'
import { HttpRequest } from '../../../../http/HttpRequest'

export const LOGIN_URL = `${API_ENDPOINT}/auth/login`
export const LOGOUT_URL = `${API_ENDPOINT}/auth/logout`
export const REGISTER_URL = `${API_ENDPOINT}/auth/register`
export const REQUEST_PASSWORD_URL = `${API_ENDPOINT}/auth/forgot-password`

export const ME_URL = `${API_ENDPOINT}/auth/profile`

export async function login(email, password) {
  return axios.post('http://127.0.0.1:8000/api/auth/login', { email, password }).then(({ data }) => data.data)
}

export async function register(email, firstName, lastName, password, passwordConfirmation) {
  return axios
    .post(REGISTER_URL, {
      email,
      firstName,
      lastName,
      password,
      passwordConfirmation
    })
    .then(({ data }) => data.content)
}

export async function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email })
}

export async function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return HttpRequest.GET(ME_URL).then(({ content }) => {
    console.log(content)
    return content
  })
}

export async function logout() {
  const toggle = document.getElementById('kt_quick_user_toggle')
  if (toggle) {
    toggle.click()
  }
  window.location.replace('/logout')
  
}
