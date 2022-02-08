import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { AlertErrorHelper } from '../../../../helpers/alert.helper'
import { Comment } from 'app/interfaces/models/Comment'


const CommentService = {
  async list(options: object = {}): Promise<Comment[]> {
    try {
      let params: object = {}
      if (options) {
        params = { ...params, ...options }
      }

      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/comment`, params)

  
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async delete(id: string): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/comment/delete/${id}`)
    return response
  },
  async detail(id: string): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/comment/detail/${id}`)
    return response
  },
  async find(id: string): Promise<Comment | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/comment/detail/${id}`)
    return response
  },
  async trashed(data: object): Promise<Comment | null> {
    const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/comment/trashed`, data)
    return response
  },
  async force_delete(id: string): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/comment/force-delete/${id}`)
    return response
  },
  async backup_one(id: string): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/comment/backup-one/${id}`)
    return response
  },
  async force_delete_all(): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/comment/force-delete/all`)
    return response
  },
  async backup_all(): Promise<{ message: string } | null> {
    const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/comment/backup-all`)

 
    return response
  }
}
export default CommentService
