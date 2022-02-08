export interface Product {
  _id: string
  name: string
  image: string
  cate_id: number
  price: number
  sale: number
  desc_short: string
  description: string
  status : boolean
  expiration_date : Date
}