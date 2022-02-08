import React, { useCallback, useEffect, useState } from 'react'
import DataTableTrashed from '../../../components/global/datatable/DatatableTrashed.component'
import { Link, useHistory } from 'react-router-dom'
import BlogService from '../service/Blog.service'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
function BlogTrashedPage() {
  const [blogs, setBlogs] = useState([])
  const [success, setSuccess] = useState([])
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)

  const history = useHistory()
  useEffect(() => {
    const getTrashed = async () => {
      try {
        const { success } = await BlogService.trashed()
        setSuccess(success)
        const { data } = await BlogService.trashed()
        setBlogs(data)
      } catch (error) {
        console.log(error)
      }
    }
    getTrashed()
  }, [])

  const handlerBackup = async (id, title) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn khôi phục ${title}?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        BlogService.backup_one(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setBlogs(blogs.filter((item) => item.id !== id))
    }
  }
  const handlerBackupAll = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn khôi phục tất cả?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        BlogService.backup_all()
        setLoading(false)
      }, DATA_LOAD_TIME)
      setBlogs(blogs)
    }
    history.push('/blogs/list')
  }
  const handlerDelete = async (id, title) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn xóa vĩnh viễn ${title}?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        BlogService.force_delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setBlogs(blogs.filter((item) => item.id !== id))
    }
  }
  const handlerDeleteAll = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn xóa vĩnh viễn các bài viết trong lưu trữ`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        BlogService.force_delete_all()
        setLoading(false)
      }, DATA_LOAD_TIME)
      setBlogs(blogs.map((item) => item.id !== id))
    }
    history.push('/blogs/list')
  }

  return (
    <DataTableTrashed
      title="Danh sách lưu trữ"
      subTitle="Danh sách bài viết đã lưu trữ"
      metadata={metadata}
      toolbar={
        <Link type="button" to="/blogs/list" className="btn btn-light">
          <i className="fa fa-arrow-left" />
          Trở lại
        </Link>
      }
      thead={
        <tr className="datatable-row" style={{ left: '0px' }}>
          <th data-field="#" className="datatable-cell datatable-cell-sort" width={`5%`}>
            <span>#</span>
          </th>
          <th data-field="title" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Tên</span>
          </th>
          <th data-field="image" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Ảnh</span>
          </th>
          <th data-field="content" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Nội dung</span>
          </th>

          <th data-field="action" className="datatable-cell datatable-cell-sort">
            <span>Thao tác</span>
          </th>
          <th>
            <button
              onClick={() => handlerBackupAll()}
              type="button"
              className="btn btn-success font-weight-bolder font-size-sm"
              title="backup"
            >
              {' '}
              Khôi phục tất cả{' '}
            </button>
            <button
              onClick={() => handlerDeleteAll()}
              type="button"
              className="btn btn-danger font-weight-bolder font-size-sm"
              title="Delete"
            >
              {' '}
              Xóa tất cả
            </button>
          </th>
        </tr>
      }
      tbody={
        success ? (
          blogs.map((data, index) => (
            <tr key={index} data-row={1} className="datatable-row datatable-row-even" style={{ left: '0px' }}>
              <td data-field="#" aria-label="null" className="datatable-cell" width={`5%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                </span>
              </td>
              <td data-field="title" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.title}</p>
                </span>
              </td>
              <td data-field="image" aria-label="null" className="datatable-cell" width={`15%`}>
                <img src={data.image} width="120px" />
              </td>
              <td data-field="content" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.content.slice(0, 12)}</p>
                </span>
              </td>
              <td data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
                <button
                  onClick={() => handlerBackup(data.id, data.title)}
                  type="button"
                  className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                  title="Backup"
                >
                  Khôi phục{' '}
                </button>
                <button
                  onClick={() => handlerDelete(data.id, data.title)}
                  type="button"
                  className="btn btn-sm btn-default btn-text-primary btn-hover-danger"
                  title="Delete"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <div>
              <div className="text-center">
                <i className="fas fa-database" />
              </div>
              <div>Không có dữ liệu</div>
            </div>
          </div>
        )
      }
      options={options}
      setOptions={setOptions}
      loading={loading}
    />
  )
}

export default BlogTrashedPage
