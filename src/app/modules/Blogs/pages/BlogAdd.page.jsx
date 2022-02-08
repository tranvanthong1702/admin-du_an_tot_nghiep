import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { ErrorMessage } from '@hookform/error-message'
import ImageInput from '../../../components/global/form/imageInput.component'
import { FormControl } from 'react-bootstrap'
import InputField from '../../../components/global/fields/Input.field'
import SelectField from '../../../components/global/fields/Select.field'
import firebase from '../../../../firebase/config'
import BlogService from '../service/Blog.service'

function BlogAddPage() {
  const history = useHistory()
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm()
  const onHandSubmit = async (data) => {
    const file = data.image[0]
    let storageRef = firebase.storage().ref(`images/${file.name}`)
    storageRef
      .put(file)
      .then(() => {
        storageRef.getDownloadURL().then(async (url) => {
          const newData = {
            ...data,
            image: url
          }
          await BlogService.store(newData)
          history.push('/blogs/list')
        })
      })
      .catch((err) => console.log('erorr', err))
  }

  return (
    <div className="card card-custom gutter-b">
      <div className="d-flex flex-column-fluid">
        <div className="container">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label">Thêm Blog</h3>
              </div>
              <div className="card-toolbar">
                <Link type="button" to="/blogs/list" className="btn btn-light">
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
                            id="title"
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Tiêu đề"
                            ref={register({
                              required: true,
                              minLength: 2
                            })}
                            label="Nhập tiêu đề"
                            error={errors.title}
                          />
                          {errors.title && (
                            <div className="feedback mt-3 text-danger">
                              Hãy nhập <b>tiêu đề trên 2 kí tự</b>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="file"
                        class="form-control"
                        name="image"
                        ref={register({
                          required: true,
                          maxLength: 255
                        })}
                        error={errors.image}
                      />
                      {errors.image && (
                        <div className="feedback mt-3 text-danger">
                          Hãy chọn <b>ảnh bé hơn 2mb</b>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Nội dung</label>
                    <textarea
                      name="content"
                      className="form-control"
                      ref={register({
                        required: true,
                        minLength: 10
                      })}
                      error={errors.content}
                    />

                    {errors.content && (
                      <div className="feedback mt-3 text-danger">
                        Hãy nhập <b>nội dung trên 10 kí tự </b>
                      </div>
                    )}
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

export default BlogAddPage
