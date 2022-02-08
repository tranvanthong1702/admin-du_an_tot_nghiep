import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import OrderService from '../service/Order.service'
import orderService from '../service/Order.service'
import { DATA_LOAD_TIME } from '../../../../constants'
import { useForm } from 'react-hook-form'

function TableDataShipper({ orders, orders1, callback, orders2 }) {
  const { id } = useParams()
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [detail, setDetail] = useState([])
  const [selectedOrder, setSelectedOrder] = useState([])
  const [selectedOrder2, setSelectedOrder2] = useState([])
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onHandSubmit = async (data) => {
    const convertId = parseInt(data.id)
    const newData = {
      cancel_note: data.cancel_note
    }
    await OrderService.faillOrderShip(convertId, newData).then((res) => {
      Swal.fire(`Hủy đơn thành công`, '', 'success')
      callback()
    })
  }
  const handleClose = () => setShow(false)
  const handleClose1 = () => setShow1(false)
  const handleShow = async (idDetail) => {

    await OrderService.detail(idDetail).then(res => {
      console.log(res, 'id')
      if (res.data.order_details.length > 0) {
        setDetail(res.data.order_details)

        setShow(true)
      } else {
        setDetail([])
        setShow(true)
      }
    })
  }
  const handleShowTotal = () => {
    setShow1(true)
  }
  const handleChange = (e, data) => {
    const { name, checked } = e.target
    if (checked) {
      if (name === 'allSelect') {
        setSelectedOrder(orders)
      } else {
        setSelectedOrder([...selectedOrder, data])
      }
    } else {
      if (name === 'allSelect') {
        setSelectedOrder([])
      } else {
        let tempOrder = selectedOrder.filter((item) => item.id !== data.id)
        setSelectedOrder(tempOrder)
      }
    }
  }
  const handleChange2 = (e, data) => {
    const { name, checked } = e.target
    if (checked) {
      if (name === 'allSelect') {
        setSelectedOrder2(orders2)
      } else {
        setSelectedOrder2([...selectedOrder2, data])
      }
    } else {
      if (name === 'allSelect') {
        setSelectedOrder2([])
      } else {
        let tempOrder = selectedOrder2.filter((item) => item.id !== data.id)
        setSelectedOrder2(tempOrder)
      }
    }
  }
  const confirmOrder = () => {
    const convertID = selectedOrder.map(item => item.id)
    if (convertID.length > 0) {
      Swal.fire({
        title: 'Bạn muốn nhận đơn chứ ?',
        showCancelButton: true,
        confirmButtonText: 'Nhận đơn',
        cancelButtonText: `Hủy`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          OrderService.confirmShip(convertID).then(res => {
            Swal.fire(`Nhận đơn thành công`, '', 'success')
          })
          callback()
        }
      })
    } else {
      Swal.fire(`Bạn chưa chọn đơn hàng nào !`, '', 'warning')
    }
  }
  const successOrder = async (id) => {
    Swal.fire({
      title: 'Bạn đã giao hàng thành công ?',
      showCancelButton: true,
      confirmButtonText: 'Thành công',
      cancelButtonText: `Hủy`,
      cancelButtonColor: 'red'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        OrderService.successOrderShip(id).then(res => {
          Swal.fire(`Bạn đã giao hàng thành công !`, '', 'success')
          callback()
        })
      }
    })
  }
  const failOrder = (id) => {
    setShow(true)
  }
  const handingOrder = () => {
    const convertID = selectedOrder2.filter(item => item.shop_confirm != 0).map(item => item.id)
    if (convertID.length > 0) {
      Swal.fire({
        title: 'Bạn xác nhận bàn giao cho cửa hàng ?',
        showCancelButton: true,
        confirmButtonText: 'Bàn Giao',
        cancelButtonText: `Hủy`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          OrderService.handingOrderShip(convertID).then(res => {
            Swal.fire(`Bàn giao thành công`, '', 'success')
          })
          callback()
        }
      })
    } else {
      Swal.fire(`Chọn đơn hàng đi ngáo à ^^`, '', 'warning')
    }
  }
  const count = {
    handing: orders2.length,
    success: orders2.filter(item => item.process_id == 5).length,
    fail: orders2.filter(item => item.process_id == 6).length,
    shipping: orders2.filter(item => item.process_id == 4).length,
    total: orders2.reduce((a, b) => a + parseInt(b.total_price), 0)
  }
  return (
    <section className='section-all'>
      <div className='container'>
        <div className='row'>
          <div className='col m-auto'>
            {id == 3 && (
              <div>
                {orders.length === 0 ? (
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
                    <div className='table'>
                      <div className='title-info_client'>
                        <div className='row'>
                          {id == 3 && (
                            <div className='col-lg-1 col-md-1 col-1 d-flex align-items-center justify-content-center'>
                              <input
                                type='checkbox'
                                className=''
                                name='allSelect'
                                checked={selectedOrder?.length === orders?.length}
                                onChange={(e) => handleChange(e, orders)}
                              />
                            </div>
                          )}
                          <div className='col-lg-3 col-md-3 col-3'>
                            <div
                              className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                              Mã đơn hàng
                            </div>
                          </div>
                          <div className='col-lg-6 col-md-6 col-7'>
                            <div
                              className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                              Thông tin
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='detail-oder_'>
                        {orders.map((item, index) => {
                          return (
                            <div className='row' key={item.id}>
                              {id == 3 && (
                                <div
                                  className='col-lg-1 col-md-1 col-1 d-flex align-items-center justify-content-center'>
                                  <input
                                    type='checkbox'
                                    className=''
                                    name={item.customer_name}
                                    checked={selectedOrder.some((data) => data?.id === item.id)}
                                    onChange={(e) => handleChange(e, item)}
                                  />
                                </div>
                              )}
                              <div
                                className='col-lg-3 col-md-3 col-3 d-flex align-items-center justify-content-center'>VNMDH{item.id}</div>
                              <div className='col-lg-6 col-md-5 col-7 d-flex align-items-center justify-content-center'>
                                <div className='contact'>
                                  <div className='name'>
                                    Tên khách hàng {item.customer_name}
                                  </div>
                                  <div className='phone'>
                                    Số điện thoại: {item.customer_phone}
                                  </div>
                                </div>
                              </div>
                              {id == 3 && (
                                <>
                                  <div
                                    className='col-lg-2 col-md-3 col-12 d-flex align-items-center justify-content-center'>
                                    <div className='btn_view text-center mt-3'>
                                      <Button variant='success' onClick={() => handleShow(item.id)}>
                                        Xem đơn hàng
                                      </Button>
                                    </div>
                                  </div>
                                  <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                      <Modal.Title>Hủy đơn hàng</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <div className='font-weight-bold'>
                                        CHI TIẾT ĐƠN HÀNG :
                                      </div>
                                      <table className='table'>
                                        <thead>
                                        <tr>
                                          <th scope='col'>#</th>
                                          <th scope='col'>Tên sản phẩm</th>
                                          <th scope='col'>Số lượng</th>
                                          <th scope='col'>Đơn giá</th>
                                          <th scope='col'>Tổng tiền</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {detail ? (
                                          <>
                                            {
                                              detail.map((item, index) => {
                                                return (
                                                  <tr>
                                                    <th scope='row'>{index += 1}</th>
                                                    <td>{item.standard_name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.standard_price}</td>
                                                    <td>
                                                      {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                      }).format(item.standard_price * item.quantity)}
                                                    </td>
                                                  </tr>
                                                )
                                              })
                                            }
                                          </>
                                        ) : (
                                          <>
                                            No Data
                                          </>
                                        )}
                                        </tbody>
                                      </table>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button variant='danger' onClick={handleClose}>
                                        Đóng
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className='action'>
                      {id == 3 && (
                        <div>
                          <button className='btn btn-primary' type='submit' onClick={() => confirmOrder()}>
                            Xác Nhận
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {id == 4 && (
              <div>
                {orders1.length === 0 ? (
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
                  <div className='btn_check'>
                    <div className='row mb-2'>
                      <div className='col-lg-3 col-md-3 col-4'>
                        <div className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                          Mã đơn hàng
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-6 col-8'>
                        <div className='d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                          Thông tin
                        </div>
                      </div>
                      <div className='col-lg-3 col-md-3 col-3'>

                      </div>
                    </div>
                    <div>
                      {orders1.map((item, index) => {
                        return (

                          <div className='row mb-5' key={item.id}>
                            <div
                              className='col-lg-3 col-md-3 col-4 mb-2 d-flex align-items-center justify-content-center text-center'>VNMDH{item.id}</div>
                            <div className='col-lg-6 col-md-6 col-8 mb-2 '>
                              <div className='name'>
                                Tên khách hàng {item.customer_name}
                              </div>
                              <div className='phone'>
                                Số điện thoại: {item.customer_phone}
                              </div>
                            </div>
                            {id == 4 && (
                              <>
                                <div className='col-lg-3 col-md-3 col-12 d-flex '>
                                  <Button variant='primary' onClick={() => successOrder(item.id)} className='mr-5'
                                  >
                                    Hoàn Thành
                                  </Button>
                                  <Button variant='danger' onClick={() => failOrder(item.id)}>
                                    Thất Bại
                                  </Button>
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                  <form action='' onSubmit={handleSubmit(onHandSubmit)}>
                                    <Modal.Header closeButton>
                                      <Modal.Title>Giao hàng thất bại</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <label htmlFor=''>Lý do</label>
                                      <textarea name='cancel_note' id='' ref={register} cols='65' rows='5'></textarea>
                                      <input type='text' name='id' id='' ref={register} value={item.id}
                                             className='d-none' />
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button variant='primary' type='submit'>
                                        Gửi
                                      </Button>
                                      <Button variant='danger' onClick={handleClose}>
                                        Đóng
                                      </Button>
                                    </Modal.Footer>
                                  </form>
                                </Modal>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            {id == 5 && (
              <div>
                {orders2.length === 0 ? (
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
                    <div className='table'>
                      <div className='row'>
                        <div
                          className='col-lg-1 col-md-1 col-1 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                          <input
                            type='checkbox'
                            className=''
                            name='allSelect'
                            checked={selectedOrder2?.length === orders2?.length}
                            onChange={(e) => handleChange2(e, orders2)}
                          />
                        </div>
                        <div
                          className='col-lg-2 col-md-2 col-2 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                          Mã đơn hàng
                        </div>
                        <div
                          className='col-lg-3 col-md-3 col-3 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                          Thông tin
                        </div>
                        <div
                          className='col-lg-2 col-md-2 col-2 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                          Trạng Thái
                        </div>
                        <div
                          className='col-lg-2 col-md-2 col-2 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>Confirm
                        </div>
                        <div
                          className='col-lg-2 col-md-2 col-2 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                          Hành Động
                        </div>
                      </div>
                      <div>
                        {orders2.map((item, index) => {
                          return (
                            <div className='row btn_acs mb-4' key={item.id}>
                              <div
                                className='col-lg-1 col-md-1 col-1 d-flex align-items-center justify-content-center text-center'>
                                {item.shop_confirm !== 0 && (
                                  <input
                                    type='checkbox'
                                    className=''
                                    name={item.customer_name}
                                    checked={selectedOrder2.some((data) => data?.id === item.id)}
                                    onChange={(e) => handleChange2(e, item)}
                                  />
                                )}
                                {item.shop_confirm == 0 && (
                                  <input
                                    type='checkbox'
                                    className=''
                                    disabled={true}
                                    name={item.customer_name}
                                    checked={selectedOrder2.some((data) => data?.id === item.id)}
                                    onChange={(e) => handleChange2(e, item)}
                                  />
                                )}
                              </div>
                              <div
                                className='col-lg-2 col-md-2 col-2 d-flex align-items-center justify-content-center text-center'>VNMDH{item.id}</div>
                              <div className='col-lg-3 col-md-3 col-3'>
                                <div className='contact'>
                                  <div className='name'>
                                    Tên khách hàng {item.customer_name}
                                  </div>
                                  <div className='phone'>
                                    Số điện thoại: {item.customer_phone}
                                  </div>
                                </div>
                              </div>
                              <div
                                className='col-lg-2 col-md-2 col-2 d-flex align-items-center justify-content-center text-center'>
                                {
                                  item.process_id == 5 && (
                                    <span className='text-info'>
                                      Thành Công
                                    </span>
                                  )
                                }
                                {
                                  item.process_id == 6 && (
                                    <span className='text-danger'>
                                      Thất Bại
                                    </span>
                                  )
                                }
                                {
                                  item.process_id == 4 && (
                                    <span className='text-success'>
                                      Đang Giao
                                    </span>
                                  )
                                }
                              </div>
                              <div
                                className='col-lg-2 col-md-2 col-2 d-flex align-items-center justify-content-center text-center'>
                                {item.shop_confirm == 0 && (
                                  <span className='text-primary'>
                                    Chờ cửa hàng xác nhận
                                  </span>
                                )}
                              </div>
                              <>
                                <div
                                  className='col-lg-2 col-md-2 col-2 d-flex align-items-center justify-content-center text-center'>
                                  <Button variant='success' onClick={() => handleShow(item.id)}>
                                    Xem đơn hàng
                                  </Button>
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Hủy đơn hàng</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <div className='font-weight-bold'>
                                      CHI TIẾT ĐƠN HÀNG :
                                    </div>
                                    <table className='table'>
                                      <thead>
                                      <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Tên sản phẩm</th>
                                        <th scope='col'>Số lượng</th>
                                        <th scope='col'>Đơn giá</th>
                                        <th scope='col'>Tổng tiền</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      {detail ? (
                                        <>
                                          {
                                            detail.map((item, index) => {
                                              return (
                                                <tr>
                                                  <th scope='row'>{index += 1}</th>
                                                  <td>{item.standard_name}</td>
                                                  <td>{item.quantity}</td>
                                                  <td>{item.standard_price}</td>
                                                  <td>
                                                    {new Intl.NumberFormat('vi-VN', {
                                                      style: 'currency',
                                                      currency: 'VND'
                                                    }).format(item.standard_price * item.quantity)}
                                                  </td>
                                                </tr>
                                              )
                                            })
                                          }
                                        </>
                                      ) : (
                                        <>
                                          No Data
                                        </>
                                      )}
                                      </tbody>
                                    </table>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant='danger' onClick={handleClose}>
                                      Đóng
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      <button className='btn btn-primary ms-2 mr-5' type='submit' onClick={() => handingOrder()}>
                        Bàn Giao
                      </button>
                      <button className='btn btn-warning pl-5' type='submit' onClick={() => handleShowTotal()}>
                        Tính toán
                      </button>
                      <Modal show={show1} onHide={handleClose1}>
                        <Modal.Header closeButton>
                          <Modal.Title>Tính toán</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div>
                            Tống số đơn hàng cần bàn giao : <b className='text-danger'>{count.handing}</b>
                          </div>
                          <div>
                            Tống số đơn hàng thành công : <b className='text-danger'>{count.success}</b>
                          </div>
                          <div>
                            Tống số đơn hàng thất bại : <b className='text-danger'>{count.fail}</b>
                          </div>
                          <div>
                            Tống số đơn hàng đang giao : <b className='text-danger'>{count.shipping}</b>
                          </div>
                          <div>
                            Tống số tiền cần bàn giao : <b className='text-danger'>
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(count.total)}
                          </b>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant='danger' onClick={handleClose1}>
                            Đóng
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TableDataShipper