import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import { Link } from 'react-router-dom'
import CategoryService from 'app/modules/Categories/service/Category.service'
import { useParams } from 'react-router'
import ProductService from 'app/modules/Products/service/Product.service'

function CategoryDetailPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [products, setProducts] = useState([])
  const [success, setSuccess] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getTrashed = async () => {
      try {
        const { success } = await CategoryService.list_pro(id)
        setSuccess(success)
        const { data } = await CategoryService.list_pro(id)
        setProducts(data)
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
        ProductService.delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setProducts(products.filter((item) => item.id !== id))
    }
  }
  return (
    <DataTable
      title="Sản phẩm"
      subTitle="Danh sách sản phẩm của bạn"
      metadata={metadata}
      button={
        <Link to="/product/trashed" className="btn btn-success font-weight-bolder font-size-sm">
          Lưu trữ 
        </Link>
      }
      toolbar={
        <Link to="/product/add" className="btn btn-success font-weight-bolder font-size-sm">
          Thêm sản phẩm
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
          <th data-field="image" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Ảnh</span>
          </th>

          <th data-field="price" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Giá</span>
          </th>
          <th data-field="sale" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Khuyến mại(%)</span>
          </th>
          <th data-field="sale" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Thay đổi</span>
          </th>
          <th data-field="action" className="datatable-cell datatable-cell-sort">
            <span>Thao tác</span>
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
              <td data-field="img" aria-label="null" className="datatable-cell" width={`15%`}>
                <img src={data.image} width="120px" />
              </td>

              <td data-field="price" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                  </p>
                </span>
              </td>
              <td data-field="sale" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.sale}</p>
                </span>
              </td>
              <td data-field="sale" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.updated_at.slice(0, 10)}</p>
                </span>
              </td>
              <td data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
              <Link
                      to={`/product/detail/${data.id}`}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                      title="Xem chi tiết"
                    >
                      <i class="far fa-eye"></i>
                    </Link>
                <button
                  onClick={() => handlerDelete(data.id, data.name)}
                  type="button"
                  className="btn btn-sm btn-default btn-text-primary btn-hover-danger"
                  title="Lưu trữ"
                >
                  <i class="fas fa-archive"></i>
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

export default CategoryDetailPage
