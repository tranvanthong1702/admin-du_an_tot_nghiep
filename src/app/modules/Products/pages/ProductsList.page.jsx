import React, { useMemo, useCallback, useEffect, useState } from 'react'
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
import ReactPaginate from 'react-paginate'

function ProductsListPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [products, setProducts] = useState([])
  const [q, setPhone] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage
  const [categorySelected, setCategorySelected] = useState(null)
  const [sorted, setSorted] = useState(null)
  const [statused, setStatused] = useState(null)
  const [dated, setDated] = useState(null)
  const [saled, setSaled] = useState(null)
  const [success, setSuccess] = useState([])

  const pageCount = Math.ceil(products?.length / productPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  const { id } = useParams()

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { success } = await ProductService.list()
        setSuccess(success)
        const { data } = await ProductService.list()
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])
  const handlerDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn có muốn lưu trữ ${name}?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        ProductService.delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setProducts(products.filter((item) => item.id !== id))
    }
  }
  const force_deleteDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn xóa vĩnh viễn ${name}?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        ProductService.force_delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setProducts(products.filter((item) => item.id !== id))
    }
  }

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
  var today = new Date()
  var dates = today.toJSON()

  const productss = useMemo(() => {
    if (categorySelected) {
      if (sorted === 'new') {
        return products
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      } else if (sorted === 'name') {
        return products
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .sort((a, b) => {
            var nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
          })
      } else if (sorted === 'name1') {
        return products
          .filter((i) => i.cate_id === parseInt(categorySelected))
          .sort((a, b) => {
            var nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase()
            if (nameA < nameB)
              //sort string ascending
              return 1
            if (nameA > nameB) return -1
            return 0
          })
      } else if (statused) {
        if (statused == 1) {
          return products.filter((i) => i.cate_id === parseInt(categorySelected)).filter((i) => i.status === 1)
        } else if (statused == 2) {
          return products.filter((i) => i.cate_id === parseInt(categorySelected)).filter((i) => i.status === 0)
        } else {
          return products
        }
      } else if (dated) {
        if (dated == 'stock') {
          return products
            .filter((i) => i.cate_id === parseInt(categorySelected))
            .filter((i) => i.expiration_date > dates)
        } else if (dated == 'unstock') {
          return products
            .filter((i) => i.cate_id === parseInt(categorySelected))
            .filter((i) => i.expiration_date < dates)
        } else {
          return products
        }
      } else if (saled) {
        if (saled == 'sale') {
          return products.filter((i) => i.cate_id === parseInt(categorySelected)).filter((i) => i.sale > 0)
        } else if (saled == 'no sale') {
          return products.filter((i) => i.cate_id === parseInt(categorySelected)).filter((i) => i.sale === 0)
        }
      } else {
        return products.filter((i) => i.cate_id === parseInt(categorySelected))
      }
    } else if (statused) {
      if (sorted === 'new') {
        return products
          .filter((i) => i.status === parseInt(statused))
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      } else if (sorted === 'name') {
        return products
          .filter((i) => i.status === parseInt(statused))
          .sort((a, b) => {
            var nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
          })
      } else if (sorted === 'name1') {
        return products
          .filter((i) => i.cate_id === parseInt(statused))
          .sort((a, b) => {
            var nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase()
            if (nameA < nameB)
              //sort string ascending
              return 1
            if (nameA > nameB) return -1
            return 0
          })
      } else if (dated) {
        if (dated == 'stock') {
          return products
            .filter((i) => i.status === parseInt(statused))
            .filter((i) => i.expiration_date > dates)
        } else if (dated == 'unstock') {
          return products
            .filter((i) => i.status === parseInt(statused))
            .filter((i) => i.expiration_date < dates)
        } else {
          return products
        }
      } else if (saled) {
        if (saled == 'sale') {
          return products.filter((i) => i.status === parseInt(statused)).filter((i) => i.sale > 0)
        } else if (saled == 'no sale') {
          return products.filter((i) => i.status === parseInt(statused)).filter((i) => i.sale === 0)
        }
      } else {
        return products.filter((i) => i.status === parseInt(statused))
      }
    }
    else {
      if (sorted === 'new') {
        return products.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      } else if (sorted === 'name') {
        return products.sort((a, b) => {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase()
          if (nameA < nameB)
            //sort string ascending
            return -1
          if (nameA > nameB) return 1
          return 0
        })
      } else if (sorted === 'name1') {
        return products.sort((a, b) => {
          var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase()
          if (nameA < nameB) return 1
          if (nameA > nameB) return -1
          return 0
        })
      } else if (statused) {
        if (statused == 1) {
          return products.filter((i) => i.status === 1)
        } else if (statused == 2) {
          return products.filter((i) => i.status === 0)
        }
      } else if (dated) {
        if (dated == 'stock') {
          return products.filter((i) => i.expiration_date > dates)
        } else if (dated == 'unstock') {
          return products.filter((i) => i.expiration_date < dates)
        }
      } else if (saled) {
        if (saled == 'sale') {
          return products.filter((i) => i.sale > 1)
        } else if (saled == 'no sale') {
          return products.filter((i) => i.sale === 0)
        }
      } else {
        return products
      }
    }
  }, [products, categorySelected, sorted, statused, dated, saled])
  const search = (rows) => {
    return rows.filter((row) => row.name.toLowerCase().indexOf(q) > -1 || row.price.toLowerCase().indexOf(q) > -1)
  }
  const onchangeSort = (e) => {
    setSorted(e.target.value)
  }
  const onChangeCate = (e) => {
    setCategorySelected(e.target.value)
  }
  const onChangeStatus = (e) => {
    setStatused(e.target.value)
  }
  const onChangeDate = (e) => {
    setDated(e.target.value)
  }
  const onChangeSale = (e) => {
    setSaled(e.target.value)
  }
  return (
    <DataTable
      title="Sản phẩm"
      subTitle="Danh sách sản phẩm của bạn"
      metadata={metadata}
      searchform={
        <form className="mb-7">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <form action="" className="search-pro">
                <input
                  type="text"
                  className="form-control mb-4"
                  value={q}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Tìm kiếm ..."
                />
                <i class="fa fa-search" aria-hidden="true"></i>
              </form>
            </div>
            <div className="col-lg-6 col-md-6 d-flex justify-content-end align-items-center">
              <div className="btn__">
                <Link to="/product/trashed" className="btn btn-success font-weight-bolder font-size-sm">
                  Lưu trữ
                </Link>
              </div>
              <div className="btn__">
                <Link to="/product/add" className="btn btn-success font-weight-bolder font-size-sm">
                  Thêm sản phẩm
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              {categories?.length > 0 ? (
                <select onChange={onChangeCate}>
                  <option value={''}>Danh mục</option>
                  {categories.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              ) : (
                <div className="text-center mt-3">
                  <span>
                    OMG <i className="fa fa-frown-o" aria-hidden="true" /> !
                  </span>
                  <div>No Result</div>
                </div>
              )}
            </div>

            <div className='col-lg-2 col-md-2'>

              <select onChange={onChangeStatus}>
                <option value={''}>Trạng thái</option>
                <option value="1">Còn hàng</option>
                <option value="2">Hết hàng</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-2">
              <select onChange={onChangeDate}>
                <option value={''}>Hạn sử dụng</option>
                <option value="stock">Còn hạn</option>
                <option value="unstock">Hết hạn</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-2">
              <select onChange={onChangeSale}>
                <option value={''}>Lựa chọn</option>
                <option value="sale">Khuyến mại</option>
                <option value="no sale">Không khuyến mại</option>
              </select>
            </div>
            <div className='col-lg-3 col-md-3'>
              <select onChange={onchangeSort}>
                <option value={''}>Sắp xếp</option>
                <option value="new">Mới nhất</option>
                <option value="name">Tên A-Z</option>
                <option value="name1">Tên Z-A</option>
              </select>
            </div>
          </div>
        </form>
      }
      thead={
        <div>
          <div className="btn btn-sm btn-default btn-text-primary mt-5">
            Tổng số sản phẩm trong kho : {products ? `${products.length}` : 'chưa có '}
          </div>
          <tr >
            <th scope='col fw-bolder fz-16px' width={`5%`} >
              <span>#</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Tên</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Danh mục</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`} >
              <span>Giá</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Khuyến mại(%)</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Hạn sử dụng</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Trạng thái</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Thao tác</span>
            </th>
          </tr>
        </div>
      }
      tbody={
        success ? (
          <div>
            {search(productss.slice(pageVisited, pageVisited + productPerPage))?.map((data, index) => {
              return (
                <tr key={index} data-row={1}>
                  <td width={`5%`}   >
                    <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                  </td>
                  <td width={`15%`}  >
                    <p className="text-dark-50 text-hover-primary font-weight-bold">{data.name}</p>
                  </td>
                  <td width={`15%`}  >
                    <p className="text-dark-50 text-hover-primary font-weight-bold">
                      {data.category == null ? '' : `${data.category.name}`}
                    </p>
                  </td>
                  <td width={`15%`}  >
                    <p className="text-dark-50 text-hover-primary font-weight-bold">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                    </p>
                  </td>
                  <td width={`15%`}  >
                    <p className="text-dark-50 text-hover-primary font-weight-bold">{data.sale}</p>
                  </td>
                  <td width={`15%`}  >
                    <p className="text-dark-50 text-hover-primary font-weight-bold">{convertDate(data.expiration_date)}</p>
                  </td>
                  <td width={`15%`}  >
                    <p className="text-dark-50 text-hover-primary font-weight-bold">
                      {data.status ? 'còn hàng' : ' hết hàng'}
                    </p>
                  </td>
                  <td width={`15%`}  >
                    <Link
                      to={`/product/detail/${data.id}`}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                      title="Xem chi tiết"
                    >
                      <i class="far fa-eye"></i>
                    </Link>
                    <Link
                      to={`/product/edit/${data.id}`}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2 btn_edit_"
                      title="Sửa sản phẩm"
                    >
                      <i class="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => handlerDelete(data.id, data.name)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                      title="Lưu trữ"
                    >
                      <i class="fas fa-archive"></i>
                    </button>
                    <button
                      onClick={() => force_deleteDelete(data.id, data.name)}
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
                  </td>
                </tr>
              )
            })}
            <ReactPaginate
              previousLabel={'Trang trước'}
              nextLabel={'Trang sau'}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'paginationBttns'}
              previousClassName={'previousBttn'}
              nextLinkClassName={'nextBttn'}
              disabledClassName={'paginationDisabled'}
              activeClassName={'paginationActive'}
            />
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
      options={options}
      setOptions={setOptions}
      loading={loading}
    />
  )
}
export default ProductsListPage
