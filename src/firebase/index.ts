import moment from 'moment'
import firebase from './config'

interface MediaResponse {
  url: string
  name: string
  size: number
  type: string
}

interface UploadSingle {
  file: MediaResponse
  progress: number
}

interface UploadMultiple {
  files: MediaResponse[]
  progress: number
}

const FirebaseStorage = {
  getPath(path: string) {
    return `${moment().format('YYYY')}/${path}/${moment().format('DD-MM')}`
  },
  async upload(file: File, path = 'upload'): Promise<UploadSingle> {
    let progress: number = 0
    const pathTo = this.getPath(path)

    const storageRef = firebase.storage().ref(`${pathTo}/${file.name}`)
    const data: MediaResponse = await storageRef.put(file).then(async (snapshot) => {
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      const metadata = await storageRef.getMetadata()
      const url = await storageRef.getDownloadURL()
      return { url, size: metadata.size, type: metadata.contentType, name: metadata.name }
    })
    return { file: data, progress }
  },
  async uploadMultiple(files: File[], path = 'upload'): Promise<UploadMultiple> {
    const pathTo = this.getPath(path)
    let progress = 0

    const mediaResponse: MediaResponse[] = await Promise.all(
      files.map(async (file) => {
        const storageRef = firebase.storage().ref(`${pathTo}/${file.name}`)
        return storageRef.put(file).then(async (snapshot) => {
          progress += ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / files.length
          const metadata = await storageRef.getMetadata()
          const url = await storageRef.getDownloadURL()
          return { url, size: metadata.size, type: metadata.contentType, name: metadata.name }
        })
      })
    )

    return { files: mediaResponse, progress }
  }
}

export default FirebaseStorage
