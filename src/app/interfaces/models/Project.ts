import { User } from './User'
import { Area } from './Area'

interface Group {
  name: string
  members: User[]
}

export interface Project {
  name: string
  description?: string
  thumbnail?: string
  groups: any[]
  managers: Group[]
  area: Area
  createdBy: User
  createdAt: number
  updatedAt: number
}
