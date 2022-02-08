import { User } from './User'
import { PackageHistory } from './PackageHistory'
import { Group } from './Group'

export interface Area {
  _id: string
  name: string
  description: string | null
  archive: boolean
  thumbnail: string | null
  owner: User
  members: User[]
  currentPackage: PackageHistory
  createdAt: string
  updatedAt: string | null
  groups: Group[]
  isOwner?: boolean
  progress: number
}
