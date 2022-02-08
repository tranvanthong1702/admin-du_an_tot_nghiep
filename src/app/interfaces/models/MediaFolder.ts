import { User } from './User'
import { MediaLibrary } from './MediaLibrary'

export interface MediaFolder {
  _id: string
  name: string
  slug: string
  isRoot: boolean
  files: MediaLibrary[]
  createdBy: User
  sharedUsers: User[]
}
