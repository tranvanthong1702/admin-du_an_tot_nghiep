import { APP_NAME } from '../configs'

const AppHelper = {
  setTitle(title: string): void {
    document.title = `${title} | ${APP_NAME}`
  }
}

export default AppHelper
