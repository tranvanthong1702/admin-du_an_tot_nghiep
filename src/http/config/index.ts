import axios, { AxiosInstance } from 'axios'
import { API_ENDPOINT } from '../../configs'
import { ACCESS_TOKEN_KEY } from '../../constants'

function CreateHttp(): AxiosInstance {
  const authToken = localStorage.getItem("ACCESS_TOKEN_KEY")
  let headers: object = {
    'Content-Type': 'application/json'
  }
  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken.replaceAll('"', '')}` }
  }
  return axios.create({
    baseURL: API_ENDPOINT,
    headers,
    timeout: 30000,
    timeoutErrorMessage: 'Máy chủ không có phản hồi'
  })
}

export default CreateHttp
