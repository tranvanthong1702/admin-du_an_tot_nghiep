import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { DATA_LOAD_TIME } from '../../../../constants'
import InputField from '../../../components/global/fields/Input.field'
import SelectField from '../../../components/global/fields/Select.field'
import {
    DATATABLE_METADATA_DEFAULT,
    DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import firebase from 'firebase/app'
import CustomerService from '../service/Customer.service'
function DisablePage() {
    const history = useHistory()
    const [user, setUser] = useState([])
    const [roles, setRole] = useState([])
    const [rolesuser, setRoleUser] = useState([])
    const [success, setSuccess] = useState([])
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()
    const { id } = useParams()
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await CustomerService.find(id);
                setUser(data)
                setRoleUser(data.roles)
                const { success } = await CustomerService.find(id);
                setSuccess(success);
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await CustomerService.listRole();
                setRole(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    const onHandSubmit = async (data) => {
        const newData = {
            ...data
        }
        console.log('idddđ', id)
        await CustomerService.set_role(id, newData);
        history.push('/customers/list');
    }

    return (
        <div className="section-info">
            <div className="container ">
                <div className="col-lg-8 m-auto">
                    <h2 className="fz-1a text-center">Phân quyền user</h2>
                    <div className='mt-5'>
                        {success ? (
                            <form onSubmit={handleSubmit(onHandSubmit)} className='form form-label-right'>
                                <div className='form-group row'>
                                    <div className="col-lg-6">
                                        <div>
                                            <InputField
                                                id='name'
                                                type='text'
                                                className='form-control'
                                                name='name'
                                                placeholder='Tên'
                                                label='Tên user'
                                                readonly
                                                value={user.user_name}
                                            />
                                            <InputField
                                                id='email'
                                                type='text'
                                                className='form-control'
                                                name='email'
                                                placeholder='Email'
                                                label='Email'
                                                readonly
                                                value={user.email}
                                            />
                                            {/* <div className='col-lg-12'>
                                            <img src={user.avatar} alt="" />
                                        </div> */}
                                            {rolesuser ? (
                                                rolesuser.map((data, index) => (
                                                    <InputField
                                                        key={index}
                                                        id='roles'
                                                        type='text'
                                                        className='form-control'
                                                        name='Quyền'
                                                        placeholder='Quyền'
                                                        label='Quyền'
                                                        readonly
                                                        value={data.name}
                                                    />
                                                ))

                                            ) : (
                                                <></>
                                            )}

                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="" htmlFor="">Cấp quyền</label><br />
                                        <div className="set-role">
                                            {
                                                roles.map((item, index) => (
                                                    <div className="form-check mb-3" key={index}>
                                                        <input name='roles' className="form-check-input" type="checkbox" defaultValue={user.roles} value={item.name} id="flexCheckDefault" ref={register} />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            {item.name}
                                                        </label>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="btn__ text-center">
                                    <Link to="/customers" className="btn btn-success font-weight-bolder back_vc font-size-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 5L4 12L11 19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4 12H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        Quay lại
                                    </Link>
                                    <button type='submit' className='btn btn-primary'>
                                        Lưu thông tin
                                    </button>
                                </div>
                            </form>
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

    )
}

export default DisablePage
