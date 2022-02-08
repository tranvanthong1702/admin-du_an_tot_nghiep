import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import orderService from '../service/Order.service'
import { DATA_LOAD_TIME } from '../../../../constants'
import SpinningSingle from '../../../components/extra/SpinningSingle.component'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import OrderService from '../service/Order.service'

function ViewOder() {
  const { idOrder, idProcess } = useParams()
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState([])
  // const [note, setNote] = useState({ shop_note: '' })
  const [shipper, setShipper] = useState()

  const history = useHistory()
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm()
  let note = ''
  const onHandSubmit = async (data) => {
    note = data
  }
  const loadOrder = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      orderService.detail(parseInt(idOrder)).then((res) => {
        if (res.success === true) {
          if (res.data) {
            setOrder(res.data.order_details)
            reset(res.data.order_details)
            setLoading(false)
          }
        } else {
          setOrder([])
          setLoading(false)
        }
      })
    }, DATA_LOAD_TIME)
  }, [idOrder])

  useEffect(() => {
    loadOrder()
  }, [idOrder])

  const handlePending = () => {
    if (idProcess == 3) {
      Swal.fire({
        title: 'Bạn muốn cập nhật ghi chú',
        showCancelButton: true,
        confirmButtonText: 'Xác Nhận',
        cancelButtonText: `Hủy`,
        cancelButtonColor: 'red'
      }).then((result) => {
        if (result.isConfirmed) {
          OrderService.updateNoteID(idOrder, note).then((res) => {
            Swal.fire(`Cập nhật ghi chú thành công !`, '', 'success')
          })
          history.push('/status/3')
        }
      })
    } else {
      Swal.fire({
        title: 'Bạn muốn chuyển trạng thái',
        showCancelButton: true,
        confirmButtonText: 'Xác Nhận',
        cancelButtonText: `Hủy`,
        cancelButtonColor: 'red'
      }).then((result) => {
        if (result.isConfirmed) {
          if (idProcess == 1) {
            OrderService.updatePendingID(idOrder, note).then((res) => {
              Swal.fire(`Update thành công !`, '', 'success')
            })
            history.push('/status/1')
          } else if (idProcess == 2) {
            OrderService.updatePendingShipID(idOrder, note).then((res) => {
              Swal.fire(`Update thành công !`, '', 'success')
            })
            history.push('/status/2')
          }
        }
      })
    }
  }
  const cancelOrder = () => {
    Swal.fire({
      title: 'Bạn muốn hủy đơn hàng',
      showCancelButton: true,
      confirmButtonText: 'Xác Nhận',
      cancelButtonText: `Đóng`,
      cancelButtonColor: 'red'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await OrderService.cancelOrderID(idOrder).then((res) => {
          Swal.fire(`Hủy đơn hàng thành công !`, '', 'success')
        })
        if (idProcess == 1) {
          history.push('/status/1')
        } else if (idProcess == 2) {
          history.push('/status/2')
        } else if (idProcess == 3) {
          history.push('/status/3')
        }
      }
    })
  }
  return (
    <div>
      <section className='section-all'>
        <div className='container'>
          {idProcess == 1 && (
            <Link to='/status/1' className='btn btn-success font-weight-bolder font-size-sm'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11 5L4 12L11 19'
                  stroke='#fff'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M4 12H20' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              Quay lại
            </Link>
          )}
          {idProcess == 2 && (
            <Link to='/status/2' className='btn btn-success font-weight-bolder font-size-sm'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11 5L4 12L11 19'
                  stroke='#fff'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M4 12H20' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              Quay lại
            </Link>
          )}
          {idProcess == 3 && (
            <Link to='/status/3' className='btn btn-success font-weight-bolder font-size-sm'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11 5L4 12L11 19'
                  stroke='#fff'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M4 12H20' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              Quay lại
            </Link>
          )}
          {idProcess == 4 && (
            <Link to='/status/4' className='btn btn-success font-weight-bolder font-size-sm'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11 5L4 12L11 19'
                  stroke='#fff'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M4 12H20' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              Quay lại
            </Link>
          )}
          {idProcess == 5 && (
            <Link to='/status/5' className='btn btn-success font-weight-bolder font-size-sm'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11 5L4 12L11 19'
                  stroke='#fff'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M4 12H20' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              Quay lại
            </Link>
          )}
          {idProcess == 6 && (
            <Link to='/status/6' className='btn btn-success font-weight-bolder font-size-sm'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M11 5L4 12L11 19'
                  stroke='#fff'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M4 12H20' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              Quay lại
            </Link>
          )}
          {loading ? (
            <tr className='d-flex justify-content-center'>
              <td colSpan={8}>
                <SpinningSingle background />
              </td>
            </tr>
          ) : (
            <div>
              {order.length === 0 ? (
                <div className='d-flex justify-content-center'>
                  <div>
                    <div className='text-center'>
                      <i className='fas fa-database' />
                    </div>
                    <div>
                      Không có dữ liệu
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <table className='table'>
                    <thead>
                    <tr>
                      <th scope='col'>Mã đơn hàng</th>
                      <th scope='col'>Tên sản phẩm</th>
                      <th scope='col'>Số lượng</th>
                      <th scope='col'>Giá</th>
                      <th scope='col'>Thành tiền</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.map(item => {
                      return (
                        <tr key={item.id}>
                          <td>VNMDH{item.order_id}</td>
                          <td>{item.standard_name}</td>
                          <td>{item.quantity}</td>
                          <td>
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(item.standard_price)}
                          </td>
                          <td>
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(item.standard_price * item.quantity)}
                          </td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
                  <form className='action' onSubmit={handleSubmit(onHandSubmit)}>
                    <div className='btn_action text-end'>
                      {idProcess == 1 && (
                        <div>
                          <div className='action_message'>
                            <label htmlFor=''>Ghi chú cửa hàng</label>
                            <textarea type='textarea' name='shop_note' ref={register} rows='4' cols='180' />
                          </div>
                          <button className='btn btn-primary' type='submit' onClick={() => handlePending()}>
                            Chọn xử lý
                          </button>
                          <button className='btn btn-danger' type='submit' onClick={() => cancelOrder()}>
                            Hủy đơn hàng
                          </button>
                        </div>
                      )}
                      {idProcess == 2 && (
                        <div>
                          <div className='action_message'>
                            <label htmlFor=''>Ghi chú cửa hàng</label>
                            <textarea type='textarea' name='shop_note' ref={register} rows='4' cols='180' />
                          </div>
                          <button className='btn btn-primary' type='submit' onClick={() => handlePending()}>
                            Chọn chờ giao
                          </button>
                          <button className='btn btn-danger' type='submit' onClick={() => cancelOrder()}>
                            Hủy đơn hàng
                          </button>
                        </div>
                      )}
                      {idProcess == 3 && (
                        <div>
                          <div className='action_message'>
                            <label htmlFor=''>Ghi chú cửa hàng</label>
                            <textarea type='textarea' name='shop_note' ref={register} rows='4' cols='180' />
                          </div>
                          <button className='btn btn-primary' type='submit' onClick={() => handlePending()}>
                            Cập nhật
                          </button>
                          <button className='btn btn-danger' type='submit' onClick={() => cancelOrder()}>
                            Hủy đơn hàng
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ViewOder
