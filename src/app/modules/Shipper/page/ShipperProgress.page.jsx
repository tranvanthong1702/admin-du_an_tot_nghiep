import React, { useCallback, useEffect, useState } from 'react'
import InputField from '../../../components/global/fields/Input.field'
import { Link } from 'react-router-dom'



function ShipperProgress() {
    return (
        <div>
            <section className="section-link">
                <Link to="/shipper/list" className="btn btn-success font-weight-bolder font-size-sm">
                    Đơn hàng mới
                </Link>
                <Link to="/shipper/view" className="btn btn-success active_link font-weight-bolder font-size-sm">
                    Đơn hàng đang giao
                </Link>
                <Link to="/shipper/over" className="btn btn-success font-weight-bolder font-size-sm">
                    Đơn hàng hoàn thành
                </Link>
            </section>
            <section className="section-all">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 m-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Mã đơn hàng</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-custom">
                                        <td>1</td>
                                        <td>vn768776</td>

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
                                        <div className="btn col-lg-6 d-flex justify-content-end">
                                            <div className="btn btn-primary">
                                                Hoàn thành
                                            </div>
                                            <div className="btn btn-danger">
                                                Hủy
                                            </div>
                                        </div>
                                    </div>
                                    <tr className="bg-custom">
                                        <td>2</td>
                                        <td>vn768776</td>

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
                                        <div className="btn col-lg-6 d-flex justify-content-end">
                                            <div className="btn btn-primary">
                                                Hoàn thành
                                            </div>
                                            <div className="btn btn-danger">
                                                Hủy
                                            </div>
                                        </div>
                                    </div>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
export default ShipperProgress