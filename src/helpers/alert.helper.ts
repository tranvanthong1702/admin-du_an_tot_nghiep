import Swal from 'sweetalert2'
import { HttpResponse } from '../http/HttpRequest'
import Toast from './toast.helper'

interface AlertHelperOptions {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
}

interface AlertErrorParams {
  response: HttpResponse
  callback?(): void
}

export function AlertErrorHelper(alertErrorParams: AlertErrorParams): void {
  const { response, callback } = alertErrorParams
  Swal.fire({
    icon: 'error',
    title: response.content.message,
    text: response.content.error
  }).then(() => {
    if (callback) {
      callback()
    }
  })
}

export function AlertHelper(options: AlertHelperOptions): void {
  Toast.show(
    options.type,
    options.description ? options.description : options.title,
    options.description ? options.title : undefined
  )
}
