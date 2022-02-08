import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import VoucherService from '../service/Voucher.service'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'

function VoucherEditPage() {
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
        const { data } = await VoucherService.find(id)
        setVoucher(data)
        const { success } = await VoucherService.find(id);
        setSuccess(success)
      } catch (error) {
        console.log(error)
      }
    }
    getSlide()
  }, [])
  const onHandSubmit = async (data) => {
    const newData = {
      ...data
    }
    await VoucherService.update(id, newData)
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
            {success ? (


              <div className="col-lg-9 m-auto">
                <h2 className="fz-1a text-center">Sửa voucher</h2>
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
                            value={voucher.classify_voucher_id}
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
                          defaultValue={voucher.title}
                          ref={register({
                            required: 'Bạn hãy nhập đầy đủ thông tin'
                          })}
                          error={errors.title}
                        />

                        <label className="mb-3" htmlFor>
                          Mức giảm
                          <span className="text-danger"> *</span> :
                        </label>
                        <InputField
                          id="sale"
                          type="text"
                          className="form-control mb-4"
                          name="sale"
                          defaultValue={voucher.sale}
                          ref={register({
                            required: 'Bạn hãy nhập đầy đủ thông tin'
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
                          value={voucher.customer_type}
                          ref={register({
                            required: 'Bạn hãy nhập đầy đủ thông tin'
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
                          readonly
                          defaultValue={voucher.condition}
                          ref={register({
                            required: 'Bạn hãy nhập đầy đủ thông tin'
                          })}
                          error={errors.condition}
                        />
                        <label className="mb-3" htmlFor>
                          Thời gian áp dụng
                          <span className="text-danger">*</span> :
                        </label>
                        <InputField
                          id="expiration"
                          type="text"
                          className="form-control mb-4"
                          name="expiration"
                          defaultValue={voucher.expiration}
                          ref={register({
                            required: 'Bạn hãy nhập đầy đủ thông tin'
                          })}
                          error={errors.expiration}
                        />
                        <label className="mb-3" htmlFor>
                          Số lần sử dụng
                          <span className="text-danger">*</span> :
                        </label>
                        <InputField
                          id="times"
                          type="text"
                          className="form-control mb-4"
                          name="times"
                          readonly
                          defaultValue={voucher.times}
                          ref={register({
                            required: 'Bạn hãy nhập đầy đủ thông tin'
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
                          defaultValue={voucher.start_day}
                          ref={register({
                            required: 'Bạn hãy nhập đầy đủ thông tin',
                            validate: (start_day) => start_day > date
                          })}
                          error={errors.start_day}
                        />
                      </div>
                    </div>

                    <div className="btn_ text-center">
                      <button className="btn btn-primary m-auto ">Lưu thông tin</button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div div className="col-lg-9 d-flex justify-content-center mt-5">
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
      </section >
    </div >
  )
}
export default VoucherEditPage
