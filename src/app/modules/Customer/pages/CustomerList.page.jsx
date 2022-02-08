import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import CustomerService from '../service/Customer.service'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

function CustomerListPage() {
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [customer, setCustomer] = useState([])
  const [loading, setLoading] = useState([])
  const [sorted, setSorted] = useState(null)
  const [peopled, setPeopled] = useState(null)
  const [pageNumber, setPageNumber] = useState(0)
  const [q, setPhone] = useState([])
  const [success, setSuccess] = useState([])

  const customerPerPage = 5
  const pageVisited = pageNumber * customerPerPage

  const pageCount = Math.ceil(customer?.length / customerPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const search = (rows) => {
    return rows.filter((row) => row.user_name.toLowerCase().indexOf(q) > -1 || row.email.toLowerCase().indexOf(q) > -1)
  }

  const loadCustomer = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      CustomerService.list().then((res) => {
        setSuccess(res.success)
        setCustomer(res.data)
        setLoading(false)
      })
    }, DATA_LOAD_TIME)
  }, [options])
  useEffect(() => {
    AppHelper.setTitle('Customer')
    loadCustomer()
  }, [])

  const productss = useMemo(() => {
    if (peopled === 'personal') {
      if (sorted === '1') {
        return customer
          .filter((i) => i.roles.length > 0)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      } else if (sorted === '2') {
        return customer.sort((a, b) => {
          var nameA = a.user_name.toLowerCase(),
            nameB = b.user_name.toLowerCase()
          if (nameA < nameB)
            //sort string ascending
            return -1
          if (nameA > nameB) return 1
          return 0
        })
      } else if (sorted === '3') {
        return customer
          .filter((i) => i.roles.length > 0)
          .sort((a, b) => {
            var nameA = a.user_name.toLowerCase(),
              nameB = b.user_name.toLowerCase()
            if (nameA > nameB)
              //sort string ascending
              return -1
            if (nameA < nameB) return 1
            return 0
          })
      } else {
        return customer.filter((i) => i.roles?.length > 0)
      }
    } else if (peopled === 'customer') {
      if (sorted === '1') {
        return customer
          .filter((i) => i.roles.length == 0)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }
      else if (sorted === '4') {
        return customer
          .filter((i) => i.roles.length == 0)
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      }
      else if (sorted === '2') {
        return customer.sort((a, b) => {
          var nameA = a.user_name.toLowerCase(),
            nameB = b.user_name.toLowerCase()
          if (nameA < nameB)
            //sort string ascending
            return -1
          if (nameA > nameB) return 1
          return 0
        })
      } else if (sorted === '3') {
        return customer
          .filter((i) => i.roles.length == 0)
          .sort((a, b) => {
            var nameA = a.user_name.toLowerCase(),
              nameB = b.user_name.toLowerCase()
            if (nameA > nameB)
              //sort string ascending
              return -1
            if (nameA < nameB) return 1
            return 0
          })
      } else {
        return customer.filter((i) => i.roles?.length == 0)
      }
    } else {
      if (sorted === '1') {
        return customer.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      } else if (sorted === '2') {
        return customer.sort((a, b) => {
          var nameA = a.user_name.toLowerCase(),
            nameB = b.user_name.toLowerCase()
          if (nameA < nameB)
            //sort string ascending
            return -1
          if (nameA > nameB) return 1
          return 0
        })
      } else if (sorted === '3') {
        return customer.sort((a, b) => {
          var nameA = a.user_name.toLowerCase(),
            nameB = b.user_name.toLowerCase()
          if (nameA > nameB)
            //sort string ascending
            return -1
          if (nameA < nameB) return 1
          return 0
        })
      } else {
        return customer
      }
    }
  }, [sorted, peopled, customer])
  const onchangeSort = (e) => {
    setSorted(e.target.value)
    console.log(e.target.value)
  }
  const onchangePeople = (e) => {
    setPeopled(e.target.value)
  }

  const handlerDelete = async (id, user_name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Bạn có muốn vô hiệu hóa khách hàng ?`)
    if (result) {
      await CustomerService.delete(id)
      const newUser = customer.filter((customer) => customer.id !== id)
      setCustomer(newUser)
    }
  }
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  return (
    <DataTable
      title="Danh sách khách hàng"
      // subTitle="Danh sách khách hàng của bạn"
      metadata={metadata}
      searchform={
        <>
          <form className="mb-7">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <form action="" className='search-pro'>
                  <input type="text" className="form-control mb-4" value={q} onChange={(e) => setPhone(e.target.value)} placeholder='Tìm kiếm' />
                  <i class="fa fa-search" aria-hidden="true"></i>
                </form>
              </div>
              <div className="col-lg-3 col-md-4">
                <select className="form-control" onChange={onchangeSort}>
                  <option value="">Sắp xếp</option>
                  <option value="1">Mới nhất</option>
                  <option value="4">Cũ nhất</option>
                  <option value="2">Tăng dần A-Z</option>
                  <option value="3">Giảm dần Z-A</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-4">
                <select className="form-control" onChange={onchangePeople}>
                  <option value="">Vai trò</option>
                  <option value="personal">Nhân viên</option>
                  <option value="customer">Khách hàng</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-2">
                <div className="btn__">
                  <Link to="/customers/trashed" className="btn btn-success font-weight-bolder font-size-sm">
                    Lưu trữ
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </>
      }
      thead={
        <>
          <div className="btn btn-sm btn-default btn-text-primary mt-5">
            Tổng số khách hàng : {customer ? `${customer.length}` : '0'}
          </div>
          <div className="row mb-4">
            <div
              data-field="#"
              className="col-lg-1 col-md-1 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px"
            >
              <span>#</span>
            </div>
            <div
              data-field="name"
              className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px"
            >
              <span>Tên</span>
            </div>
            <div
              data-field="name"
              className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px"
            >
              <span>Email</span>
            </div>
            <div
              data-field="name"
              className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px"
            >
              <span>Ngày tạo</span>
            </div>
            <div
              data-field="name"
              className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px"
            >
              <span>Hành động</span>
            </div>
          </div>
        </>
      }
      tbody={
        success ? (
          <div>
            {search(productss.slice(pageVisited, pageVisited + customerPerPage))?.map((data, index) => {
              return (
                <div>
                  <div key={index} data-row={1} className="row mb-3">
                    <div className="col-lg-1 col-md-1 align-items-center justify-content-center text-center">
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                    </div>
                    <div className="col-lg-3 col-md-3 align-items-center justify-content-center text-center">
                      <div className="text-dark-50 text-hover-primary font-weight-bold">{data.user_name}</div>
                    </div>
                    <div className="col-lg-3 col-md-3 align-items-center justify-content-center text-center">
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{data.email}</p>
                    </div>
                    <div className="col-lg-2 col-md-2 align-items-center justify-content-center text-center">
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{convertDate(data.created_at)}</p>
                    </div>
                    <div className="col-lg-3 col-md-3 align-items-center justify-content-center text-center">
                      <span
                        style={{
                          overflow: 'visible',
                          position: 'relative',
                          width: '130px'
                        }}
                      >
                        <Link
                          to={`/customers/view/${data.id}`}
                          type="button"
                          className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                          title="Xem user"
                        >
                          <i class="far fa-eye"></i>
                        </Link>
                        <Link
                          to={`/customers/edit/${data.id}`}
                          type="button"
                          className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                          title="Phân quyền user"
                        >
                          <i class="fas fa-user-cog"></i>
                        </Link>
                        <button
                          onClick={() => handlerDelete(data.id, data.user_name)}
                          type="button"
                          className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon text-danger"
                          title="Vô hiệu hóa users"
                        >
                          <i class="fas fa-user-lock"></i>
                        </button>
                      </span>
                    </div>
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

export default CustomerListPage
