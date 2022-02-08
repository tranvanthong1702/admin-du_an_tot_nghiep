import { HttpRequest } from '../../../../http/HttpRequest'
import { User } from '../../../interfaces/models/User'
import { HTTP_STATUS_CODE } from '../../../../constants'
import { Area } from '../../../interfaces/models/Area'
const UserService = {
  search(params: { keyword: string; areaId?: string }): Promise<User[]> {
    return HttpRequest.GET('account/search', params).then((res) => {
      if (res.statusCode === HTTP_STATUS_CODE.OK) {
        return res.content
      } else {
        return []
      }
    })
  },
  async add(data : object): Promise<{ message: string } | null> {
      const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/info-user/store`,data)
      return response
  },
  async update(id: string, data: object): Promise<Area | null> {
    const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/info-user/update/${id}`, data)
    return response
  },
  async find(id: string): Promise<User | null> {
      const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/user/detail/${id}`)
      return response
  }
  
}

export default UserService