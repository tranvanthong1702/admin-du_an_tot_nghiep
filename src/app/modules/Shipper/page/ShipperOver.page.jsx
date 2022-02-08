import React, { useCallback, useEffect, useState } from 'react'
import InputField from '../../../components/global/fields/Input.field'
import { Link } from 'react-router-dom'



function ShipperOder() {
    return (
        <div>
            <section className="section-link">
                <Link to="/shipper/list" className="btn btn-success font-weight-bolder font-size-sm">
                    Đơn hàng mới
                </Link>
                <Link to="/shipper/view" className="btn btn-success font-weight-bolder font-size-sm">
                    Đơn hàng đang giao
                </Link>
                <Link to="/shipper/over" className="btn btn-success  active_link font-weight-bolder font-size-sm">
                    Đơn hàng hoàn thành
                </Link>
            </section>
            <section className="section-all">
                <div className="row">
                    <div className="col-lg-9 m-auto">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Mã đơn hàng</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-custom">
                                    <td>1</td>
                                    <td>vn768776</td>
                                    <td className="access">Đã giao</td>
                                </tr>
                                <div className="row">
                                    <div className="oder-infor col-lg-6">
                                        <div className="name">
                                            Nguyễn Văn A
                                        </div>
                                        <div className="phone">
                                            Số điện thoại: 0949501096
                                        </div>
                                        <div className="total">
                                            Tổng tiền: 100.000.000 đ
                                        </div>
                                    </div>

                                </div>
                                <tr className="bg-custom">
                                    <td>2</td>
                                    <td>vn768776</td>
                                    <td className="access">Đã giao</td>
                                </tr>
                                <div className="row">
                                    <div className="oder-infor col-lg-6">
                                        <div className="name">
                                            Nguyễn Văn A
                                        </div>
                                        <div className="phone">
                                            Số điện thoại: 0949501096
                                        </div>
                                        <div className="total">
                                            Tổng tiền: 100.000.000 đ
                                        </div>
                                    </div>

                                </div>
                                <tr className="bg-custom">
                                    <td>3</td>
                                    <td>vn768776</td>
                                    <td className="delay">Đã hủy</td>
                                </tr>
                                <div className="row">
                                    <div className="oder-infor col-lg-6">
                                        <div className="name">
                                            Nguyễn Văn A
                                        </div>
                                        <div className="phone">
                                            Số điện thoại: 0949501096
                                        </div>
                                        <div className="total">
                                            Tổng tiền: 100.000.000 đ
                                        </div>
                                    </div>

                                </div>
                            </tbody>
                        </table>
                        <div className="action_over">
                            <div className="row">
                                <div className="col-lg-8">
                                    <p>
                                        Số đơn hàng: 3
                                    </p>
                                    <p>
                                        Đơn hàng thành công: 2
                                    </p>
                                    <p>
                                        Đơn hàng thất bại: 1
                                    </p>
                                    <p>
                                        Tổng tiền: 300.000.000đ
                                    </p>
                                </div>
                                <div className="col-lg-4 d-flex align-items-center justify-content-center">
                                    <div className="box__btn d-flex">
                                        <button className="btn_xl btn-primary">
                                            Bàn giao
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
export default ShipperOder