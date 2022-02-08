import { Area } from './Area'
import { User } from './User'

export interface Group {
  _id: string
  name: string
  description: string | null
  thumbnail: string | null
  area: Area
  managers: User[]
  members: User[]
  status: number
}
