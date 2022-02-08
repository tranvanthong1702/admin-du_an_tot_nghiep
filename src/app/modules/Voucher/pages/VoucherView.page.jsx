import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import VoucherService from '../service/Voucher.service'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'


function VoucherViewPage() {
    const history = useHistory()
    const [voucher, setVoucher] = useState([])
    const [success, setSuccess] = useState([])
    const { id } = useParams()
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()
    useEffect(() => {
        const getSlide = async () => {
            try {
                const { data } = await VoucherService.find(id);
                setVoucher(data)
                const { success } = await VoucherService.find(id);
                setSuccess(success)
            } catch (error) {
                console.log(error)
            }
        }
        getSlide()
    }, [])
    const handlePlanning = async (id, title) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Bạn có muốn lên kế hoạch cho voucher ${title}`)
        if (result) {
            await VoucherService.planning(id);
        }
        history.push('/voucher')
    }
    const handlerDelete = async (id, title) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Do you want delete ${title}`)
        if (result) {
            await VoucherService.delete_force(id);
        }
        history.push('/voucher')
    }
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    return (
        <div>

            <section className="section-info">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 d-flex align-items-center">
                            <div className="box-img">
                                <img src="https://i.imgur.com/CrWVnFR.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-9 m-auto">
                            {/* <h2 className="fz-1a text-center">Voucher</h2> */}
                            <div className="form">
                                {success ? (
                                    <div>
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="d-none">
                                                        <label className="mb-3" htmlFor>Loại voucher
                                                            <span className="text-small1"> </span> :
                                                        </label>
                                                        <InputField
                                                            id="classify_voucher_id"
                                                            type="text"
                                                            className="form-control mb-4"
                                                            name='classify_voucher_id'
                                                            readonly
                                                            value={voucher.classify_voucher_id}
                                                        />
                                                    </div>
                                                    <label className="mb-3" htmlFor>Tiêu đề
                                                        <span className="text-small1"></span> :
                                                    </label>
                                                    <InputField
                                                        id="title"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='title'
                                                        readonly
                                                        value={voucher.title}
                                                    />
                                                    <label className="mb-3" htmlFor>Mức giảm
                                                        <span className="text-small1"></span> :
                                                    </label>
                                                    <InputField
                                                        id="sale"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='sale'
                                                        readonly
                                                        value={voucher.sale === 100 ? 'Giảm 100% phí ship' : `${voucher.sale}%`}
                                                    />
                                                    <label className="mb-3" htmlFor>Đối tượng áp dụng
                                                        <span className="text-small1"> </span> :
                                                    </label>
                                                    <InputField
                                                        id="customer_type"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='customer_type'
                                                        readonly
                                                        value={voucher.customer_type}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label className="mb-3" htmlFor>Điều kiện áp dụng
                                                        <span className="text-small1"></span> :
                                                    </label>
                                                    <InputField
                                                        id="condition"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='condition'
                                                        readonly
                                                        value={voucher.condition == 0 ? 'Áp dụng cho tất cả đơn hàng' : `Đơn hàng tối thiểu ${voucher.condition}đ`}
                                                    />

                                                    <label className="mb-3" htmlFor>Số lần sử dụng
                                                        <span className="text-small1"></span> :
                                                    </label>
                                                    <InputField
                                                        id="times"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='times'
                                                        readonly
                                                        value={voucher.times === 100 ? 'Không giới hạn số lần sử dụng' : `${voucher.times}`}
                                                    />
                                                    <label className="mb-3" htmlFor>Ngày bắt đầu
                                                        <span className="text-small1"></span> :
                                                    </label>
                                                    <InputField
                                                        id="start_day"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='start_day'
                                                        readonly
                                                        value={convertDate(voucher.start_day)}
                                                    />
                                                    {voucher.active === 1 ? (
                                                        <>
                                                            <label className="mb-3" htmlFor>Ngày hết hạn
                                                                <span className="text-small1"></span> :
                                                            </label>
                                                            <InputField
                                                                id="expiration"
                                                                type="text"
                                                                className="form-control mb-4"
                                                                name='expiration'
                                                                readonly
                                                                value={convertDate(voucher.end_day)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <label className="mb-3" htmlFor>Thời gian khuyến mãi
                                                                <span className="text-small1">(ngày)</span> :
                                                            </label>
                                                            <InputField
                                                                id="expiration"
                                                                type="text"
                                                                className="form-control mb-4"
                                                                name='expiration'
                                                                readonly
                                                                value={voucher.expiration}
                                                            /></>
                                                    )}

                                                </div>
                                            </div>
                                        </form>
                                        <div className="btn__back text-center">
                                            <Link to="/voucher" className="btn btn-success font-weight-bolder font-size-sm">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 5L4 12L11 19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M4 12H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                Quay lại
                                            </Link>

                                            {voucher.active === 1 ? (
                                                <button className="btn btn-danger ms-3" onClick={() => handlerDelete(voucher.id)}>Dừng</button>
                                            ) : (
                                                voucher.deleted_at == null ? (
                                                    <>
                                                        <button className="btn btn-success mx-3" onClick={() => handlePlanning(voucher.id)}>Lên kế hoạch</button>
                                                        <button className="btn btn-danger ms-3" onClick={() => handlerDelete(voucher.id)}>Xóa</button>
                                                    </>
                                                )
                                                    : (
                                                        <button className="btn btn-danger ms-3" onClick={() => handlerDelete(voucher.id)}>Xóa</button>
                                                    )
                                            )}
                                        </div>
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
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default VoucherViewPage