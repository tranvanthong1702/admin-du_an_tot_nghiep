import { User } from './User'
import { MediaFolder } from './MediaFolder'

export interface MediaLibrary {
  _id: string
  name: string
  type: string
  url: string
  caption: string | null
  sharedUsers: User[]
  createdBy: User
  folder: MediaFolder
  createdAt: string
  updatedAt: string | null
}
