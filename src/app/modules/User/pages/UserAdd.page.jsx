import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import UserService from '../services/User.service'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'

function UserAddPage() {
    
    const profile1 = () => {
        const auth = localStorage.getItem('User') || null
        return auth ? JSON.parse(auth) : null
    }
    const user1 = profile1()
    const getProfile = () => {
    }
    const history = useHistory()
    const [user, setUser] = useState([])
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()
    const onHandSubmit = async (data) => {
        const file = data.image[0];
        let storageRef = firebase.storage().ref(`images/${file.name}`);
        storageRef.put(file).then(() => {
            storageRef.getDownloadURL().then(async (url) => {
                const newData = {
                    ...data,
                    image: url,
                }
                await UserService.add(newData);
                history.push('/customers');
            })
        }).catch(err => console.log('erorr', err))
    }
    var today = new Date()
    var date = today.toJSON()
    return (
        <div>
            <section className="section-info">
                <div className="container">
                    <div className="col-lg-8 m-auto">
                        <h2 className="fz-1a text-center">Thêm thông tin user</h2>
                        <div className="form">
                            <form onSubmit={handleSubmit(onHandSubmit)}>
                                <div className="d-none">
                                    <InputField
                                        id="user_id"
                                        type="text"
                                        className="form-control mb-4 d-none"
                                        name='user_id'
                                        value={user1.id}
                                        readonly
                                        ref={register({
                                            required: ''
                                        })}
                                        error={errors.name}
                                    />
                                </div>
                                <label className="mb-3" htmlFor>
                                    Hình ảnh
                                    <span className="text-danger">*</span> :
                                </label>

                                <InputField
                                    id="image"
                                    type="file"
                                    className="form-control mb-4"
                                    name='image'
                                    ref={register({
                                        required: 'Vui lòng nhập chọn ảnh '
                                    })}
                                    error={errors.image}
                                />
                                <label className="mb-3" htmlFor>
                                    Số điện thoại<span className="text-danger">*</span> :
                                </label>
                                <InputField
                                    id="phone"
                                    type="text"
                                    className="form-control mb-4"
                                    name='phone'
                                    ref={register({
                                        required: 'Vui lòng nhập số điện thoại '
                                    })}
                                    error={errors.phone}
                                />
                                <label className="mb-3" htmlFor>
                                    Giới tính<span className="text-danger">*</span> :
                                </label>
                                <div className="form-floating mb-3">
                                    <select
                                        className="form-select"
                                        id="floatingSelect"
                                        name='gender'
                                        ref={register({
                                            required: 'Vui lòng nhập  '
                                        })}
                                        error={errors.gender}
                                    >
                                        <option value='1'>
                                            Nam
                                        </option>
                                        <option value='2'>
                                            Nữ
                                        </option>
                                    </select>
                                    <label className="mb-3" htmlFor>
                                        Địa chỉ<span className="text-danger">*</span> :
                                    </label>
                                    <InputField
                                        id="address"
                                        type="text"
                                        className="form-control mb-4"
                                        name='address'
                                        ref={register({
                                            required: 'Vui lòng nhập đầy đủ thông tin '
                                        })}
                                        error={errors.address}
                                    />
                                    <label className="mb-3" htmlFor>Ngày sinh</label>

                                    <InputField
                                        id="birthday"
                                        type="date" id="birthdaytime"
                                        className="form-control mb-4"
                                        name='birthday'
                                        placeholder=""
                                        ref={register({
                                            required: ' Ngày sinh không hợp lệ',
                                            validate: (birthday) => birthday < date
                                        })}
                                        error={errors.birthday}
                                    />
                                    {errors.birthday && (
                                        <div className="feedback mt-3 text-danger">
                                            <b>Ngày sinh không hợp lệ </b>
                                        </div>
                                    )}
                                    <div className="btn_ text-center">
                                        <button className="btn btn-primary m-auto ">Lưu thông tin</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </section >
        </div >
    )
}
export default UserAddPage
