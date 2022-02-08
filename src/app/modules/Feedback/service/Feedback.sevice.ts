import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { Feedback } from 'app/interfaces/models/Feedback'


const FeedbackService = {
  async list(options: object = {}): Promise<Feedback[]> {
    try {
      let params: object = {}
      if (options) {
        params = { ...params, ...options }
      }
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/feedback`, params)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async filter(): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/feedback/filter`)
    return response
  },
  async analytics(month : any, year : any): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/feedback/analytics/${month}/${year}`)
    return response
  }
}
export default FeedbackService
