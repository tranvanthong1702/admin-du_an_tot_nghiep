import React, { useCallback, useEffect, useState } from 'react'
import DataTableTrashed from '../../../components/global/datatable/DatatableTrashed.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import { Link, useHistory } from 'react-router-dom'
import CategoryService from '../service/Category.service'

function CategoryTrashedPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [categories, setCategories] = useState([])
  const [success, setSuccess] = useState([])

  const history = useHistory()

  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  useEffect(() => {
    const getTrashed = async () => {
      try {
        const { success } = await CategoryService.trashed()
        setSuccess(success)
        const { data } = await CategoryService.trashed()
        setCategories(data)
      } catch (error) {
        console.log(error)
      }
    }
    getTrashed()
  }, [])

  const handlerBackup = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn có muốn khôi phục ${name}?`)
    if (result) {
      // const { data } = categories
      setLoading(true)
      setTimeout(() => {
        CategoryService.backup_one(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setCategories(categories.filter((item) => item.id !== id))
    }
  }
  const handlerBackupAll = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn có muốn khôi phục tất cả`)
    if (result) {
      // const { data } = categories
      setLoading(true)
      setTimeout(() => {
        CategoryService.backup_all()
        setLoading(false)
      }, DATA_LOAD_TIME)
      setCategories(categories)
    }
    history.push('/category/list')
  }
  const handlerDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn xóa vĩnh viễn ${name} ?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        CategoryService.force_delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setCategories(categories.filter((item) => item.id !== id))
    }
  }
  const handlerDeleteAll = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn xóa vĩnh viễn các danh mục lưu trữ?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        CategoryService.force_delete_all()
        setLoading(false)
      }, DATA_LOAD_TIME)
      setCategories(categories.map((item) => item.id !== id))
    }
    history.push('/category/list')
  }

  return (
    <DataTableTrashed
      title="Lưu trữ"
      subTitle="Danh sách danh mục lưu trữ"
      metadata={metadata}
      toolbar={
        <Link type="button" to="/category/list" className="btn btn-light">
          <i className="fa fa-arrow-left" />
          Trở lại
        </Link>
      }
      thead={
        <tr className="datatable-row" style={{ left: '0px' }}>
          <th data-field="#" className="datatable-cell datatable-cell-sort" width={`5%`}>
            <span>#</span>
          </th>
          <th data-field="name" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Tên danh mục</span>
          </th>
          <th data-field="status" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>SL sản phẩm</span>
          </th>

          <th data-field="status" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Ngày tạo</span>
          </th>
          <th data-field="status" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Ngày cập nhật</span>
          </th>
          <th data-field="action" className="datatable-cell datatable-cell-sort">
            <span>Thao tác</span>
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
              Xóa tất cả{' '}
            </button>
          </th>
        </tr>
      }
      tbody={
        success ? (
          categories.map((data, index) => (
            <tr key={index} data-row={1} className="datatable-row datatable-row-even" style={{ left: '0px' }}>
              <td data-field="#" aria-label="null" className="datatable-cell" width={`5%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                </span>
              </td>
              <td data-field="name" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.name}</p>
                </span>
              </td>

              <td data-field="status" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">
                    {data.products == null ? '' : `${data.products.length}`}
                  </p>
                </span>
              </td>
              <td data-field="status" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{convertDate(data.created_at)}</p>
                </span>
              </td>
              <td data-field="status" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{convertDate(data.updated_at)}</p>
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
                  className="btn btn-sm btn-default btn-text-primary btn-hover-danger btn-icon"
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

export default CategoryTrashedPage
