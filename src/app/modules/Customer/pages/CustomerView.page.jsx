import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import CustomerService from '../service/Customer.service'


function CustomerViewPage() {
    const [user, setUser] = useState([])
    const [infor, setInfor] = useState([])
    const [roles, setRoles] = useState([])
    const { id } = useParams()
    const [success, setSuccess] = useState([])
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await CustomerService.find(id);
                setUser(data);
                const { success } = await CustomerService.find(id);
                setSuccess(success);
                const roles = data.roles;
                setRoles(roles);
                const infor = data.info_user[0];
                setInfor(infor);
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    const history = useHistory()


    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()

    const handlerDelete = async (id, user_name) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Bạn có muốn xóa khách hàng ?`)
        if (result) {
            await CustomerService.delete(id);
            history.push('/');
        }
    }
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    return (
        <div>
            <section className="section-info">
                <div className="container">
                    {success ? (
                        <div className="row">
                            <div className="col-lg-3 d-flex justify-content-center align-items-center">
                                {user.avatar ? (
                                    <div className="box-avatar">
                                        <img src={user.avatar} alt="" className="mb-3" />
                                    </div>
                                ) : (
                                    <div className="box-avatar">
                                        <img src="https://picsum.photos/200" alt="" className="mb-3" />
                                    </div>
                                )}


                            </div>
                            <div className="col-lg-9 m-auto">
                                <h2 className="fz-1a text-center">Thông tin user</h2>
                                <div className="form">

                                    <form>
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
                                        <div className="btn_ text-center">
                                            <Link to="/customers" className="btn btn-success font-weight-bolder back_vc font-size-sm">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 5L4 12L11 19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M4 12H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                Quay lại
                                            </Link>
                                            <button
                                                onClick={() => handlerDelete(user.id, user.user_name)}
                                                type="button"
                                                className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon btn_delete_"
                                                title="Delete"
                                            >Xóa

                                            </button>
                                        </div>
                                    </form>
                                </div>
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
            </section >
        </div >
    )
}
export default CustomerViewPage