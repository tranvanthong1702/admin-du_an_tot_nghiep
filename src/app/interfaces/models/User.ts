export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  avatar: string | null
  birthday: string | null
  address: string | null
  gender: string | null
}

export function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`
}
