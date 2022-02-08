import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import { Link } from 'react-router-dom'
import BlogService from '../service/Blog.service'
import ReactPaginate from 'react-paginate'

function BlogsListPage() {
  const [sort, setSort] = useState({})
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [blogs, setBlogs] = useState([])
  const [q, setPhone] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const productPerPage = 5
  const pageVisited = pageNumber * productPerPage
  const [success, setSuccess] = useState([])
  const search = (rows) => {
    return rows.filter((row) => row.title.toLowerCase().indexOf(q) > -1 || row.title.toLowerCase().indexOf(q) > -1)
  }
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  const pageCount = Math.ceil(blogs?.length / productPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { success } = await BlogService.list()
        setSuccess(success)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])
  const loadBlogs = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      BlogService.list({ page: options.page, keyword: options.keyword, ...sort }).then((res) => {
        setBlogs(res.data)
        setLoading(false)
      })
    }, DATA_LOAD_TIME)
  }, [options, sort])
  useEffect(() => {
    AppHelper.setTitle('Blogs')
    loadBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, sort])

  const handlerDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn lưu trữ ${name}?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        BlogService.delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setBlogs(blogs.filter((item) => item.id !== id))
    }
  }
  const force_deleteDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn muốn xóa vĩnh viễn ${name}?`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        BlogService.force_delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setBlogs(blogs.filter((item) => item.id !== id))
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
      title="Bài viết"
      subTitle="Danh sách bài viết của bạn"
      metadata={metadata}
      button={
        <Link to="/blogs/trashed" className="btn btn-success font-weight-bolder font-size-sm">
          Lưu trữ
        </Link>
      }
      toolbar={
        <Link to="/blogs/add" className="btn btn-success font-weight-bolder font-size-sm">
          Thêm bài viết
        </Link>
      }
      searchform={
        <form className="mb-7">
          <div className="row align-items-center">
            <div className="col-lg-5 ">
              <div className="input-icon search-pro">
                <input type="text" className="form-control" value={q} onChange={(e) => setPhone(e.target.value)} />
                <i class="fa fa-search" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-lg-4">
              <select className="form-select" onChange={(e) => sorts(e.target.value)}>
                <option value=""> Sắp xếp </option>
                <option value="date-desc">mới nhất</option>
                <option value="date-asc">cũ - mới</option>
                <option value="name-desc">z-a</option>
                <option value="name-asc">a-z</option>
              </select>
            </div>
          </div>
        </form>
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
          <th data-field="content" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Ngày thay đổi</span>
          </th>
          <th data-field="action" className="datatable-cell datatable-cell-sort">
            <span>Thao tác</span>
          </th>
        </tr>
      }
      tbody={
        success ? (
          <div>
            {search(blogs.slice(pageVisited, pageVisited + productPerPage))?.map((data, index) => {
              return (
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
                  <td data-field="status" aria-label="null" className="datatable-cell" width={`15%`}>
                    <span>
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{convertDate(data.updated_at)}</p>
                    </span>
                  </td>
                  <td data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
                    <Link
                      to={`/blogs/edit/${data.id}`}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2 btn_edit_"
                      title="Edit details"
                    >
                      <i class="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => handlerDelete(data.id, data.title)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary"
                      title="Delete"
                    >
                      <i class="fas fa-archive"></i>
                    </button>
                    <button
                      onClick={() => force_deleteDelete(data.id, data.title)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-danger ml-2"
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

export default BlogsListPage
