import { AxiosRequestConfig } from 'axios'
import { handleError } from './HandleException'
import CreateHttp from './config/index'

export interface HttpResponse {
  content: any
  statusCode: number
}

const POST = (url: string, data: any = {}, configs: AxiosRequestConfig = {}): Promise<HttpResponse> => {
  return CreateHttp()
    .post(url, data, {
      timeout: 30000,
      ...configs
    })
    .then(({ data }) => data)
    .catch(handleError)
}

const GET = (url: string, params: object = {}, configs: AxiosRequestConfig = {}): Promise<HttpResponse> => {
  return CreateHttp()
    .get(url, {
      params,
      ...configs
    })
    .then(({ data }) => data)
    .catch(handleError)
}

const PUT = (url: string, data: any = {}, configs = {}): Promise<HttpResponse> => {
  return CreateHttp()
    .put(url, data, {
      timeout: 30000,
      ...configs
    })
    .then(({ data }) => data)
    .catch(handleError)
}

const PATCH = (url: string, data: any = {}, configs: AxiosRequestConfig = {}): Promise<HttpResponse> => {
  return CreateHttp()
    .patch(url, data, {
      timeout: 30000,
      ...configs
    })
    .then(({ data }) => data)
    .catch(handleError)
}

const DELETE = (url: string, params: object = {}, configs: AxiosRequestConfig = {}): Promise<HttpResponse> => {
  return CreateHttp()
    .delete(url, {
      params,
      timeout: 30000,
      ...configs
    })
    .then(({ data }) => data)
    .catch(handleError)
}
const OPTIONS = (url: string, params: object = {}, configs: AxiosRequestConfig = {}): Promise<HttpResponse> => {
  return CreateHttp()
    .options(url, {
      params,
      ...configs
    })
    .then(({ data }) => data)
    .catch(handleError)
}

export const HttpRequest = {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  OPTIONS
}
