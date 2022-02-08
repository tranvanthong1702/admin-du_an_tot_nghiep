import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import ProductService from '../service/Product.service'
import { Link } from 'react-router-dom'
import CategoryService from 'app/modules/Categories/service/Category.service'
import { useParams } from 'react-router'

function ProductsDetailPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [products, setProducts] = useState('')
  const [success, setSuccess] = useState([])

  const { id } = useParams()
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { success } = await ProductService.detail(id)
        setSuccess(success)
        const { data } = await ProductService.detail(id)
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }

    getProducts()
  }, [])
  const [categories, setCategories] = useState([]) // 1
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await CategoryService.list()
        setCategories(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [])
  return success ? (
    <div className="card card-custom gutter-b">
      <div className="d-flex flex-column-fluid">
        <div className="container">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">Chi tiết sản phẩm</h3>
              </div>
              <div className="card-toolbar">
                <Link type="button" to="/product/list" className="btn btn-light">
                  <i className="fa fa-arrow-left" />
                  Trở lại
                </Link>
              </div>
            </div>
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-line " role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" role="tab" aria-selected="true">
                    Thông tin
                  </a>
                </li>
              </ul>
              <div className="mt-5">
                <form className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-6 mb-2">
                          <lable>Tên sản phẩm :</lable>
                          <input className='form-control' type="text" defaultValue={products.name} readOnly />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label>
                            Danh mục :
                          </label>
                          <input className='form-control' type="text" defaultValue={products.category == null ? '' : `${products.category.name}`} readOnly />
                        </div>

                        <div className="col-lg-6 mb-2">
                          <label>
                            Giá sản phẩm :
                            <input className='form-control' type="text" defaultValue={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                              products.price
                            )} />
                          </label>
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label>
                            Trạng thái :
                          </label>
                          <input className='form-control' type="text" defaultValue={products.status ? 'còn hàng' : ' hết hàng'} readOnly />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label>
                            Ngày hết hạn :
                          </label>
                          <input type="text" value={convertDate(products.expiration_date)} readOnly className='form-control' />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label>
                            Ngày sửa đổi :
                          </label>
                          <input type="text" className='form-control' value={convertDate(products.updated_at)} readOnly />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label>
                            Giảm giá( % ) :
                          </label>
                          <input type="text" className="form-control" defaultValue={products.sale} readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-lg-4">
                      <label htmlFor="">Hình ảnh</label><br />
                      <img className="mb-3" src={products.image} className="img-fluid" />
                    </div>
                    <div className="col-lg-8">
                      <label>
                        Mô tả ngắn :
                      </label>
                      <p> {products.desc_short}</p>
                      <label>
                        Chi tiết :
                      </label>
                      <p>{products.description}</p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="btn_ text-center">
                <button

                  type="button"
                  className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                  title="Lưu trữ"
                >
                  <i class="fas fa-archive"></i>
                </button>
                <button

                  type="button"
                  className="btn btn-sm btn-default btn-text-primary btn-hover-danger"
                  title="Xóa sản phẩm"
                >
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <rect x={0} y={0} width={24} height={24} />
                        <path
                          d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                          fill="#000000"
                          fillRule="nonzero"
                        />
                        <path
                          d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                          fill="#000000"
                          opacity="0.3"
                        />
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
export default ProductsDetailPage
