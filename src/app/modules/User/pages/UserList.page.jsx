import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import UserService from '../services/User.service'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'


function UserListPage() {
    const [user, setUser] = useState([])
    const [infor, setInfor] = useState([])
    const history = useHistory()
    const [success, setSuccess] = useState([])
    const [loading, setLoading] = useState([])
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()
    const { id } = useParams()

    let btn;
    if (infor == null) {
        btn = <Link className="btn btn-primary mr1" to="/user/add">Thêm thông tin</Link>
    } else {
        btn = <Link className="btn btn-danger" to={`/user/edit/${id}`}>Cập nhật thông tin</Link>
    }
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await UserService.find(id);
                setUser(data)
                const { success } = await UserService.find(id);
                setSuccess(success)
                const i = data.info_user[0]
                setInfor(i)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    return (
        <div>
            <section className="section-info">
                {success ? (
                    infor == null ? (
                        <div className="container">
                            <div className="row">

                                <div className="col-lg-9 m-auto">
                                    <h2 className="fz-1a text-center">Thông tin user</h2>
                                    <div className="form">
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <label className="mb-3" htmlFor>
                                                        User name<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="user_name"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='user_name'
                                                        disabled
                                                        value={user.user_name}
                                                    />
                                                    <label className="mb-3" htmlFor>
                                                        Email<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="email"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='email'
                                                        disabled
                                                        value={user.email}
                                                    />
                                                    <label className="mb-3" htmlFor>
                                                        Phone<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="phone"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='phone'
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label className="mb-3" htmlFor>
                                                        Giới tính<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="gender"
                                                        type="text"
                                                        disabled
                                                        className="form-control mb-4"
                                                        name='gender'
                                                    />
                                                    <label className="mb-3" htmlFor>
                                                        Địa chỉ<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="address"
                                                        type="text"
                                                        disabled
                                                        className="form-control mb-4"
                                                        name='address'
                                                    />
                                                    <label className="mb-3" htmlFor>Ngày sinh<span className="text-danger">*</span> :</label>
                                                    <InputField
                                                        id="birthday"
                                                        type="text"
                                                        disabled
                                                        className="form-control mb-4"
                                                        name='birthday'
                                                    />
                                                </div>

                                            </div>
                                            <p className="text-center">Bạn chưa có thông tin! Hãy thêm thông tin ngay bây giờ <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 20L12 4" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5 13L12 20L19 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            </p>
                                            <div className="btn_ text-center">
                                                {btn}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 d-flex justify-content-center align-items-center">
                                    <div className="box-avatar">
                                        <img src={infor.image} alt="" className="mb-3 img-fluid" />
                                    </div>

                                </div>
                                <div className="col-lg-9 m-auto">
                                    <h2 className="fz-1a text-center">Thông tin user</h2>
                                    <div className="form">
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <label className="mb-3" htmlFor>
                                                        Tên<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="user_name"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='user_name'
                                                        disabled
                                                        value={user.user_name}
                                                    />
                                                    <label className="mb-3" htmlFor>
                                                        Email<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="email"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='email'
                                                        disabled
                                                        value={user.email}
                                                    />
                                                    <label className="mb-3" htmlFor>
                                                        Điện thoại<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="phone"
                                                        type="text"
                                                        className="form-control mb-4"
                                                        name='phone'
                                                        disabled
                                                        value={infor.phone}
                                                    />
                                                </div>
                                                <div className="col-lg-6">
                                                    <label className="mb-3" htmlFor>
                                                        Giới tính<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="gender"
                                                        type="text"
                                                        disabled
                                                        className="form-control mb-4"
                                                        name='gender'
                                                        value={infor.gender === 1 ? 'Nam' : 'Nữ'}
                                                    />
                                                    <label className="mb-3" htmlFor>
                                                        Địa chỉ<span className="text-danger">*</span> :
                                                    </label>
                                                    <InputField
                                                        id="address"
                                                        type="text"
                                                        disabled
                                                        className="form-control mb-4"
                                                        name='address'
                                                        value={infor.address}
                                                    />
                                                    <label className="mb-3" htmlFor>Ngày sinh<span className="text-danger">*</span> :</label>
                                                    <InputField
                                                        id="birthday"
                                                        type="text"
                                                        disabled
                                                        className="form-control mb-4"
                                                        name='birthday'
                                                        value={infor.birthday}
                                                    />
                                                </div>
                                            </div>
                                            <div className="btn_ text-center">
                                                {btn}
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )

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
                loading={loading}
            </section>
        </div >
    )
}
export default UserListPage