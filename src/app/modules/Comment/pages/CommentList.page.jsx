import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import CommentService from '../service/Comment.service'
import ReactPaginate from 'react-paginate'

function CommentsListPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [comments, setComments] = useState([])
  const [success, setSuccess] = useState([])
  const { id } = useParams()
  const [q, setPhone] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage

  const pageCount = Math.ceil(comments?.length / productPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  const search = (rows) => {
    return rows.filter((row) => row.content.toLowerCase().indexOf(q) > -1 || row.content.toLowerCase().indexOf(q) > -1)
  }
  useEffect(() => {
    const getTrashed = async () => {
      try {
        const { success } = await CommentService.list()
        setSuccess(success)
        const { data } = await CommentService.list()
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
  return (
    <DataTable
      title="Bình luận"
      subTitle="Danh sách bình luận của khách hàng"
      metadata={metadata}
      button={
        <Link to="/comment/trashed" className="btn btn-success font-weight-bolder font-size-sm">
          Lưu trữ <i class=" ml-2 far fa-trash-alt fa-sm"></i>
        </Link>
      }
      searchform={
        <form className="mb-7">
          <div className="row align-items-center">
            <div className="col-lg-5 ">
              <div className="input-icon">
                <input type="text" className="form-control mb-4" value={q} onChange={(e) => setPhone(e.target.value)} />
                <span>
                  <i className="flaticon2-search-1 text-muted" />
                </span>
              </div>
            </div>
          </div>
        </form>
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
            <span>ID Sản phẩm</span>
          </th>
          <th data-field="content" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Nội dung</span>
          </th>
          <th data-field="vote" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Điểm</span>
          </th>
          <th data-field="status" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Status</span>
          </th>
          <th data-field="action" className="datatable-cell datatable-cell-sort">
            <span>Thao tác</span>
          </th>
        </tr>
      }
      tbody={
        comments == null ? (
          <div className="d-flex justify-content-center mt-5">
            <div>
              <div className="text-center">
                <i className="fas fa-database" />
              </div>
              <div>Không có dữ liệu</div>
            </div>
          </div>
        ) : (
          <div>
            {search(comments.slice(pageVisited, pageVisited + productPerPage))?.map((data, index) => {
              return (
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
                      onClick={() => handlerDelete(data.id, data.name)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-danger"
                      title="Delete"
                    >
                     <i class="fas fa-archive"></i>
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
        )
      }
      options={options}
      setOptions={setOptions}
      loading={loading}
    />
  )
}
export default CommentsListPage
