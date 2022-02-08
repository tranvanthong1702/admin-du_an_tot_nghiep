import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
    DATATABLE_METADATA_DEFAULT,
    DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import CustomerService from '../service/Customer.service'
import { Link, useHistory } from 'react-router-dom'

function CustomerTrashedPage() {
    const history = useHistory()
    const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
    const [user, setUser] = useState([])
    const [success, setSuccess] = useState([])

    const loadCustomer = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            CustomerService.trashed().then((res) => {
                setSuccess(res.success)
                setUser(res.data)
                setLoading(false)
            })
        }, DATA_LOAD_TIME)
    }, [options])
    useEffect(() => {
        AppHelper.setTitle('Customer')
        loadCustomer()
    }, [])
    const handlerDelete = async (id, user_name) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Bạn có muốn xóa khách hàng ${user_name} ?`)
        if (result) {
            setLoading(true)
            setTimeout(() => {
                CustomerService.delete_force(id)
                setLoading(false)
            }, DATA_LOAD_TIME)
            setUser(user.filter((item) => item.id !== id))
        }
    }
    const handlerBackup = async (id, user_name) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Bạn có muốn khôi phục khách hàng ?`)
        if (result) {
            // const { data } = user
            setLoading(true)
            setTimeout(() => {
                CustomerService.backup_one(id)
                setLoading(false)
            }, DATA_LOAD_TIME)
            setUser(user.filter((item) => item.id !== id));
        }
    }
    const handlerBackupAll = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Bạn có muốn xóa tất cả khách hàng ?`)
        if (result) {
            // const { data } = user
            setLoading(true)
            setTimeout(() => {
                CustomerService.backup_all()
                setLoading(false)
            }, DATA_LOAD_TIME)
            setUser(user)

        }
        history.push('/Customers/list');
    }

    const handlerDeleteAll = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Bạn có muốn xóa tất cả ?`)
        if (result) {
            setLoading(true)
            setTimeout(() => {
                CustomerService.force_delete_all()
                setLoading(false)
            }, DATA_LOAD_TIME)
            setUser(user.map((item) => item.id !== id))
        }
    }

    return (
        <DataTable
            title="Lưu trữ"
            // subTitle="Danh sách user"
            metadata={metadata}
            toolbar={
                <></>
            }

            thead={
                <div className='row mb-3'>
                    <div className='col-lg-1 col-md-1 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                        <span>#</span>
                    </div>
                    <div className='col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                        <span>Tên</span>
                    </div>
                    <div className='col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                        <span>Email</span>
                    </div>

                    <div className='col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
                        <span>Hành động</span>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="btn_ text-center">
                            <Link to="/customers" className="btn btn-success font-weight-bolder back_vc font-size-sm">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 5L4 12L11 19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 12H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Quay lại
                            </Link>
                            {user ? (
                                <button
                                    onClick={() => handlerBackupAll()}
                                    type="button"
                                    className="btn btn-sm btn-default btn-text-primary btn-hover-primary  mr-2"
                                    title="Backup"
                                >
                                    Backup All
                                </button>
                            ) : (
                                <></>
                            )}

                        </div>
                    </div>
                </div>
            }
            tbody={
                success ? (
                    user.map((data, index) => (
                        <div className="row">
                            <div className='col-lg-1 col-md-1 d-flex align-items-center justify-content-center text-center' >
                                <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                            </div>
                            <div className='col-lg-2 col-md-3 d-flex align-items-center justify-content-center text-center' >
                                <p className="text-dark-50 text-hover-primary font-weight-bold">{data.user_name}</p>
                            </div>
                            <div className='col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center' >
                                <p className="text-dark-50 text-hover-primary font-weight-bold">{data.email}</p>
                            </div>
                            <div className='col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center' >
                                <span
                                    style={{
                                        overflow: 'visible',
                                        position: 'relative',
                                        width: '130px'
                                    }}
                                >
                                    <button
                                        onClick={() => handlerBackup(data.id)}
                                        type="button"
                                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                                        title="Khôi phục user"
                                    >
                                        <span className="svg-icon svg-icon-md svg-icon-primary">
                                            <i class="fa fa-undo"></i>
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handlerDelete(data.id, data.user_name)}
                                        type="button"
                                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"
                                        title="Xóa user"
                                    >
                                        <span className="svg-icon svg-icon-md svg-icon-danger">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="24px"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                            >
                                                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                    <rect x={0} y={0} width={24} height={24} />
                                                    <path
                                                        d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                                                        fill="#000000"
                                                        fillRule="nonzero"
                                                    />
                                                    <path
                                                        d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                                                        fill="#000000"
                                                        opacity="0.3"
                                                    />
                                                </g>
                                            </svg>
                                        </span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))

                )
                    :
                    (
                        <div className="d-flex justify-content-center mt-5">
                            <div>
                                <div className="text-center">
                                    <i className="fas fa-database" />
                                </div>
                                <div>Không có dữ liệu</div>
                            </div>
                        </div>
                    )
            }
            options={options}
            setOptions={setOptions}
            loading={loading}
            searchForm={{
                search: true,
                queries: [
                    {
                        field: 'status',
                        options: [
                            { name: 'New', value: 1 },
                            { name: 'Old', value: 0 }
                        ]
                    },
                    {
                        field: 'publish',
                        options: [
                            { name: 'Publish', value: 1 },
                            { name: 'Un publish', value: 0 }
                        ]
                    }
                ]
            }}
        />
    )
}

export default CustomerTrashedPage
