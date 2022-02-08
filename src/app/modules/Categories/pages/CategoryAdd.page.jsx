import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { ErrorMessage } from '@hookform/error-message'
import ImageInput from '../../../components/global/form/imageInput.component'
import { FormControl } from 'react-bootstrap'
import InputField from '../../../components/global/fields/Input.field'

import CategoryService from '../service/Category.service'

function CategoryAddPage() {
  const history = useHistory()
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm()
  const onHandSubmit = async (data) => {
    const newData = {
      ...data
    }
    console.log(newData)
    await CategoryService.store(newData)
    history.push('/category/list')
  }


  return (
    <div className="card card-custom gutter-b">
      <div className="d-flex flex-column-fluid">
        <div className="container">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">Thêm sản phẩm</h3>
              </div>
              <div className="card-toolbar">
                <Link type="button" to="/category/list" className="btn btn-light">
                  <i className="fa fa-arrow-left" />
                  Trở lại
                </Link>
              </div>
            </div>
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-line " role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" role="tab" aria-selected="true">
                    Thông tin
                  </a>
                </li>
              </ul>
              <div className="mt-5">
                <form onSubmit={handleSubmit(onHandSubmit)} className="form form-label-right">
                  <div className="form-group row">
                    <div className="col-lg-8">
                      <div className="row mb-5">
                        <div className="col-lg-6">
                          <InputField
                            id="name"
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Tên"
                            ref={register({
                              required: true,
                              maxLength: 255
                            })}
                            label="Nhập danh mục"
                            error={errors.name}
                          />
                          {errors.name && (
                            <div className="feedback mt-3 text-danger">
                              Hãy nhập <b>tên danh mục dưới 255 kí tự </b>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryAddPage
