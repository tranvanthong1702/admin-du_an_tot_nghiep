import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import OrderService from '../service/Order.service'
import Swal from 'sweetalert2'
import { Button, Modal } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

function TableData({ orders, callBack }) {
  const { id } = useParams()
  const [selectedOrder, setSelectedOrder] = useState([])
  const [show1, setShow1] = useState(false)
  const [q, setPhone] = useState([])
  const [shipper, setShipper] = useState()
  const [loading, setLoading] = useState()
  const [listShip, setListShip] = useState([])
  const [paymented, setPaymented] = useState([])
  const [sorted, setSorted] = useState([])
  const [shippered, setShippered] = useState([])
  const [processed, setProcessed] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage
  const pageCount = Math.ceil(orders?.length / productPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
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
  const handlePending = () => {
    const convertID = selectedOrder.map((item) => item.id)
    if (convertID.length > 0) {
      // eslint-disable-next-line no-restricted-globals
      Swal.fire({
        title: 'Bạn muốn chuyển trạng thái',
        showCancelButton: true,
        confirmButtonText: 'Xác Nhận',
        cancelButtonText: `Hủy`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (id == 1) {
            OrderService.updatePendingIDS(convertID).then((res) => {
              Swal.fire(`${res.data}`, '', 'success')
            })
            callBack()
          } else if (id == 2) {
            OrderService.updatePendingShipIDS(convertID).then((res) => {
              Swal.fire(`${res.data}`, '', 'success')
            })
            callBack()
          } else if (id == 3) {
            console.log(shipper)
            if (shipper) {
              if (shipper == 0) {
                Swal.fire(`Bạn chưa chọn shipper`, '', 'warning')
              } else {
                const convertData = {
                  order_id: convertID,
                  shipper_id: shipper
                }
                OrderService.updateShippingIDS(convertData).then((res) => {
                  Swal.fire(`${res.data}`, '', 'success')
                })
                callBack()
              }
            } else {
              Swal.fire(`Bạn chưa chọn shipper`, '', 'warning')
            }
          }
        }
      })
    } else {
      Swal.fire('Bạn chưa chọn đơn hàng nào !', '', 'warning')
    }
  }
  const change = (event) => {
    const idShipper = parseInt(event.target.value)
    setShipper(idShipper)
    Swal.fire('Chọn shipper Thành Công !', '', 'success')
  }
  const cancelData = () => {
    const convertID = selectedOrder.map((item) => item.id)
    if (convertID.length > 0) {
      Swal.fire({
        title: `Bạn muốn xóa ${convertID.length} đơn hàng`,
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: `Không`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          OrderService.cancelOrderIDS(convertID).then((res) => {
            Swal.fire(`Hủy đơn hàng thành công !`, '', 'success')
          })
          callBack()
        }
      })
    } else {
      Swal.fire('Bạn chưa chọn đơn hàng nào !', '', 'warning')
    }
  }
  const exportOrderID = (id, code) => {
    Swal.fire({
      title: `Bạn muốn xuất hóa đơn đơn hàng ${code}`,
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: `Không`,
      cancelButtonColor: 'red'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      // if (result.isConfirmed) {
      //   OrderService.cancelOrderID(id).then((res) => {
      //     Swal.fire(`Hủy đơn hàng ${code} thành công !`, '', 'success')
      //   })
      //   callBack()
      // }
      alert('chua co api xuat')
    })
  }
  const updateOrderID = (idOrder, code) => {
    if (parseInt(id) === 1) {
      Swal.fire({
        title: `Chuyển đơn hàng ${code} lên đang xử lí`,
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: `Không`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          OrderService.updatePendingID(idOrder).then((res) => {
            Swal.fire(`Chuyển trạng thái đơn hàng ${code} thành công !`, '', 'success')
          })
          callBack()
        }
      })
    } else if (parseInt(id) === 2) {
      Swal.fire({
        title: `Chuyển đơn hàng ${code} lên đang chờ giao`,
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: `Không`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          OrderService.updatePendingShipID(idOrder).then((res) => {
            Swal.fire(`Chuyển trạng thái đơn hàng ${code} thành công !`, '', 'success')
          })
          callBack()
        }
      })
    } else if (parseInt(id) === 3) {
      if (shipper) {
        const nameShip = listShip.find(item => item.id === parseInt(shipper)).user_name
        if (parseInt(shipper) === 0) {
          Swal.fire(`Bạn chưa chọn shipper`, '', 'warning')
        } else {
          Swal.fire({
            title: `Bàn giao đơn hàng ${code} cho nhân viên '${nameShip}'`,
            showCancelButton: true,
            confirmButtonText: 'Bàn Giao',
            cancelButtonText: `Không`,
            cancelButtonColor: 'red'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              OrderService.updateShippingID(idOrder).then((res) => {
                Swal.fire(`Bàn giao đơn hàng ${code} cho nhân viên '${nameShip}' thành công !`, '', 'success')
              })
              callBack()
            }
          })
        }
      } else {
        Swal.fire(`Bạn chưa chọn shipper`, '', 'warning')
      }
    }
  }
  const undoProcess = (idOrder, code) => {
    Swal.fire({
      title: `Bạn muốn đơn hàng ${code} trở về trạng thái trước`,
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: `Không`,
      cancelButtonColor: 'red'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        OrderService.undoProcess(idOrder).then((res) => {
          Swal.fire(`Cập nhật trạng thái đơn hàng ${code} thành công !`, '', 'success')
        })
        callBack()
      }
    })
  }
  const cancelOrderID = (id, code) => {
    Swal.fire({
      title: `Bạn muốn hủy đơn hàng ${code}`,
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: `Không`,
      cancelButtonColor: 'red'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        OrderService.cancelOrderID(id).then((res) => {
          Swal.fire(`Hủy đơn hàng ${code} thành công !`, '', 'success')
        })
        callBack()
      }
    })
  }
  const cancelShip = () => {
    const convertID = selectedOrder.map((item) => item.id)
    if (convertID.length > 0) {
      Swal.fire({
        title: `Bạn muốn hủy bàn giao ${convertID.length} đơn hàng`,
        showCancelButton: true,
        confirmButtonText: 'Hủy',
        cancelButtonText: `Đóng`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          OrderService.cancelShip(convertID).then((res) => {
            Swal.fire(`Hủy bàn giao thành công !`, '', 'success')
          })
          callBack()
        }
      })
    } else {
      Swal.fire('Bạn chưa chọn đơn hàng nào !', '', 'warning')
    }
  }
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  const search = (rows) => {
    return rows.filter(
      (row) => row.code_orders.toLowerCase().indexOf(q) > -1 ||
        row.customer_name.toLowerCase().indexOf(q) > -1
    )
  }
  const shopConfirm = () => {
    const convertID = selectedOrder.map((item) => item.id)
    if (convertID.length > 0) {
      Swal.fire({
        title: `Bạn muốn xác nhận bàn giao ${convertID.length} đơn hàng`,
        showCancelButton: true,
        confirmButtonText: 'Xác Nhận',
        cancelButtonText: `Đóng`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          OrderService.confirmShop(convertID).then((res) => {
            Swal.fire(`Xác nhận bàn giao thành công !`, '', 'success')
          })
          callBack()
        }
      })
    } else {
      Swal.fire(`Bạn chưa chọn đơn hàng nào !`, '', 'warning')
    }
  }
  const handleClose1 = () => setShow1(false)
  const total = () => {
    setShow1(true)
  }
  const count = {
    handing: orders.length,
    success: orders.filter(item => item.process_id == 5).length,
    fail: orders.filter(item => item.process_id == 6).length,
    shipping: orders.filter(item => item.process_id == 4).length,
    total: orders.reduce((a, b) => a + parseInt(b.total_price), 0)
  }
  const trashed = () => {
    const convertID = selectedOrder.map((item) => item.id)
    if (convertID.length > 0) {
      Swal.fire({
        title: `Bạn muốn lưu trữ ${convertID.length} đơn hàng`,
        showCancelButton: true,
        confirmButtonText: 'Lưu Trữ',
        cancelButtonText: `Đóng`,
        cancelButtonColor: 'red'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          OrderService.trashedShop(convertID).then((res) => {
            Swal.fire(`Lưu trữ thành công !`, '', 'success')
          })
          callBack()
        }
      })
    } else {
      Swal.fire(`Bạn chưa chọn đơn hàng nào !`, '', 'warning')
    }
  }
  const continueOrder = async () => {
    const convertID = selectedOrder.map((item) => item.id)
    if (convertID.length > 0) {
      const { value: process } = await Swal.fire({
        title: 'Chọn trạng thái cần chuyển',
        input: 'select',
        inputOptions: {
          1: 'Chưa xử lí',
          2: 'Đang xử lí',
          3: 'Chờ giao'
        },
        inputPlaceholder: 'Chọn trạng thái',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve()
            } else {
              resolve('Bạn chưa chọn trạng thái :)')
            }
          })
        }
      })
      if (process) {
        OrderService.continueShop(convertID, process).then((res) => {
          Swal.fire(`Xử Lí thành công !`, '', 'success')
        })
        callBack()
      }
    } else {
      Swal.fire(`Bạn chưa chọn đơn hàng nào ^^ !`, '', 'warning')
    }
  }
  const onChangeSorted = (e) => {
    setSorted(e.target.value)
  }
  const onChangePayment = (e) => {
    setPaymented(e.target.value)
  }
  const onChangeShipper = (e) => {
    setShippered(e.target.value)
  }
  const onChangeProcess = (e) => {
    setProcessed(e.target.value)
  }
  const listOrder = useMemo(() => {
    if (shippered == 'default' || shippered == '') {
      if (processed != 6 && processed != 5) {
        if (sorted == 'new') {
          return orders
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders.sort((a, b) => {
            var nameA = a.customer_name.toLowerCase(),
              nameB = b.customer_name.toLowerCase()
            if (nameA < nameB)
              return -1
            if (nameA > nameB) return 1
            return 0
          })
        } else if (sorted == 'name1') {
          return orders
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders
        }
      } else {
        if (sorted == 'new') {
          return orders
            .filter((i) => i.process_id === parseInt(processed))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders
            .filter((i) => i.process_id === parseInt(processed))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA < nameB)
                return -1
              if (nameA > nameB) return 1
              return 0
            })
        } else if (sorted == 'name1') {
          return orders
            .filter((i) => i.process_id === parseInt(processed))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders.filter((i) => i.process_id === parseInt(processed))
        }
      }
      if (parseInt(paymented) === 0) {
        if (sorted == 'new') {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders.filter((i) => i.payments === parseInt(paymented)).sort((a, b) => {
            var nameA = a.customer_name.toLowerCase(),
              nameB = b.customer_name.toLowerCase()
            if (nameA < nameB)
              return -1
            if (nameA > nameB) return 1
            return 0
          })
        } else if (sorted == 'name1') {
          return orders.filter((i) => i.payments === parseInt(paymented))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders.filter((i) => i.payments === parseInt(paymented))
        }
      } else if (parseInt(paymented) === 1) {
        if (sorted == 'new') {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders.sort((a, b) => {
            var nameA = a.customer_name.toLowerCase(),
              nameB = b.customer_name.toLowerCase()
            if (nameA < nameB)
              //sort string ascending
              return -1
            if (nameA > nameB) return 1
            return 0
          })
        } else if (sorted == 'name1') {
          return orders
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders.filter((i) => i.payments === parseInt(paymented))
        }
      } else {
        if (sorted == 'new') {
          return orders
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders.sort((a, b) => {
            var nameA = a.customer_name.toLowerCase(),
              nameB = b.customer_name.toLowerCase()
            if (nameA < nameB)
              //sort string ascending
              return -1
            if (nameA > nameB) return 1
            return 0
          })
        } else if (sorted == 'name1') {
          return orders
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders
        }
      }
    } else {
      if (processed != 5 && processed != 6) {
        if (sorted == 'new') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA < nameB)
                return -1
              if (nameA > nameB) return 1
              return 0
            })
        } else if (sorted == 'name1') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders.filter((i) => i.shipper_id === parseInt(shippered))
        }
      } else {
        if (sorted == 'new') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .filter((i) => i.process_id === parseInt(processed))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .filter((i) => i.process_id === parseInt(processed))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA < nameB)
                return -1
              if (nameA > nameB) return 1
              return 0
            })
        } else if (sorted == 'name1') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .filter((i) => i.process_id === parseInt(processed))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .filter((i) => i.process_id === parseInt(processed))
        }
      }
      if (parseInt(paymented) === 0) {
        if (sorted == 'new') {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA < nameB)
                return -1
              if (nameA > nameB) return 1
              return 0
            })
        } else if (sorted == 'name1') {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .filter((i) => i.shipper_id === parseInt(shippered))
        }
      } else if (parseInt(paymented) === 1) {
        if (sorted == 'new') {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA < nameB)
                //sort string ascending
                return -1
              if (nameA > nameB) return 1
              return 0
            })
        } else if (sorted == 'name1') {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders
            .filter((i) => i.payments === parseInt(paymented))
            .filter((i) => i.shipper_id === parseInt(shippered))
        }
      } else {
        if (sorted == 'new') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        } else if (sorted == 'name') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA < nameB)
                //sort string ascending
                return -1
              if (nameA > nameB) return 1
              return 0
            })
        } else if (sorted == 'name1') {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
            .sort((a, b) => {
              var nameA = a.customer_name.toLowerCase(),
                nameB = b.customer_name.toLowerCase()
              if (nameA > nameB)
                return -1
              if (nameA < nameB) return 1
              return 0
            })
        } else {
          return orders
            .filter((i) => i.shipper_id === parseInt(shippered))
        }
      }
    }
  }, [sorted, paymented, orders, shippered, processed])
  useEffect(() => {
    const getShipper = async () => {
      try {
        const { data } = await OrderService.listShip()
        setListShip(data)
      } catch (error) {
        console.log(error)
      }
    }
    getShipper()
  }, [])
  return (
    <section className='section-all'>
      <form className='mb-7'>
        <div className='row'>
          <div className='col-lg-6 col-md-6'>
            <form action='' className='search-pro'>
              <input
                type='text'
                className='form-control mb-4'
                value={q}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Tìm kiếm ...'
              />
              <i className='fa fa-search' aria-hidden='true'></i>
            </form>
          </div>
          {id == 1 && (
            <div className='col-lg-2 col-md-2'>
              <select onChange={onChangePayment}>
                <option value={2}>Thanh Toán</option>
                <option value={1}>COD</option>
                <option value={0}>MOMO</option>
              </select>
            </div>
          )}
          {id == 2 && (
            <div className='col-lg-2 col-md-2'>
              <select onChange={onChangePayment}>
                <option value={2}>Thanh Toán</option>
                <option value={1}>COD</option>
                <option value={0}>MOMO</option>
              </select>
            </div>
          )}
          {id == 3 && (
            <div className='col-lg-2 col-md-2'>
              <select onChange={onChangePayment}>
                <option value={2}>Thanh Toán</option>
                <option value={1}>COD</option>
                <option value={0}>MOMO</option>
              </select>
            </div>
          )}
          {id == 3 && (
            <div className='col-lg-2 col-md-2'>
              <select onChange={onChangeShipper} defaultValue={'default'}>
                <option value={'default'}>Người giao</option>
                {listShip?.map(item => {
                  return (
                    <option value={item.id} key={item.id}>{item.user_name}</option>
                  )
                })}
              </select>
            </div>
          )}
          {id == 4 && (
            <div className='col-lg-2 col-md-2'>
              <select onChange={onChangeShipper} defaultValue={'default'}>
                <option value={'default'}>Người giao</option>
                {listShip?.map(item => {
                  return (
                    <option value={item.id} key={item.id}>{item.user_name}</option>
                  )
                })}
              </select>
            </div>
          )}
          {id == 5 && (
            <div className='col-lg-2 col-md-2'>
              <select onChange={onChangeShipper} defaultValue={'default'}>
                <option value={'default'}>Người giao</option>
                {listShip?.map(item => {
                  return (
                    <option value={item.id} key={item.id}>{item.user_name}</option>
                  )
                })}
              </select>
            </div>
          )}
          {id == 6 && (
            <>
              <div className='col-lg-2 col-md-2'>
                <select onChange={onChangeShipper} defaultValue={'default'}>
                  <option value={'default'}>Người giao</option>
                  {listShip?.map(item => {
                    return (
                      <option value={item.id} key={item.id}>{item.user_name}</option>
                    )
                  })}
                </select>
              </div>
            </>
          )}
          {id == 7 && (
            <>
              <div className='col-lg-2 col-md-2'>
                <select onChange={onChangeProcess} defaultValue={'default'}>
                  <option value={''}>Trạng Thái</option>
                  <option value={6}>Thất Bại</option>
                  <option value={5}>Thành Công</option>
                </select>
              </div>
              <div className='col-lg-2 col-md-2'>
                <select onChange={onChangeShipper} defaultValue={'default'}>
                  <option value={'default'}>Người giao</option>
                  {listShip?.map(item => {
                    return (
                      <option value={item.id} key={item.id}>{item.user_name}</option>
                    )
                  })}
                </select>
              </div>
            </>
          )}
          {id == 8 && (
            <>
              <div className='col-lg-2 col-md-2'>
                <select onChange={onChangeProcess} defaultValue={'default'}>
                  <option value={''}>Trạng Thái</option>
                  <option value={6}>Thất Bại</option>
                  <option value={5}>Thành Công</option>
                </select>
              </div>
              <div className='col-lg-2 col-md-2'>
                <select onChange={onChangeShipper} defaultValue={'default'}>
                  <option value={'default'}>Người giao</option>
                  {listShip?.map(item => {
                    return (
                      <option value={item.id} key={item.id}>{item.user_name}</option>
                    )
                  })}
                </select>
              </div>
            </>
          )}
          <div className='col-lg-2 col-md-3'>
            <select onChange={onChangeSorted}>
              <option value={''}>Sắp xếp</option>
              <option value='new'>Mới nhất</option>
              <option value='name'>Tên A-Z</option>
              <option value='name1'>Tên Z-A</option>
            </select>
          </div>
        </div>
      </form>
      <div className='row'>
        <div className='col-lg-12'>
          <table className='table'>
            <thead>
            <tr>
              <th scope='col'>
                <input
                  type='checkbox'
                  className=''
                  name='allSelect'
                  checked={selectedOrder?.length === orders?.length}
                  onChange={(e) => handleChange(e, orders)}
                />
              </th>
              <th scope='col'>Mã đơn hàng</th>
              <th scope='col'>Tổng tiền</th>
              <th scope='col'>Thanh toán</th>
              <th scope='col'>Ngày tạo</th>
              <th scope='col'>Khách hàng</th>
              <th scope='col'>Điện thoại</th>
              {id == 1 && (
                <>
                  <th scope='col'>Địa chỉ</th>
                  <th scope='col'>Hành động</th>
                </>
              )}
              {id == 2 && (
                <>
                  <th scope='col'>Địa chỉ</th>
                  <th scope='col'>Hành động</th>
                </>
              )}
              {id == 3 && (
                <>
                  <th scope='col'>Trạng Thái</th>
                  <th scope='col'>Người giao</th>
                  <th scope='col'>Hành động</th>
                </>
              )}
              {id == 4 && (
                <>
                  <th scope='col'>Địa chỉ</th>
                  <th scope='col'>Người giao</th>
                </>
              )}
              {id == 5 && (
                <>
                  <th scope='col'>Địa chỉ</th>
                  <th scope='col'>Người giao</th>
                </>
              )}
              {id == 6 && (
                <>
                  <th scope='col'>Địa chỉ</th>
                  <th scope='col'>Người giao</th>
                </>
              )}
              {id == 7 && (
                <>
                  <th scope='col'>Người giao</th>
                  <th scope='col'>Trạng Thái</th>
                  <th scope='col'>Xác nhận</th>
                </>
              )}
              {id == 8 && (
                <>
                  <th scope='col'>Người giao</th>
                  <th scope='col'>Trạng Thái</th>
                </>
              )}
              {id == 9 && (
                <>
                  <th scope='col'>Người giao</th>
                  <th scope='col'>Trạng Thái</th>
                  <th scope='col'>Hành Động</th>
                </>
              )}
            </tr>
            </thead>
            <tbody>
            {search(listOrder?.slice(pageVisited, pageVisited + productPerPage)).map((item) => {
              return (
                <tr key={item.id}>
                  <th scope='row'>
                    <input
                      type='checkbox'
                      className=''
                      name={item.customer_name}
                      checked={selectedOrder.some((data) => data?.id === item.id)}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </th>
                  <td>
                    <Link
                      to={`/status/view/${item.process_id}/${item.id}`}
                    >
                      {item.code_orders}
                    </Link>
                  </td>
                  <td>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(item.total_price)}
                  </td>
                  <td>{item.payments === 1 ? 'MOMO' : 'COD'}</td>
                  <td>{convertDate(item.created_at)}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.customer_phone}</td>
                  {id == 1 && (
                    <td>{item.customer_address}</td>
                  )
                  }
                  {id == 2 && (
                    <td>{item.customer_address}</td>
                  )
                  }
                  {id == 3 && (
                    <>
                      <td>
                        {item.shipper_confirm === 0 ? (
                          <span className='text-success'>
                              Chờ xác nhận
                            </span>
                        ) : (
                          ''
                        )}
                      </td>
                      <td scope='col-lg-2'>
                        {item.shipper ? (
                          <span className=''>
                              {item.shipper.user_name}
                            </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </>
                  )}
                  {id == 4 && (
                    <>
                      <td>{item.customer_address}</td>
                      <td>
                        {item.shipper ? (
                          <span className=''>
                              {item.shipper.user_name}
                            </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </>
                  )}
                  {id == 5 && (
                    <>
                      <td>{item.customer_address}</td>
                      <td>
                        {item.shipper ? (
                          <span className=''>
                              {item.shipper.user_name}
                            </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </>
                  )}
                  {id == 6 && (
                    <>
                      <td>{item.customer_address}</td>
                      <td>
                        {item.shipper ? (
                          <span className=''>
                              {item.shipper.user_name}
                            </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </>
                  )}
                  {id == 8 && (
                    <>
                      <td>
                        {item.shipper ? (
                          <span className=''>
                              {item.shipper.user_name}
                            </span>
                        ) : (
                          ''
                        )}
                      </td>
                      <th>
                        {
                          item.process_id == 1 && (
                            <span className='text-primary'>
                                Chưa Xử Lí
                              </span>
                          )
                        }
                        {
                          item.process_id == 2 && (
                            <span className='text-warning'>
                                Đang Xử Lí
                              </span>
                          )
                        }
                        {
                          item.process_id == 3 && (
                            <span className='text-dark'>
                                Chờ Giao
                              </span>
                          )
                        }
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
                      </th>
                    </>
                  )}
                  {id == 9 && (
                    <>
                      <td>
                        {item.shipper ? (
                          <span className=''>
                              {item.shipper.user_name}
                            </span>
                        ) : (
                          ''
                        )}
                      </td>
                      <th>
                        {
                          item.process_id == 1 && (
                            <span className='text-primary'>
                                Chưa Xử Lí
                              </span>
                          )
                        }
                        {
                          item.process_id == 2 && (
                            <span className='text-warning'>
                                Đang Xử Lí
                              </span>
                          )
                        }
                        {
                          item.process_id == 3 && (
                            <span className='text-dark'>
                                Chờ Giao
                              </span>
                          )
                        }
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
                      </th>
                    </>
                  )}
                  {id == 7 && (
                    <>
                      <td>
                        {item.shipper ? (
                          <span className=''>
                              {item.shipper.user_name}
                            </span>
                        ) : (
                          ''
                        )}
                      </td>
                      <th>
                        {
                          item.process_id == 1 && (
                            <span className='text-primary'>
                                Chưa Xử Lí
                              </span>
                          )
                        }
                        {
                          item.process_id == 2 && (
                            <span className='text-warning'>
                                Đang Xử Lí
                              </span>
                          )
                        }
                        {
                          item.process_id == 3 && (
                            <span className='text-dark'>
                                Chờ Giao
                              </span>
                          )
                        }
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
                      </th>
                      <td>
                        {item.shop_confirm == 0 && (
                          <span className='text-primary'>
                              Đã gửi yêu cầu xác nhận bàn giao
                            </span>
                        )}
                      </td>
                    </>
                  )}
                  {id == 1 && (
                    <td className='d-flex'>
                      <button
                        className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                        onClick={() => updateOrderID(item.id, item.code_orders)}
                      >
                        <i className='fas fa-check-square'></i>
                      </button>
                      <button
                        className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                        onClick={() => exportOrderID(item.id, item.code_orders)}
                      >
                        <i className='fas fa-file-download text-primary'></i>
                      </button>
                      <button
                        type='button'
                        className='btn btn-sm btn-default btn-text-primary btn-hover-danger'
                        title='Hủy đơn hàng'
                        onClick={() => cancelOrderID(item.id, item.code_orders)}
                      >
                        <i className='far fa-window-close text-danger'></i>
                      </button>
                    </td>
                  )}
                  {id == 2 && (
                    <td className='d-flex'>
                      <button
                        className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                        onClick={() => updateOrderID(item.id, item.code_orders)}
                      >
                        <i className='fas fa-check-square'></i>
                      </button>
                      <button
                        className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                        onClick={() => undoProcess(item.id, item.code_orders)}
                      >
                        <i className='fas fa-undo text-success'></i>
                      </button>
                      <button
                        className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                        onClick={() => exportOrderID(item.id, item.code_orders)}
                      >
                        <i className='fas fa-file-download text-primary'></i>
                      </button>
                      <button
                        type='button'
                        className='btn btn-sm btn-default btn-text-primary btn-hover-danger'
                        title='Hủy đơn hàng'
                        onClick={() => cancelOrderID(item.id, item.code_orders)}
                      >
                        <i className='far fa-window-close text-danger'></i>
                      </button>
                    </td>
                  )}
                  {id == 3 && (
                    <td className='d-flex'>
                      <button
                        className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                        onClick={() => exportOrderID(item.id, item.code_orders)}
                      >
                        <i className='fas fa-file-download text-primary'></i>
                      </button>
                      <button
                        type='button'
                        className='btn btn-sm btn-default btn-text-primary btn-hover-danger'
                        title='Hủy đơn hàng'
                        onClick={() => cancelOrderID(item.id, item.code_orders)}
                      >
                        <i className='far fa-window-close text-danger'></i>
                      </button>
                      {item.shipper_id ? (
                        ''
                      ) : (
                        <button
                          className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                          onClick={() => undoProcess(item.id, item.code_orders)}
                        >
                          <i className='fas fa-undo text-success'></i>
                        </button>
                      )}
                    </td>
                  )}
                  {id == 9 && (
                    <td className='d-flex'>
                      <button
                        className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                        onClick={() => exportOrderID(item.id, item.code_orders)}
                      >
                        <i className='fas fa-file-download text-primary'></i>
                      </button>
                    </td>
                  )}
                </tr>
              )
            })}
            </tbody>
          </table>
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
          {/*action*/}
          <div className='action'>
            <div className='row'>
              <div className='col-lg-7' />
              {id == 1 && (
                <div className='col-lg-4'>
                  <div className='box__btn d-flex justify-content-around'>
                    <button className='btn_xl btn-primary btn' onClick={() => handlePending()}>Chọn
                      xử lý
                    </button>
                    <button className='btn_delete btn-danger btn' onClick={() => cancelData()}>Hủy
                      đơn hàng
                    </button>
                  </div>
                </div>
              )}
              {id == 2 && (
                <div className='col-lg-4'>
                  <div className='box__btn d-flex justify-content-around'>
                    <button className='btn_xl btn-primary btn' onClick={() => handlePending()}>Chọn
                      chờ giao
                    </button>
                    <button className='btn_delete btn-danger btn' onClick={() => cancelData()}>Hủy
                      đơn hàng
                    </button>
                  </div>
                </div>
              )}
              {id == 7 && (
                <div className='col-lg-4'>
                  <div className='box__btn d-flex justify-content-around'>
                    <button className='btn_xl btn-primary btn' onClick={() => shopConfirm()}>
                      Xác Nhận Bàn Giao
                    </button>
                    <button className='btn_delete btn-warning btn' onClick={() => total()}>
                      Tính Toán
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
              {id == 8 && (
                <div className='col-lg-4'>
                  <div className='box__btn d-flex justify-content-around'>
                    <button className='btn_xl btn-danger btn' onClick={() => trashed()}>
                      Lưu Trữ
                    </button>
                    <button className='btn_delete btn-warning btn' onClick={() => continueOrder()}>
                      Tiếp tục xử lí
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {id == 3 && (
            <div>
              <div className='shipper col-lg-6'>
                <label htmlFor=''>Chọn nhân viên giao hàng</label>
                {loading ? (
                  <>
                    Đang load
                  </>
                ) : (
                  <>
                    {listShip.length === 0 ? (
                      <div>
                        Không có shipper nào
                      </div>
                    ) : (
                      <select className='form-select mb-4' aria-label='Default select example'
                              defaultValue={0}
                              onChange={change}>
                        <option value={0}>Chọn nhân viên</option>
                        {listShip.map(item => (
                          <option value={parseInt(item.id)} key={item.id}>{item.user_name}</option>
                        ))}
                      </select>
                    )}
                  </>
                )}
              </div>
              <div className='action'>
                <div className='row'>
                  <div className='col-lg-6'></div>
                  <div className='col-lg-6'>
                    <div className='box__btn d-flex justify-content-around'>
                      <button className='btn_xl btn-primary btn'
                              onClick={() => handlePending()}>Bàn giao
                      </button>
                      <button className='btn_xl btn-danger btn' onClick={() => cancelShip()}>Hủy
                        bàn giao
                      </button>
                      <button className='btn_delete btn-danger btn'
                              onClick={() => cancelData()}>Hủy đơn hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/*End Action*/}
        {/*Filter */}
        {/*End Filter */}
      </div>
    </section>
  )
}

export default TableData
