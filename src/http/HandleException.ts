import { AxiosError } from 'axios'
import { logout } from '../app/modules/Auth/_redux/authCrud'
import { HttpResponse } from './HttpRequest'
import { HTTP_STATUS_CODE } from '../constants'
import { AlertHelper } from '../helpers/alert.helper'

export const handleError = async (error: AxiosError): Promise<HttpResponse> => {
  const { status, response } = error.request
  if (!status || !response) {
    return {
      statusCode: 500,
      content: {
        message: 'Internal Server Error',
        error: 'Internal Server Error'
      }
    }
  }
  if (status === HTTP_STATUS_CODE.UNAUTHORIZED) {
    await logout()
    AlertHelper({ type: 'warning', title: JSON.parse(response).message || 'Oops, something went wrong!' })
  }
  return JSON.parse(response)
}
