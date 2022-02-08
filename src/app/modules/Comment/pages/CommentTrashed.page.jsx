import React, { useCallback, useEffect, useState } from 'react'
import DataTableTrashed from '../../../components/global/datatable/DatatableTrashed.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import { Link, useHistory } from 'react-router-dom'
import CommentService from '../service/Comment.service'

function CommentTrashedPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [comments, setComments] = useState([])
  const [success, setSuccess] = useState([])

  const history = useHistory()

  useEffect(() => {
    const getTrashed = async () => {
      try {
        const { success } = await CommentService.trashed()
        setSuccess(success)
        const { data } = await CommentService.trashed()
        setComments(data)
      } catch (error) {
        console.log(error)
      }
    }
    getTrashed()
  }, [])

  const handlerDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Do you want delete ${name}`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        CommentService.delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setComments(comments.filter((item) => item.id !== id))
    }
  }
  const handlerDeleteAll = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Do you want delete`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        CommentService.force_delete_all()
        setLoading(false)
      }, DATA_LOAD_TIME)
      setComments(comments.map((item) => item.id !== id))
    }
    history.push('/comment/list')
  }
  const handlerBackup = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Do you want backup ${name}`)
    if (result) {
      // const { data } = categories
      setLoading(true)
      setTimeout(() => {
        CommentService.backup_one(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setComments(comments.filter((item) => item.id !== id))
    }
  }
  const handlerBackupAll = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Do you want backup all`)
    if (result) {
      // const { data } = categories
      setLoading(true)
      setTimeout(() => {
        CommentService.backup_all()
        setLoading(false)
      }, DATA_LOAD_TIME)
      setComments(comments)
    }
    history.push('/comment/list')
  }
  return (
    <DataTableTrashed
      title="Danh sách lưu trữ bình luận"
      subTitle="Danh sách bình luận đã lưu trữ"
      metadata={metadata}
      toolbar={
        <Link type="button" to="/comment/list" className="btn btn-light">
          <i className="fa fa-arrow-left" />
          Trở lại
        </Link>
      }
      thead={
        <tr className="datatable-row" style={{ left: '0px' }}>
          <th data-field="#" className="datatable-cell datatable-cell-sort" width={`5%`}>
            <span>#</span>
          </th>
          <th data-field="user_id" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>ID tài khoản</span>
          </th>
          <th data-field="pro_id" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>ID sản phẩm</span>
          </th>
          <th data-field="content" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Nội dung</span>
          </th>
          <th data-field="vote" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Điểm</span>
          </th>
          <th>
            <button
              onClick={() => handlerBackupAll()}
              type="button"
              className="btn btn-success font-weight-bolder font-size-sm"
              title="Delete"
            >
              {' '}
              Khôi phục tất cả
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
          comments.map((data, index) => (
            <tr key={index} data-row={1} className="datatable-row datatable-row-even" style={{ left: '0px' }}>
              <td data-field="#" aria-label="null" className="datatable-cell" width={`5%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                </span>
              </td>
              <td data-field="user_id" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.user_id}</p>
                </span>
              </td>
              <td data-field="pro_id" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.pro_id}</p>
                </span>
              </td>

              <td data-field="content" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.content}</p>
                </span>
              </td>
              <td data-field="vote" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.vote}</p>
                </span>
              </td>
              <td data-field="status" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.status}</p>
                </span>
              </td>
              <td data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
                <button
                  onClick={() => handlerBackup(data.id, data.name)}
                  type="button"
                  className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                  title="Backup"
                >
                  Khôi phục
                </button>
                <button
                  onClick={() => handlerDelete(data.id, data.name)}
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

export default CommentTrashedPage
