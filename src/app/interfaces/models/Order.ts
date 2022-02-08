export interface Order {
  id: number
  user_id: number
  voucher_id: number
  shipper_id: number
  process_id: number
  code_orders: string
  total_price: number
  customer_name: string
  customer_phone: string
  customer_address: string
  customer_note: string
  transportation_costs: number
  payments: number
  shop_confirm: number
  shipper_confirm: number
  shop_note: string
  cancel_note: string
}