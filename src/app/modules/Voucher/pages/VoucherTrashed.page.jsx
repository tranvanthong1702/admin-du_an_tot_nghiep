import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import VoucherService from '../service/Voucher.service'
import InputField from '../../../components/global/fields/Input.field'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import DataTable from 'app/components/global/datatable/Datatable.component'
import {
    DATATABLE_METADATA_DEFAULT,
    DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { data } from 'jquery'
import { DATA_LOAD_TIME } from '../../../../constants'



function VoucherTrashedPage() {
    const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
    const [voucher, setVoucher] = useState([])
    const [success, setSuccess] = useState([])
    const history = useHistory()
    useEffect(() => {
        const getTrashed = async () => {
            try {
                const { success } = await VoucherService.trashed();
                setSuccess(success)
                const { data } = await VoucherService.trashed();
                setVoucher(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        getTrashed()
    }, [])
    const handlerDelete = async (id, title) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Do you want delete ${title}`)
        if (result) {
            await VoucherService.delete_force(id);
            const newVoucher = voucher.filter((voucher) => voucher.id !== id);
            setVoucher(newVoucher);
        }
    }
    const handlerBackup = async (id, name) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Do you want Backup ${name}`)
        if (result) {
            // const { data } = slide
            setLoading(true)
            setTimeout(() => {
                VoucherService.backup_one(id)
                setLoading(false)
            }, DATA_LOAD_TIME)
            setVoucher(voucher.filter((item) => item.id !== id));

        }
    }
    const handlerDeleteAll = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Do you want delete`)
        if (result) {
            setLoading(true)
            setTimeout(() => {
                VoucherService.force_delete_all()
                setLoading(false)
            }, DATA_LOAD_TIME)
            setVoucher(voucher.filter((voucher) => voucher.id !== id))
        }
        history.push('/voucher/trashed')
    }

    return (
        <DataTable
            title="Lưu trữ"
            // subTitle="Danh sách user"
            metadata={metadata}
            toolbar={
                <div className="btn__ d-flex ">
                    <Link to="/voucher" className="btn btn-success font-weight-bolder font-size-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5L4 12L11 19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 12H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Quay lại
                    </Link>
                    <button
                        onClick={() => handlerDeleteAll()}
                        type="button"
                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"
                        title="Xóa tất cả"
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
                </div>
            }

            thead={
                <div className="row mb-4">
                    <div className="col-lg-1 col-md-1 col-1 text-center fw-bolder fz-16px" >#</div>
                    <div className="col-lg-3 col-md-3 col-3 text-center fw-bolder fz-16px" >Tiêu đề</div>
                    <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px" >Ngày bắt đầu</div>
                    <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px" >Kế hoạch</div>
                    <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px" >Trạng thái</div>
                    <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px" >Hành động</div>
                </div>
            }
            tbody={
                success ? (
                    voucher.map((data, index) => (
                        <div className="row mb-3">
                            <div className="col-lg-1 text-center">
                                <span>
                                    <p className="text-dark-50 font-weight-bold">{(index += 1)}</p>
                                </span>
                            </div>

                            <div className="col-lg-3 text-center">
                                <span>
                                    <p className="text-hover-primary font-weight-bold text-dark-50">{data.title}</p>
                                </span>
                            </div>

                            <div className="col-lg-2 text-center">
                                <span>
                                    <p className="text-dark-50  font-weight-bold">{data.start_day}</p>
                                </span>
                            </div>
                            <div className="col-lg-2 text-center">
                                <span>
                                    {data.planning == 0 ? (
                                        <p className="no_active">Chưa lên kế hoạch</p>
                                    ) : (
                                        <p className="active">Đã lên kế hoạch</p>
                                    )}
                                </span>
                            </div>
                            <div className="col-lg-2 text-center">
                                <span>
                                    {data.active == 0 ? (
                                        <p className="no_active">Chưa kích hoạt</p>
                                    ) : (
                                        <p className="active_voucher">Đã kích hoạt</p>
                                    )}
                                </span>
                            </div>
                            <div className="col-lg-2 text-center">
                                <span
                                    style={{
                                        overflow: 'visible',
                                        position: 'relative',
                                        width: '130px'
                                    }}
                                >
                                    <Link
                                        to={`/voucher/view/${data.id}`}
                                        type="button"
                                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                                        title="Xem voucher"
                                    >
                                        <i class="far fa-eye"></i>
                                    </Link>
                                    <button
                                        onClick={() => handlerDelete(data.id, data.name)}
                                        type="button"
                                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"
                                        title="Delete"
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
                ) : (
                    <div className="text-center b-block">Xin lỗi không có voucher nào trong thùng rác !</div>
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
export default VoucherTrashedPage