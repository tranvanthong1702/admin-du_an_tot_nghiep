import { HttpRequest } from '../../../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { Area } from '../../../interfaces/models/Area'
import { Shipping } from '../../../interfaces/models/Shipping'
const ShippingPriceService = {
    async list(options: object = {}): Promise<Shipping[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/transport/provinces`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    }
    , async update(data: object): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/transport/update`, data)
        return response
    }
    , async edit(options: object = {}): Promise<Shipping[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/transport/edit`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    }
    , async reset(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/transport/reset`)
        return response
    }

}

export default ShippingPriceService
