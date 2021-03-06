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
    const result = confirm(`B???n c?? mu???n l??u tr??? ${name}?`)
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
    const result = confirm(`B???n mu???n x??a v??nh vi???n ${name}?`)
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
      title="S???n ph???m"
      subTitle="Danh s??ch s???n ph???m c???a b???n"
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
                  placeholder="T??m ki???m ..."
                />
                <i class="fa fa-search" aria-hidden="true"></i>
              </form>
            </div>
            <div className="col-lg-6 col-md-6 d-flex justify-content-end align-items-center">
              <div className="btn__">
                <Link to="/product/trashed" className="btn btn-success font-weight-bolder font-size-sm">
                  L??u tr???
                </Link>
              </div>
              <div className="btn__">
                <Link to="/product/add" className="btn btn-success font-weight-bolder font-size-sm">
                  Th??m s???n ph???m
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3">
              {categories?.length > 0 ? (
                <select onChange={onChangeCate}>
                  <option value={''}>Danh m???c</option>
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
                <option value={''}>Tr???ng th??i</option>
                <option value="1">C??n h??ng</option>
                <option value="2">H???t h??ng</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-2">
              <select onChange={onChangeDate}>
                <option value={''}>H???n s??? d???ng</option>
                <option value="stock">C??n h???n</option>
                <option value="unstock">H???t h???n</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-2">
              <select onChange={onChangeSale}>
                <option value={''}>L???a ch???n</option>
                <option value="sale">Khuy???n m???i</option>
                <option value="no sale">Kh??ng khuy???n m???i</option>
              </select>
            </div>
            <div className='col-lg-3 col-md-3'>
              <select onChange={onchangeSort}>
                <option value={''}>S???p x???p</option>
                <option value="new">M???i nh???t</option>
                <option value="name">T??n A-Z</option>
                <option value="name1">T??n Z-A</option>
              </select>
            </div>
          </div>
        </form>
      }
      thead={
        <div>
          <div className="btn btn-sm btn-default btn-text-primary mt-5">
            T???ng s??? s???n ph???m trong kho : {products ? `${products.length}` : 'ch??a c?? '}
          </div>
          <tr >
            <th scope='col fw-bolder fz-16px' width={`5%`} >
              <span>#</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>T??n</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Danh m???c</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`} >
              <span>Gi??</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Khuy???n m???i(%)</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>H???n s??? d???ng</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Tr???ng th??i</span>
            </th>
            <th scope='col fw-bolder fz-16px' width={`15%`}>
              <span>Thao t??c</span>
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
                      {data.status ? 'c??n h??ng' : ' h???t h??ng'}
                    </p>
                  </td>
                  <td width={`15%`}  >
                    <Link
                      to={`/product/detail/${data.id}`}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                      title="Xem chi ti???t"
                    >
                      <i class="far fa-eye"></i>
                    </Link>
                    <Link
                      to={`/product/edit/${data.id}`}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2 btn_edit_"
                      title="S???a s???n ph???m"
                    >
                      <i class="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => handlerDelete(data.id, data.name)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                      title="L??u tr???"
                    >
                      <i class="fas fa-archive"></i>
                    </button>
                    <button
                      onClick={() => force_deleteDelete(data.id, data.name)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-danger"
                      title="X??a s???n ph???m"
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
              previousLabel={'Trang tr?????c'}
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
              <div>Kh??ng c?? d??? li???u</div>
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
