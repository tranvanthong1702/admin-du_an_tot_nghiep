import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import VoucherService from '../service/Voucher.service'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'

function VoucherAdd3Page() {
  const history = useHistory()
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm()
  const onHandSubmit = async (data) => {
    const newData = {
      ...data,
      condition: 0,
      active: 0,
      planning: 0
    }
    await VoucherService.add(newData)
    console.log(newData)
    history.push('/voucher')
  }
  var today = new Date()
  var date = today.toJSON()
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
              {/* <h2 className="fz-1a text-center">Thêm voucher loại 3</h2> */}
              <div className="form">
                <form onSubmit={handleSubmit(onHandSubmit)}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="d-none">
                        <label className="mb-3" htmlFor>
                          Loại voucher
                          <span className="text-danger"> *</span> :
                        </label>
                        <InputField
                          id="classify_voucher_id"
                          type="text"
                          className="form-control mb-4"
                          name="classify_voucher_id"
                          readonly
                          value="3"
                          ref={register({
                            required: ''
                          })}
                        />
                      </div>
                      <label className="mb-3" htmlFor>
                        Tiêu đề
                        <span className="text-danger">*</span> :
                      </label>
                      <InputField
                        id="title"
                        type="text"
                        className="form-control mb-4"
                        name="title"
                        ref={register({
                          required: 'Hãy nhập đầy đủ thông tin'
                        })}
                        error={errors.title}
                      />

                      <label className="mb-3" htmlFor>
                        Giảm giá
                        <span className="text-danger"> *</span> :
                      </label>
                      <InputField
                        id="sale"
                        type="number"
                        className="form-control mb-4"
                        name="sale"
                        value="100"
                        readonly
                        ref={register({
                          required: 'Hãy nhập đầy đủ thông tin'
                        })}
                        error={errors.sale}
                      />
                      <label className="mb-3" htmlFor>
                        Đối tượng áp dụng
                        <span className="text-danger"> *</span> :
                      </label>
                      <InputField
                        id="customer_type"
                        type="text"
                        className="form-control mb-4"
                        name="customer_type"
                        readonly
                        value="Tất cả khách hàng"
                        ref={register({
                          required: 'Hãy nhập đầy đủ thông tin'
                        })}
                        error={errors.customer_type}
                      />
                    </div>
                    <div className="col-lg-6">
                      <label className="mb-3" htmlFor>
                        Điều kiện áp dụng
                        <span className="text-danger">*</span> :
                      </label>
                      <InputField
                        id="condition"
                        type="text"
                        className="form-control mb-4"
                        name="condition"
                        disabled
                        value="Áp dụng cho tất cả đơn hàng"
                      />
                      <label className="mb-3" htmlFor>
                        Hạn sử dụng
                        <span className="text-danger">*</span> :
                      </label>
                      <InputField
                        id="expiration"
                        type="number"
                        className="form-control mb-4"
                        name="expiration"
                        ref={register({
                          required: 'Hãy nhập đầy đủ thông tin'
                        })}
                        error={errors.expiration}
                      />
                      <label className="mb-3" htmlFor>
                        Time
                        <span className="text-danger">*</span> :
                      </label>
                      <InputField
                        id="times"
                        type="number"
                        className="form-control mb-4"
                        name="times"
                        ref={register({
                          required: 'Hãy nhập đầy đủ thông tin'
                        })}
                        error={errors.times}
                      />
                      <label className="mb-3" htmlFor>
                        Ngày bắt đầu
                        <span className="text-danger">*</span> :
                      </label>
                      <InputField
                        id="start_day"
                        type="date"
                        className="form-control mb-4"
                        name="start_day"
                        ref={register({
                          required: 'Hãy nhập đầy đủ thông tin',
                          validate: (start_day) => start_day > date
                        })}
                        error={errors.start_day}
                      />
                    </div>
                  </div>
                  <div className="btn_ text-center">
                    <Link to="/voucher" className="btn btn-success font-weight-bolder back_vc font-size-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11 5L4 12L11 19"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4 12H20"
                          stroke="#fff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Quay lại
                    </Link>
                    <button className="btn btn-primary m-auto ">Tạo voucher</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default VoucherAdd3Page
