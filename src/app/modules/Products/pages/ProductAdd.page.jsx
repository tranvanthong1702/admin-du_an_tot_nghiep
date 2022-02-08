import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// import { ErrorMessage } from '@hookform/error-message'
import ImageInput from '../../../components/global/form/imageInput.component'
import { FormControl } from 'react-bootstrap'
import InputField from '../../../components/global/fields/Input.field'
import SelectField from '../../../components/global/fields/Select.field'
import ProductService from '../service/Product.service'
import firebase from '../../../../firebase/config'
import CategoryService from 'app/modules/Categories/service/Category.service'

function ProductAddPage() {
  const history = useHistory()
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm()
  const onHandSubmit = async (data) => {
    const file = data.image[0]
    console.log(file)
    let storageRef = firebase.storage().ref(`images/${file.name}`)
    storageRef
      .put(file)
      .then(() => {
        storageRef.getDownloadURL().then(async (url) => {
          // console.log(url);
          const newData = {
            ...data,
            image: url
          }
          console.log(newData)
          await ProductService.store(newData)
          history.push('/product/list')
        })
      })
      .catch((err) => console.log('erorr', err))
  }

  const [categories, setCategories] = useState([]) // 1
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await CategoryService.list()
        setCategories(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [])

  var today = new Date()
  var date = today.toJSON()
  console.log(date)
  const [listproduct, setListProduct] = useState([])

  const [existed, setExisted] = useState(false)
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await ProductService.list()

        setListProduct(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [])
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
                <Link type="button" to="/product/list" className="btn btn-light">
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
                          <label>Tên sản phẩm</label>
                          <InputField
                            id="name"
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Tên"
                            onChange={e => {
                              const check = listproduct.find(i => i.name.toLowerCase() === e.target.value.trim().toLowerCase())
                              setExisted(!!check)
                            }}
                            ref={register({
                              required: true,
                              maxLength: 255
                            })}
                            error={errors.name}
                          />
                          {errors.name && (
                            <div className="feedback mt-3 text-danger">
                              Hãy nhập <b>tên dưới 255 kí tự</b>
                            </div>
                          )}
                          {existed && (
                            <div className="feedback mt-3 text-danger">
                              sản phẩm đã tồn tại
                            </div>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <label>Chọn danh mục</label>
                          <select className="form-control form-control-solid" name="cate_id" ref={register}>
                            {categories.map((category, index) => (
                              <option value={`${category.id}`} key={index}>
                                {' '}
                                {category.name}{' '}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="row mb-5">
                        <div className="col-lg-6">
                          <label>Nhập giá</label>
                          <input
                            type="number"
                            className="form-control"
                            name="price"
                            placeholder="Giá"
                            ref={register({
                              required: true,
                              max: 100000000,
                              min: 0
                            })}
                            error={errors.price}
                          />
                          {errors.price && (
                            <div className="feedback mt-3 text-danger">
                              Hãy chọn <b>giá trong khoảng 0 - 100.000.000</b>
                            </div>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <label>Nhập trạng thái</label>
                          <select
                            defaultValue="1"
                            className="form-control form-control-solid"
                            name="status"
                            ref={register}
                          >
                            <option value="1">Còn hàng</option>
                            <option value="0">Hết hàng</option>
                          </select>
                        </div>
                        <div className="col-lg-6 mt-2">
                          <label>Nhập ngày hết hạn</label>
                          <InputField
                            id="expiration_date"
                            type="date"
                            min="2021-01-01"
                            max="2023-12-31"
                            className="form-control mb-4"
                            name="expiration_date"
                            defaultValue="0000-00-00"
                            ref={register({
                              validate: (expiration_date) => expiration_date > date
                            })}
                            error={errors.expiration_date}
                          />
                          {errors.expiration_date && (
                            <div className="feedback mt-3 text-danger">
                              Hãy chọn <b>ngày hết hạn </b>
                            </div>
                          )}
                        </div>
                        <div className="col-lg-6">
                          <label>Giảm giá ( % )</label>
                          <input
                            type="number"
                            className="form-control"
                            name="sale"
                            placeholder="Giảm giá"
                            defaultValue="0"
                            ref={register({
                              validate: (sale) => sale >= 0 && sale < 100
                            })}
                            error={errors.sale}
                          />
                          {errors.sale && (
                            <div className="feedback mt-3">
                              Giảm giá <b>không được dưới 0 % và lớn hơn 100 %</b>
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
                        <div className="feedback mt-3">
                          Chọn Ảnh <b>không quá 255 kí tự</b>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Chi tiết ngắn</label>

                    <textarea
                      placeholder="mô tả ngắn"
                      name="desc_short"
                      className="form-control"
                      ref={register({
                        required: true
                      })}
                      label="Nhập tên"
                      error={errors.desc_short}
                    />
                    {errors.desc_short && (
                      <div className="feedback mt-3 text-danger">
                        Hãy nhập <b>mô tả nhắn</b>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Chi tiết</label>
                    <textarea
                      placeholder="mô tả chi tiết"
                      name="description"
                      className="form-control"
                      ref={register({
                        required: true
                      })}
                      error={errors.description}
                    />
                    {errors.description && (
                      <div className="feedback mt-3 text-danger">
                        Hãy nhập <b>mô tả chi tiết</b>
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

export default ProductAddPage
