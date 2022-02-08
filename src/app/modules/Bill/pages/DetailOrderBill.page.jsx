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

function DetailOrderBill() {
    const { id } = useParams()
    const convertID = Number(id)
    console.log(convertID)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState([])
    const [order, setOrder] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await OrderService.detail(convertID)
                console.log(data)
                setOrder(data)
                const { success } = await OrderService.detail(convertID)
                setSuccess(success)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }, [])
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    console.log(order)
    return (
        <div>
            <section className="section-all">
                <Link type="button" to="/bill/list" className="btn btn-light">
                    <i className="fa fa-arrow-left" />
                    Trở lại
                </Link>
                <div className="row">
                    <div className="col-lg-12">
                        <table class="table">
                            <thead>
                                <tr>

                                    <th scope="col" width={`12%`}>Mã đơn hàng</th>
                                    <th scope="col" width={`12%`}>Tên khách hàng</th>
                                    <th scope="col" width={`12%`}>Địa chỉ</th>
                                    <th scope="col" width={`12%`}>Email</th>
                                    <th scope="col" width={`12%`}>Số điện thoại</th>
                                    <th scope="col" width={`12%`}>Số lượng </th>
                                    <th scope="col" width={`12%`}>Thành tiền</th>
                                    <th scope="col" width={`12%`}>Thời gian</th>

                                </tr>
                            </thead>
                            {success ? (
                                <tbody>

                                    <tr>
                                        <td scope="col" width={`12%`}>{order.code_orders}</td>
                                        <td scope="col" width={`12%`}>{order.customer_name}</td>
                                        <td scope="col" width={`12%`}>{order.customer_address}</td>
                                        <td scope="col" width={`12%`}>{order.customer_email}</td>
                                        <td scope="col" width={`12%`}>{order.customer_phone}</td>
                                        <td scope="col" width={`12%`}>{order.order_details?.length}</td>
                                        <td scope="col" width={`12%`}>{order.total_price}</td>
                                        <td scope="col" width={`12%`}>{convertDate(order.created_at)}</td>



                                    </tr>

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
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default DetailOrderBill