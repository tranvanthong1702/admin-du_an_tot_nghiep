import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import UserService from '../services/User.service'
import { DATA_LOAD_TIME } from '../../../../constants'
import InputField from '../../../components/global/fields/Input.field'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import firebase from 'firebase/app'
function UserUpdatePage() {
  var today = new Date()
  var date = today.toJSON()
  const [user, setUser] = useState([])
  const [infor, setInfor] = useState([])
  const [imageChange, setImageChange] = useState('')

  const { id } = useParams()
  const history = useHistory()
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await UserService.find(id)
        setUser(data)
        const i = data.info_user[0]
        setInfor(i)
        setImageChange(i.image)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  const handleChangeImage = (e) => {
    const file = e.target.files[0]
    console.log(file)
    let storageRef = firebase.storage().ref(`images/${file.name}`)
    storageRef
      .put(file)
      .then(() => {
        storageRef.getDownloadURL().then(async (url) => {
          console.log(url)
          setImageChange(url)
        })
      })
      .catch((err) => console.log('erorr', err))
    console.log(file)
  }
  const onHandSubmit = async (data) => {
    const newData = {
      ...data,
      image: imageChange
    }
    console.log(newData)
    await UserService.update(id, newData)
    history.push('/customers')
  }
  return (
    <div className="section-info">
      <div className="container">
        <div className="col-lg-8 m-auto">
          <h2 className="fz-1a text-center">Sửa thông tin user</h2>
          {/* <div>{user_name}</div> */}
          <form onSubmit={handleSubmit(onHandSubmit)}>
            <div className="d-none">
              <InputField
                id="user_id"
                type="text"
                className="form-control d-none"
                name="user_id"
                value={id}
                readonly
                ref={register({
                  required: ''
                })}
                error={errors.name}
              />
            </div>
            <label className="mb-2" htmlFor>
              Hình ảnh<span className="text-danger">*</span> :
            </label>
            <img src={infor.image} alt="" className="col-lg-6" />
            <InputField
              id="image"
              type="file"
              className="form-control"
              name="image"
              onChange={handleChangeImage}
              // ref={register({ required: true })}
              // error={errors.name}
            />
            <label className="mb-2" htmlFor>
              Phone<span className="text-danger">*</span> :
            </label>
            <InputField
              id="phone"
              type="text"
              className="form-control"
              name="phone"
              defaultValue={infor.phone}
              ref={register({
                required: 'Vui lòng nhập '
              })}
              error={errors.name}
            />
            <label className="mb-2" htmlFor>
              Giới tính<span className="text-danger">*</span> :
            </label>
            <div className="form-floating mb-3">
              <select className="form-select mb-3" id="floatingSelect" name="gender" ref={register}>
                <option value="1">Nam</option>
                <option value="2">Nữ</option>
              </select>
            </div>
            
            <label className="mb-2" htmlFor>
              Địa chỉ<span className="text-danger">*</span> :
            </label>
            <InputField
              id="address"
              type="text"
              className="form-control"
              name="address"
              defaultValue={infor.address}
              ref={register({
                required: 'Vui lòng nhập đầy đủ thông tin '
              })}
              error={errors.name}
            />
            <label className="mb-2" htmlFor>
              Ngày sinh
            </label>
            <InputField
              id="birthday"
              type="date"
              id="birthdaytime"
              className="form-control mb-4"
              name="birthday"
              placeholder=""
              defaultValue={infor.birthday}
              ref={register({
                required: 'Vui lòng nhập  ',
                validate: (birthday) => birthday < date
              })}
              error={errors.birthday}
            />
            {errors.birthday && (
              <div className="feedback mt-3">
                Ngày sinh <b>bé hơn ngày hiện tại</b>
              </div>
            )}
            

            <div className="btn_ text-center">
              <button className="btn btn-primary m-auto ">Lưu thông tin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserUpdatePage
