import { HTTP_STATUS_CODE } from '../../../../constants'
import { Area } from '../../../interfaces/models/Area'
import { Group } from '../../../interfaces/models/Group'
import { HttpRequest } from '../../../../http/HttpRequest'
import { User } from '../../../interfaces/models/User'
import { AlertErrorHelper } from '../../../../helpers/alert.helper'
import { Project } from '../../../interfaces/models/Project'

const AreaService = {
  async list(options: object = {}): Promise<Area[]> {
    let params: object = {}
    if (options) {
      params = { ...params, ...options }
    }
    const response = await HttpRequest.GET(`/area/list`, params)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return []
    }
    return response.content
  },
  async find(id: string): Promise<Area | null> {
    const response = await HttpRequest.GET(`/area/${id}/detail`)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async store(data: object): Promise<Area | null> {
    const response = await HttpRequest.POST(`/area/create`, data)
    if (![HTTP_STATUS_CODE.CREATED, HTTP_STATUS_CODE.OK].includes(response.statusCode)) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async update(id: string, data: object): Promise<Area | null> {
    const response = await HttpRequest.PUT(`/area/${id}/info/update`, data)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async delete(id: string): Promise<{ message: string } | null> {
    const response = await HttpRequest.DELETE(`/area/${id}/delete`)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async archive(id: string): Promise<{ message: string } | null> {
    const response = await HttpRequest.PATCH(`/area/${id}/archive`)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async groups(id: string): Promise<Group[]> {
    const response = await HttpRequest.GET(`/area/${id}/teams`)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return []
    }
    return response.content
  },
  async groupStore(id: string, data: object): Promise<Group | null> {
    const response = await HttpRequest.POST(`/area/${id}/team/create`, data)
    if (response.statusCode !== HTTP_STATUS_CODE.CREATED) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async groupUpdate(groupId: string, data: object): Promise<Group | null> {
    const response = await HttpRequest.PUT(`/team/${groupId}/update`, data)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async groupFind(id: string): Promise<Group | null> {
    const response = await HttpRequest.GET(`/team/${id}/detail`)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async groupAddMember(groupId: string, email: string): Promise<{ message: string }> {
    const response = await HttpRequest.PATCH(`/team/${groupId}/member/add`, {
      email
    })
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return response.content
    }
    return response.content
  },
  async members(id: string): Promise<User[]> {
    const response = await HttpRequest.GET(`/area/${id}/members`)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return []
    }
    return response.content
  },
  async groupDelete(id: string): Promise<{ message: string } | null> {
    const response = await HttpRequest.DELETE(`/team/${id}/delete`)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async createProject(id: string, values: object): Promise<Project | null> {
    const response = await HttpRequest.POST(`/area/${id}/project/create`, values)
    if (response.statusCode !== HTTP_STATUS_CODE.CREATED) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },
  async projects(id: string): Promise<Project[]> {
    const response = await HttpRequest.GET(`/area/${id}/projects`)
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return []
    }
    return response.content
  }
}

export default AreaService
