export interface Bill {
  id: number
  order_id: number
  paymentID: number
  requestID: number
  transID: number
  amount: string
  resultCode: string
  message: string
  payType: string
  orderInfo: string
  requestType: string
}