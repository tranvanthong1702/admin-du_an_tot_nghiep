import { Category } from '../../../interfaces/models/Category'
import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { AlertErrorHelper } from '../../../../helpers/alert.helper'
import { Area } from '../../../interfaces/models/Area'

const CategoryService = {
    async list(options: object = {}): Promise<Category[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/category`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    },
    async store(data: object): Promise<Category | null> {
        const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/category/store`, data)
        return response
    },
    async delete(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/category/delete/${id}`)
        return response
    },
    async find(id: string): Promise<Category | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/category/detail/${id}`)
        return response
    },
    async update(id: string, data: object): Promise<Category | null> {
        const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/category/update/${id}`, data)
        return response
    },
    async trashed(data: object): Promise<Category | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/category/trashed`, data)
        return response
    },
    async force_delete(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/category/force-delete/${id}`)
        return response
    },
    async backup_one(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/category/backup-one/${id}`)
        return response
    },
    async force_delete_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/category/force-delete/all`)
        return response
    },
    async backup_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/category/backup-all`)
        return response
    },
    async show(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/category/detail/${id}`)
        return response
    }, async list_pro(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/category/product/${id}`)
        return response
    }




}
export default CategoryService
