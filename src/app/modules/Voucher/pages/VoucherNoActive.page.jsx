import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import VoucherService from '../service/Voucher.service'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import DataTable from 'app/components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { data } from 'jquery'
import { DATA_LOAD_TIME } from '../../../../constants'
import ReactPaginate from 'react-paginate'

function VoucherListPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [voucher, setVoucher] = useState([])
  const [getvoucher, setGet] = useState([])
  const history = useHistory()
  const productPerPage = 10
  const [categorySelected, setCategorySelected] = useState(null)
  const [sorted, setSorted] = useState(null)
  const [statused, setStatused] = useState(null)
  const [dated, setDated] = useState(null)
  const [saled, setSaled] = useState(null)
  const [pageNumber, setPageNumber] = useState(0)
  const [success, setSuccess] = useState([])
  const voucherPerPage = 5
  const pageVisited = pageNumber * voucherPerPage
  const pageCount = Math.ceil(voucher?.length / voucherPerPage)
  const [q, setPhone] = useState([])
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const search = (rows) => {
    return rows.filter((row) => row.title.toLowerCase().indexOf(q) > -1)
  }
  const loadVoucher = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      VoucherService.listNt().then((res) => {
        setVoucher(res.data)
        setSuccess(res.success)
        setLoading(false)
      })
    }, DATA_LOAD_TIME)
  }, [options])
  useEffect(() => {
    AppHelper.setTitle('Voucher')
    loadVoucher()
  }, [])

  const handlerDelete = async (id, title) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn có muốn xóa voucher ${title}`)
    if (result) {
      await VoucherService.delete(id)
      const newUser = voucher.filter((voucher) => voucher.id !== id)
      setVoucher(newUser)
    }
  }
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  const handlePlanning = async (id, title) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn có muốn lên kế hoạch cho voucher ${title}`)
    if (result) {
      await VoucherService.planning(id);
    }
    history.push('/voucher')
  }
  const handleUnPlanning = async (id, title) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn có muốn dừng lên kế hoạch cho voucher ${title}`)
    if (result) {
      await VoucherService.unplanning(id);
    }
    history.push('/voucher')
  }
  const productss = useMemo(() => {
    if (sorted === '1') {
      return voucher.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sorted === '2') {
      return voucher.sort((a, b) => {
        var nameA = a.title.toLowerCase(),
          nameB = b.title.toLowerCase()
        if (nameA < nameB)
          //sort string ascending
          return -1
        if (nameA > nameB) return 1
        return 0
      })
    } else if (sorted === '3') {
      return voucher.sort((a, b) => {
        var nameA = a.title.toLowerCase(),
          nameB = b.title.toLowerCase()
        if (nameA > nameB)
          //sort string ascending
          return -1
        if (nameA < nameB) return 1
        return 0
      })
    } else {
      return voucher
    }
  }, [sorted, voucher])
  const onchangeSort = (e) => {
    setSorted(e.target.value)
  }

  return (
    <DataTable
      title="Danh sách voucher"
      metadata={metadata}
      searchform={
        <form className="mb-7">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4 ">
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-icon">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm..."
                      value={q}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <span>
                      <i className="flaticon2-search-1 text-muted" />
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <select className="form-control" onChange={onchangeSort}>
                    <option value="">Sắp xếp</option>
                    <option value="1">Mới nhất</option>
                    <option value="4">Cũ nhất</option>
                    <option value="2">Tăng dần A-Z</option>
                    <option value="3">Giảm dần Z-A</option>
                  </select>
                </div>
              </div>

            </div>
            <div className="col-lg-8 col-md-8">
              <>
                <Link to="/voucher/add1" className="btn btn-success font-weight-bolder font-size-sm">
                  Giảm giá khách hàng đăng ký mới tài khoản
                </Link>
                <Link to="/voucher/add2" className="btn btn-success font-weight-bolder font-size-sm">
                  Giảm giá khách hàng đã có tài khoản
                </Link>
                <Link to="/voucher/add3" className="btn btn-success font-weight-bolder font-size-sm">
                  Miễn phí giao hàng
                </Link></>
            </div>
          </div>

        </form>
      }
      thead={
        <div>
          <div className="btn btn-sm btn-default btn-text-primary mt-5">
            Tổng số voucher : {voucher == null ? '0' : `${voucher.length}`} voucher
          </div>
          <div className="row mb-4">
            <div className="col-lg-1 col-md-1 col-1 text-center fw-bolder fz-16px">#</div>
            <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px">Tiêu đề</div>
            <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px">Ngày bắt đầu</div>
            <div className="col-lg-1 col-md-1 col-1 text-center fw-bolder fz-16px">HSD</div>
            <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px">Số lần sử dụng</div>
            <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px">Kế hoạch</div>
            <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px">Hành động</div>
          </div>
        </div>
      }
      tbody={
        voucher != null ? (
          <div className="">
            {search(productss.slice(pageVisited, pageVisited + voucherPerPage))?.map((data, index) => {
              return (
                <div key={index} data-row={1} className="row mb-3 list-voucher">
                  <div className="col-lg-1 col-md-1 d-flex align-items-center justify-content-center text-center">
                    <p className="text-dark-50 font-weight-bold">{(index += 1)}</p>
                  </div>

                  <div className="col-lg-2 col-md-2 d-flex align-items-center">
                    <p className="text-hover-primary font-weight-bold text-dark-50">{data.title}</p>
                  </div>

                  <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center">
                    <p className="text-dark-50  font-weight-bold">{convertDate(data.start_day)}</p>
                  </div>
                  <div className="col-lg-1 col-md-1 d-flex align-items-center justify-content-center text-center">
                    <p className="text-dark-50  font-weight-bold">{data.expiration} ngày</p>
                  </div>
                  <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center">
                    <p className="text-dark-50  font-weight-bold">{data.times == 100 ? 'Không giới hạn' : `${data.times} lần`}</p>
                  </div>
                  <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center">
                    {data.planning == 0 ? (
                      <></>
                    ) : (
                      <p className="active">Đã lên kế hoạch</p>
                    )}
                  </div>
                  <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center">
                    <span
                      style={{
                        overflow: 'visible',
                        position: 'relative',
                      }}
                    >
                      <Link
                        to={`/voucher/view/${data.id}`}
                        type="button"
                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                        title="Xem voucher"
                      >
                        <i class="far fa-eye"></i>
                      </Link>
                      {data.planning == 0 ? (
                        <button className="btn-planning1" title="Lên kế hoạch" onClick={() => handlePlanning(data.id, data.title)}><i class="fas fa-tasks"></i></button>
                      ) : (
                        <button className="btn-planning" title="Hủy kế hoạch" onClick={() => handleUnPlanning(data.id,  data.title)}><i class="fas fa-tasks"></i></button>
                      )}
                      <Link
                        to={`/voucher/edit/${data.id}`}
                        type="button"
                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                        title="Chỉnh sửa voucher"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
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
                                d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z"
                                fill="#000000"
                                fillRule="nonzero"
                                transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "
                              />
                              <path
                                d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z"
                                fill="#000000"
                                fillRule="nonzero"
                                opacity="0.3"
                              />
                            </g>
                          </svg>
                        </span>
                      </Link>
                      <button
                        onClick={() => handlerDelete(data.id, data.title)}
                        type="button"
                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"
                        title="Xóa voucher"
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
                    </span>
                  </div>
                </div>
              )
            }
            )}
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
export default VoucherListPage
