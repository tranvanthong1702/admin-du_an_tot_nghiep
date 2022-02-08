import { Slide } from '../../../interfaces/models/Slide'
import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { AlertErrorHelper } from '../../../../helpers/alert.helper'
import { Area } from '../../../interfaces/models/Area'

const SlideService = {
    async list(options: object = {}): Promise<Slide[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/slide`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    },
    async add(data : object): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/slide/store`,data)
        return response
    },
    async delete(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/slide/delete/${id}`)
        return response
    },

    async update(id: string, data: object): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/slide/update/${id}`, data)
        return response
    },
    async find(id: string): Promise<Slide | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/slide/detail/${id}`)
        return response
    },
    async store(data: object): Promise<Slide | null> {
        const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/slide/store`, data)
        return response
    },
    async trashed(data: object): Promise<Slide | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/category/trashed`, data)
        return response
    },
    async force_delete(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/category/force-delete/${id}`)
        return response
    },
    async backup_one(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/category/backup-one/${id}`)
        return response
    },
    async force_delete_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/category/force-delete/all`)
        return response
    },
    async backup_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/category/backup-all`)
        return response
    }

}
export default SlideService
