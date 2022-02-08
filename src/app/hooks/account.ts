import { User } from '../interfaces/models/User'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export function useIsYou(userId: string): boolean {
  const [isYou, setIsYou] = useState<boolean>(false)
  const { user }: any = useSelector<{ auth: { user: User } }>((state) => state.auth)
  useEffect(() => {
    if (user && user._id === userId) {
      setIsYou(true)
    } else {
      setIsYou(false)
    }
  }, [user, userId])

  return isYou
}
