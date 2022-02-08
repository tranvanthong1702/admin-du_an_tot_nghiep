import { HTTP_STATUS_CODE } from '../../../../constants'
import { HttpRequest } from '../../../../http/HttpRequest'
import { AlertErrorHelper } from '../../../../helpers/alert.helper'
import { MediaFolder } from '../../../interfaces/models/MediaFolder'

const MediaService = {
  async getFolderRoot(type: string | null = null): Promise<MediaFolder | null> {
    const response = await HttpRequest.GET(`/media/files`, {
      type: type ? type : ''
    })
    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },

  async store(mediaLibraries: any[]): Promise<{ message: string } | null> {
    const response = await HttpRequest.POST(`/media/file/upload-multi`, { files: mediaLibraries })
    if (response.statusCode !== HTTP_STATUS_CODE.CREATED) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  },

  async remove(id: number): Promise<{ message: string } | null> {
    const response = await HttpRequest.DELETE(`/media/file/${id}/remove`)

    if (response.statusCode !== HTTP_STATUS_CODE.OK) {
      AlertErrorHelper({ response })
      return null
    }
    return response.content
  }
}

export default MediaService
