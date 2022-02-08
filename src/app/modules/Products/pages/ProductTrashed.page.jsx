import React, { useCallback, useEffect, useState } from 'react'
import DataTableTrashed from '../../../components/global/datatable/DatatableTrashed.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import ProductService from '../service/Product.service'
import { Link, useHistory } from 'react-router-dom'

function ProductTrashedPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [products, setProducts] = useState([])
  const [success, setSuccess] = useState([])

  const history = useHistory()
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  useEffect(() => {
    const getTrashed = async () => {
      try {
        const { success } = await ProductService.trashed()
        setSuccess(success)
        const { data } = await ProductService.trashed()
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getTrashed()
  }, [])

  const handlerDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`bạn muốn xóa vĩnh viễn ${name}?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        ProductService.force_delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setProducts(products.filter((item) => item.id !== id))
    }
  }
  const handlerDeleteAll = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`bạn muốn xóa vĩnh viễn tất cả sản phẩm?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        ProductService.force_delete_all()
        setLoading(false)
      }, DATA_LOAD_TIME)
      setProducts(products.map((item) => item.id !== id))
    }
    history.push('/product/list')
  }
  const handlerBackup = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn khôi phục ${name} ?`)
    if (result) {
      // const { data } = categories
      setLoading(true)
      setTimeout(() => {
        ProductService.backup_one(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setProducts(products.filter((item) => item.id !== id))
    }
  }
  const handlerBackupAll = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn khôi phục tất cả?`)
    if (result) {
      // const { data } = categories
      setLoading(true)
      setTimeout(() => {
        ProductService.backup_all()
        setLoading(false)
      }, DATA_LOAD_TIME)
      setProducts(products)
    }
    history.push('/product/list')
  }

  return (
    <DataTableTrashed
      title="Danh sách lưu trữ"
      subTitle="Danh sách sản phẩm đã xóa"
      metadata={metadata}
      button={
        <Link to="/product/trashed" className="btn btn-success font-weight-bolder font-size-sm">
          Trashed
        </Link>
      }
      toolbar={
        <Link type="button" to="/product/list" className="btn btn-light">
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
            <span>Tên</span>
          </th>
          <th data-field="price" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Giá</span>
          </th>
          <th data-field="sale" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Trạng thái</span>
          </th>
          <th data-field="sale" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Ngày hết hạn</span>
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
          products.map((data, index) => (
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
              <td data-field="price" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                  </p>
                </span>
              </td>
              <td data-field="status" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">
                    {data.status ? 'còn hàng' : ' hết hàng'}
                  </p>
                </span>
              </td>
              <td data-field="sale" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">
                    {convertDate(data.expiration_date)}
                  </p>
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

export default ProductTrashedPage
