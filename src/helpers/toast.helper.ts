import toast from 'toastr'
import 'jquery'
import 'jquery.easing'

const Toast = {
  config() {
    toast.options = {
      hideEasing: 'easeInBack',
      closeEasing: 'easeInBack',
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      onclick: undefined,
      showDuration: 300,
      hideDuration: 1000,
      timeOut: 5000,
      extendedTimeOut: 1000,
      showEasing: 'swing',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    }
  },
  show(status: 'error' | 'info' | 'success' | 'warning', message: string, title?: string) {
    this.config()
    toast[status](message, title)
  }
}

export default Toast
