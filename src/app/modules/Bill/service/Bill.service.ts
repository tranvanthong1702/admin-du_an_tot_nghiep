import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { Area } from '../../../interfaces/models/Area'
import { Bill } from '../../../interfaces/models/Bill'

const BillService = {
  async list(options: object = {}): Promise<Bill[]> {
    try {
      let params: object = {}
      if (options) {
        params = { ...params, ...options }
      }
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/payment/all`, params)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async detail(id: number): Promise<Bill | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/payment/detail/${id}`)
    return response
  },
  async deletePaymentId(id: number): Promise<Bill | null> {
    const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/payment/delete/id/${id}`)
    return response
  },
  async deletePaymentArrayId(ids: any): Promise<Bill[]> {
    const convertIDS = {
      order_id: ids
    }
    const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/payment/delete/array_id/`, convertIDS)
    return response
  }
}

export default BillService
