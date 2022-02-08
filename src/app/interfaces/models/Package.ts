import { Currency } from './Currency'

export interface Package {
  _id: string
  name: string
  exp: number
  description: string
  image: string
  originPrice: Currency
  price: Currency
}
