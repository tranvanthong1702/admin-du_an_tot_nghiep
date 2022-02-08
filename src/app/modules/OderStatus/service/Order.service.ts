import { Order } from '../../../interfaces/models/Order'
import { HttpRequest } from '../../../../http/HttpRequest'

const OrderService = {
  // List Order by Process
  async countProcess(): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/count-process`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async countStatus(): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/count-shop-confirm`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Order by Process
  async list(id: number): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/process/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Detail Order
  async detail(id: number): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Update nhiều order lên đang xử lí
  async updatePendingIDS(ids: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids
    }
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/processing/array_id`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Update 1 order lên đang xử lí
  async updatePendingID(id: any, data: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/processing/id/${id}`, data)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async undoProcess(id: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/backup/process/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Update nhiều order lên chờ giao
  async updatePendingShipIDS(ids: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids
    }
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/await-delivery/array_id`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Update 1 order lên chờ giao
  async updatePendingShipID(id: any, data: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/await-delivery/id/${id}`, data)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Order by Process to listShipper
  async listShipper(id: number, id_shipper: number): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/shipper/${id_shipper}/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Process 1 Shipper
  async listShipperProcess1(id_shipper: number): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/shipper/no-confirm/${id_shipper}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Process 1 Shipper
  async listShipperProcess2(id_shipper: number): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/shipper/delivering/no-shop-confirm/${id_shipper}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Process 1 Shipper
  async listShipperProcess3(id_shipper: number): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/shipper/shipper-confirm/no-shop-confirm/${id_shipper}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  async countShip(id_shipper: number): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/count-mix-process/${id_shipper}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },

  // Update nhiều order lên đang giao
  async updateShippingIDS(ids: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/delivering/array_id`, ids)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Update 1 order lên đang giao
  async updateShippingID(ids: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/delivering/array_id`, ids)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Update note 1 order
  async updateNoteID(id: any, data: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/shop-note/${id}`, data)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Shop Cancel order
  async cancelOrderID(id: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/order/delete/shop-cancel/id/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Cancel orders
  async cancelOrderIDS(ids: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids
    }
    try {
      const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/order/delete/shop-cancel/array_id`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // hủy bàn giao đơn hàng
  async cancelShip(ids: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids
    }
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/cancel-delivering/array_id`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // xác nhận đã nhận đơn hàng theo mảng order_id
  async confirmShip(ids: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids
    }
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/shipper_confirm/array_id`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // giao hàng thành công
  async successOrderShip(id: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/success-order/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Giao hàng thất bại
  async faillOrderShip(id: any, data: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/cancel-order/${id}`, data)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Shipper
  async listShip(): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/role/shipper`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Shipper
  async handingOrderShip(ids: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids
    }
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/shipper-update/shop_confirm`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // List Shop
  async handShop(id: any): Promise<Order[]> {
    try {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/order/shop_confirm/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Confirm Shop
  async confirmShop(ids: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids
    }
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/shop_confirm`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Trashed Shop
  async trashedShop(ids: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids
    }
    try {
      const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/order/delete/array_id`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  },
  // Trashed Shop
  async continueShop(ids: any, process: any): Promise<Order[]> {
    const convertIDS = {
      order_id: ids,
      process_id: parseInt(process)
    }
    try {
      const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/order/update/new-process/array_id`, convertIDS)
      return response
    } catch (error) {
      console.log(error)
      return []
    }
  }
  ,
    async trashed(data: object): Promise<Order | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/oder/deleted/all`, data)
        return response
    }

}
export default OrderService
