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
import FeedbackService from '../service/Feedback.sevice'
import OrderService from 'app/modules/OderStatus/service/Order.service'
import ReactPaginate from 'react-paginate'

function FeedbackListPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [feedbacks, setFeedbacks] = useState([])
  const [success, setSuccess] = useState([])
  const { id } = useParams()
  const [q, setPhone] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage
  const pageCount = Math.ceil(feedbacks?.length / productPerPage)
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
    const getProducts = async () => {
      try {
        const { success } = await FeedbackService.list()
        setSuccess(success)
        const { data } = await FeedbackService.list()
        setFeedbacks(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()
  }, [])
  const [order, setOrder] = useState([]) // 1
  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await OrderService.detail(id)
        setOrder(data)
      } catch (error) {
        console.log(error)
      }
    }
    getOrder()
  }, [])
  return (
    <DataTable
      title="Danh sách đánh giá"
      subTitle="Danh sách đánh giá của khách hàng"
      metadata={metadata}
      button={
        <Link to="/feedback/analytics" className="mr-20 btn btn-success font-weight-bolder font-size-sm">
          Thống kê
        </Link>
      }
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
            <div className='col-lg-2 col-md-2'>
              <select >
                <option value={''}>Số điểm</option>
                <option value="1">1 sao</option>
                <option value="2">2 sao</option>
                <option value="3">3 sao</option>
                <option value="4">4 sao</option>
                <option value="5">5 sao</option>

              </select>
            </div>
            <div className="col-lg-2 col-md-2">
              <select >
                <option value={''}>Sắp xếp</option>
                <option value="stock">Mới nhất</option>
                <option value="unstock">Cũ nhất</option>
              </select>
            </div>
          </div>
        </form>
      }
      thead={
        <tr className="datatable-row" style={{ left: '0px' }}>
          <th data-field="#" className="datatable-cell datatable-cell-sort" width={`5%`}>
            <span>STT</span>
          </th>
          <th data-field="content" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Nội dung</span>
          </th>
          <th data-field="point" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Số điểm</span>
          </th>
          <th data-field="order_id" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Chi tiết đơn hàng</span>
          </th>
        </tr>
      }
      tbody={
        success ? (
          <div>
            {search(feedbacks.slice(pageVisited, pageVisited + productPerPage))?.map((data, index) => {
              return (
                <tr key={index} data-row={1} className="datatable-row datatable-row-even" style={{ left: '0px' }}>
                  <td data-field="#" aria-label="null" className="datatable-cell" width={`5%`}>
                    <span>
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                    </span>
                  </td>
                  <td data-field="content" aria-label="null" className="datatable-cell" width={`15%`}>
                    <span>
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{data.content}</p>
                    </span>
                  </td>
                  <td data-field="point" aria-label="null" className="datatable-cell" width={`15%`}>
                    <span>
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{data.point}</p>
                    </span>
                  </td>

                  <td data-field="order_id" aria-label="null" className="datatable-cell" width={`15%`}>
                    <span>
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{data.order_id}</p>
                    </span>
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
export default FeedbackListPage
