import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { Area } from '../../../interfaces/models/Area'
import { Voucher } from '../../../interfaces/models/Voucher'
const VoucherService = {
    async list(options: object = {}): Promise<Voucher[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/voucher`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    }
    ,async listAt(options: object = {}): Promise<Voucher[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/voucher/active`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    },async listNt(options: object = {}): Promise<Voucher[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/voucher/no-active`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    },
    async add(data: object): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/voucher/store`, data)
        return response
    },
    async delete(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/voucher/delete/${id}`)
        return response
    },
    async update(id: string, data: object): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/voucher/update/${id}`, data)
        return response
    },
    async find(id: string): Promise<Voucher | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/voucher/detail/${id}`)
        return response
    },
    async trashed(data: object): Promise<Voucher | null> {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/voucher/trashed`, data)
      return response
    },
    async delete_force(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/voucher/force-delete/${id}`)
        return response
    },
    async get_voucher(options: object = {}): Promise<Voucher[]> {
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/voucher/classify_vouchers/all`)
            return response
    },
    async force_delete_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/voucher/force-delete/all`)
        return response
    },
    async planning(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/voucher/planning/${id}`)
        return response
    }
    ,
    async unplanning(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/voucher/no-planning/${id}`)
        return response
    }

}

export default VoucherService
