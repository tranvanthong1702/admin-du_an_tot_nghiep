import { Product } from '../../../interfaces/models/Product'
import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { AlertErrorHelper } from '../../../../helpers/alert.helper'


const ProductService = {
  async list(options: object = {}): Promise<Product[]> {
    try {
      let params: object = {}
      if (options) {
        params = { ...params, ...options }
      }

      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/product`, params)

  
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async store(data: object): Promise<Product | null> {
    const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/product/store`, data)
    return response
  },
  async delete(id: string): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/product/delete/${id}`)
    return response
  },
  async filter(options: object = {}): Promise<Product[]> {
    try {
      let params: object = {}
      if (options) {
        params = { ...params, ...options }
      }

      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/product/filter/admin`, params)

  
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async detail(id: string): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/product/detail/${id}`)
    return response
  },
  async find(id: string): Promise<Product | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/product/detail/${id}`)
    return response
  },
  async update(id: string, data: object): Promise<Product | null> {
    const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/product/update/${id}`, data)
    return response
  },

  async trashed(data: object): Promise<Product | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/product/trashed`, data)
    return response
  },
  async force_delete(id: string): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/product/force-delete/${id}`)
    return response
  },
  async backup_one(id: string): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/product/backup-one/${id}`)
    return response
  },
  async force_delete_all(): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/product/force-delete/all`)
    return response
  },
  async backup_all(): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/product/backup-all`)

 
    return response
  },
  async dashboard(): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/dashboad/analyticts`)
    return response
  }
}
export default ProductService
