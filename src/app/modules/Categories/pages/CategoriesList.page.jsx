import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import { Link } from 'react-router-dom'
import CategoryService from '../service/Category.service'
import ReactPaginate from 'react-paginate'

function CategoriesListPage() {
  const [sort, setSort] = useState({})
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [categories, setCategories] = useState([])
  const [q, setPhone] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage
  const [success, setSuccess] = useState([])
  const search = (rows) => {
    return rows.filter((row) => row.name.toLowerCase().indexOf(q) > -1 || row.name.toLowerCase().indexOf(q) > -1)
  }
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth() +1}/${date.getFullYear()}`
  }
  const pageCount = Math.ceil(categories?.length / productPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { success } = await CategoryService.list()
        setSuccess(success)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])
  const loadCategories = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      CategoryService.list({ page: options.page, keyword: options.keyword, ...sort }).then((res) => {
        setCategories(res.data)
        setLoading(false)
      })
    }, DATA_LOAD_TIME)
  }, [options, sort])
  useEffect(() => {
    AppHelper.setTitle('Categories')
    loadCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, sort])
  const handlerDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn có muốn lưu trữ ${name} ?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        CategoryService.delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setCategories(categories.filter((item) => item.id !== id))
    }
  }
  const handlerforce_delete = async (id, name) => {
    const result = window.confirm(`Nếu bạn xóa danh mục ${name} tất cả sản phẩm trong danh mục sẽ bị xóa`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        CategoryService.force_delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setCategories(categories.filter((item) => item.id !== id))
    }
  }
  const sorts = (sort) => {
    if (sort == 'name-desc') {
      setSort({ sort_name: 'desc' })
    } else if (sort == 'name-asc') {
      setSort({ sort_name: 'asc' })
    } else if (sort == 'date-desc') {
      setSort({ sort: 'desc' })
    } else if (sort == 'date-asc') {
      setSort({ sort: 'asc' })
    }
  }
  return (
    <DataTable
      title="Danh Mục"
      subTitle="Danh sách danh mục của bạn"
      metadata={metadata}
      searchform={
        <form className="mb-7">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-5">
              <div className="input-icon search-pro">
                <input type="text" className="form-control" value={q} onChange={(e) => setPhone(e.target.value)} />
                <i class="fa fa-search" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <select className="form-control" onChange={(e) => sorts(e.target.value)}>
                <option selected> Sắp xếp </option>
                <option value="date-desc">Mới nhất</option>
                <option value="date-asc">Cũ - Mới</option>
                <option value="name-desc">Sắp xếp Z-A</option>
                <option value="name-asc">Sắp xếp A-Z</option>
              </select>
            </div>
            <div className="col-lg-4 col-md-4 d-flex justify-content-center end">
              <div className="btn__">
                <Link to="/category/add" className="btn btn-success font-weight-bolder font-size-sm">
                  Thêm danh mục
                </Link>
              </div>
              <div className="btn__">
                <Link to="/category/trashed" className="btn btn-success font-weight-bolder font-size-sm">
                  Lưu trữ
                </Link>
              </div>
            </div>
          </div>
        </form>
      }
      thead={
        <div className="row mb-3">
          <div className="col-lg-1 col-md-1" >
            <span className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>#</span>
          </div>
          <div className="col-lg-2 col-md-2">
            <span className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>Tên danh mục</span>
          </div>
          <div className="col-lg-2 col-md-2">
            <span className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>SL sản phẩm</span>
          </div>

          <div className="col-lg-2 col-md-2">
            <span className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>Ngày tạo</span>
          </div>
          <div className="col-lg-2 col-md-2">
            <span className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>Ngày cập nhật</span>
          </div>
          <div className="col-lg-2 col-md-2">
            <span className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>Thao tác</span>
          </div>
        </div>
      }
      tbody={
        success ? (
          <div>
            {search(categories.slice(pageVisited, pageVisited + productPerPage))?.map((data, index) => {
              return (
                <div className='row mb-3 list-voucher' key={index} data-row={1}>
                  <div className='col-lg-1 col-md-1'>
                    <p className="text-dark-50 text-hover-primary font-weight-bold text-center">{(index += 1)}</p>
                  </div>
                  <div className='col-lg-2 col-md-2'>
                    <Link to={`/category/detail/${data.id}`}>
                      <p className="text-dark-50 text-hover-primary font-weight-bold text-center">{data.name}</p>
                    </Link>
                  </div>
                  <div className='col-lg-2 col-md-2' >
                    <p className="text-dark-50 text-hover-primary font-weight-bold text-center">{data.products.length}</p>
                  </div>
                  <div className='col-lg-2 col-md-2' >
                    <p className="text-dark-50 text-hover-primary font-weight-bold text-center">{convertDate(data.created_at)}</p>
                  </div>
                  <div className='col-lg-2 col-md-2' >
                    <p className="text-dark-50 text-hover-primary font-weight-bold text-center">{convertDate(data.updated_at)}</p>
                  </div>
                  <div className='col-lg-2 col-md-2 text-center'>
                    <button  className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2 btn_edit_">
                      <Link to={`/category/edit/${data.id}`} title="Xem sản phẩm">
                        <i class="fas fa-edit"></i>
                      </Link>
                    </button>
                    <button
                      onClick={() => handlerDelete(data.id, data.name)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2"
                      title="Delete"
                    >
                      <i class="fas fa-archive"></i>
                    </button>
                    <button
                      onClick={() => handlerforce_delete(data.id, data.name)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-danger ml-2 "
                      title="Delete"
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

export default CategoriesListPage
