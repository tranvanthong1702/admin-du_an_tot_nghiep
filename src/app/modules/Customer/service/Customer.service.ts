import { Customer } from '../../../interfaces/models/Customer'
import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { AlertErrorHelper } from '../../../../helpers/alert.helper'
import { Area } from '../../../interfaces/models/Area'

const CustomerService = {
    async list(options: object = {}): Promise<Customer[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/user`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    },
    async search(data : object): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/user`, data)
        return response
    }
    ,
    async delete(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/user/delete/${id}`)
        return response
    },
    async trashed(data: object): Promise<Customer | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/user/trashed/all`, data)
        return response
    },
    async backup_one(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/user/backup-one/${id}`)
        return response
    }
    ,
    async delete_force(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/user/force-delete/${id}`)
        return response
    },
    async backup_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/user/backup-all`)
        return response
    },
    async force_delete_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/user/force-delete/all`)
        return response
    },
    async set_role(id: string,data : object): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/user/syncRoles/${id}`, data)
        return response
    },
    async find(id: string): Promise<Customer | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/user/detail/${id}`)
        return response
    },
    async listRole(options: object = {}): Promise<Customer[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/user/role/all`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    },async filter(): Promise<Customer | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/user/filter`)
        return response
    }

}
export default CustomerService
