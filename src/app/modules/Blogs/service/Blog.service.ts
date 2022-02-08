import { Blog } from '../../../interfaces/models/Blog'
import { HttpRequest } from '../../../../http/HttpRequest'

const BlogService = {
    async list(options: object = {}): Promise<Blog[]> {
        try {
            let params: object = {}
            if (options) {
                params = { ...params, ...options }
            }
            const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/blog`, params)
            return response
        } catch (error) {
            console.log(error)
            return []
        }
    },
    async store(data: object): Promise<Blog | null> {
        const response: any = await HttpRequest.POST(`http://127.0.0.1:8000/api/admin/blog/store`, data)
        return response
    },
    async delete(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/blog/delete/${id}`)
        return response
    },
    async find(id: string): Promise<Blog | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/blog/detail/${id}`)
        return response
    },
    async update(id: string, data: object): Promise<Blog | null> {
        const response: any = await HttpRequest.PUT(`http://127.0.0.1:8000/api/admin/blog/update/${id}`, data)
        return response
    },
    async trashed(data: object): Promise<Blog | null> {
        const response: any = await HttpRequest.GET(`http://127.0.0.1:8000/api/admin/blog/trashed`, data)
        return response
    },
    async force_delete(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.DELETE(`http://127.0.0.1:8000/api/admin/blog/force-delete/${id}`)
        return response
    },
    async backup_one(id: string): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/blog/backup-one/${id}`)
        return response
    },
    async force_delete_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/blog/force-delete/all`)
        return response
    },
    async backup_all(): Promise<{ message: string } | null> {
        const response: any = await HttpRequest.OPTIONS(`http://127.0.0.1:8000/api/admin/blog/backup-all`)
        return response
    }
}
export default BlogService
