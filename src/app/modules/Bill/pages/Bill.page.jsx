import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'
import BillService from '../service/Bill.service'
import ReactPaginate from 'react-paginate'
import { DATA_LOAD_TIME } from '../../../../constants'
import OrderService from 'app/modules/OderStatus/service/Order.service'

function Bill() {
    const id = useParams()
    const [loading, setLoading] = useState(false)
    const [bill, setBill] = useState([])
    const [success, setSuccess] = useState([])
    const [selectedOrder, setSelectedOrder] = useState([])
    console.log(bill)
    const handleChange = (e, data) => {
        const { name, checked } = e.target
        if (checked) {
            if (name === 'allSelect') {
                setSelectedOrder(bill)
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
    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await BillService.list()
                setBill(data)
                const { success } = await BillService.list()
                setSuccess(success)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }, [])
    // console.log(bill)
    const [order, setOrder] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await OrderService.detail(id)
                setOrder(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }, [])
    const [q, setPhone] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const productPerPage = 10
    const pageVisited = pageNumber * productPerPage
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil(bill?.length / productPerPage)
    const search = (rows) => {
        return rows.filter((row) => row.order?.code_orders.toLowerCase().indexOf(q) > -1 || row.amount.toLowerCase().indexOf(q) > -1
        )
    }
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    const deletePaymentId = async (id, code_orders) => {
        const result = window.confirm(`Bạn có muốn xóa hóa đơn ${code_orders}? `)
        if (result) {
            setLoading(true)
            setTimeout(() => {
                BillService.deletePaymentId(id)
                setLoading(false)
            }, DATA_LOAD_TIME)
            setBill(bill.filter((item) => item.id !== id))
        }
    }
    const deletePaymentArrayId = () => {
        const convertID = selectedOrder.map((item) => item.id)
        if (convertID.length > 0) {
            const result = window.confirm(`Bạn có muốn xóa hóa đơn ? `)
            if (result) {
                setLoading(true)
                setTimeout(() => {
                    BillService.deletePaymentArrayId(id)
                    setLoading(false)
                }, DATA_LOAD_TIME)
                setBill(bill.filter((item) => item.id !== id))
            }
        } else {
            const result = window.confirm('Bạn chưa chọn đơn hàng nào !', '', 'warning')
        }
    }

    return (
        <div>
            <section>
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
                    </div>
                </form>
            </section>
            <section className="section-all">
                <div className="row">
                    <div className="col-lg-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    {/* <th scope='col' width={`2%`}>
                                        <input
                                            type='checkbox'
                                            className=''
                                            name='allSelect'
                                            checked={selectedOrder?.length === bill?.length}
                                            onChange={(e) => handleChange(e, bill)}
                                        />
                                    </th> */}
                                    <th scope="col" width={`12%`}>Mã đơn hàng</th>
                                    <th scope="col" width={`12%`}>paymentID</th>
                                    <th scope="col" width={`12%`}>requestID</th>
                                    <th scope="col" width={`12%`}>transID</th>
                                    <th scope="col" width={`12%`}>amount</th>
                                    <th scope="col" width={`12%`}>resultCode</th>
                                    <th scope="col" width={`12%`}>message</th>
                                    <th scope="col" width={`12%`}>created_at</th>
                                    <th width={`12%`}>Thao tác</th>

                                </tr>
                            </thead>
                            <>
                                {success ? (

                                    <tbody>
                                        {search(bill?.slice(pageVisited, pageVisited + productPerPage))?.map((data, index) => {
                                            return (
                                                <tr >
                                                    {/* <th scope="col" width={`2%`}>
                                                        <input
                                                            type='checkbox'
                                                            className=''
                                                            name={data.order_id}
                                                            checked={selectedOrder.some((data) => data?.id === data.id)}
                                                            onChange={(e) => handleChange(e, data)}
                                                        />
                                                    </th> */}
                                                    <td scope="col" width={`2%`}>
                                                        <Link
                                                            to={`order/${data.order_id}`}
                                                            title="Xem đơn hàng"
                                                        >
                                                            {data.order?.code_orders}
                                                        </Link></td>
                                                    <td scope="col" width={`12%`}>{data.paymentID}</td>
                                                    <td scope="col" width={`12%`}>{data.requestID}</td>
                                                    <td scope="col" width={`12%`}>{data.transID}</td>
                                                    <td scope="col" width={`12%`}>{data.amount}</td>
                                                    <td scope="col" width={`12%`}>{data.resultCode}</td>
                                                    <td scope="col" width={`12%`}>{data.message}</td>
                                                    <td scope="col" width={`12%`}>{convertDate(data.created_at)}</td>
                                                    <td scope="col" width={`12%`}>
                                                        <button
                                                            className='btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2'
                                                        // onClick={() => exportOrderID(item.id, item.code_orders)}
                                                        >
                                                            <i className='fas fa-file-download text-primary'></i>
                                                        </button>
                                                        <button
                                                            onClick={() => deletePaymentId(data.id, data.order.code_orders)}
                                                            type="button"
                                                            className="btn btn-sm btn-default btn-text-primary btn-hover-danger"
                                                            title="Xóa sản phẩm"
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

                                    </tbody>


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
                                <div className='d-flex justify-content-center'>
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
                            </>
                        </table>
                    </div>
                </div>

            </section>
        </div>
    )
}
export default Bill