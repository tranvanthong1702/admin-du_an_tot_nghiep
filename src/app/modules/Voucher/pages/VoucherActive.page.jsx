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


function VoucherListPage() {
    const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
    const [voucher, setVoucher] = useState([])
    const [getvoucher, setGet] = useState([])
    const loadVoucher = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            VoucherService.listAt().then((res) => {
                setVoucher(res.data)
                console.log(res.data)
                setLoading(false)
            })
        }, DATA_LOAD_TIME)
    }, [options])
    useEffect(() => {
        AppHelper.setTitle('Voucher')
        loadVoucher()
    }, [])
    useEffect(() => {
        const listVoucher = async () => {
            try {
                const { data } = await VoucherService.get_voucher();
                setGet(data)
                console.log('voucher', data)
            } catch (error) {
                console.log(error)
            }
        }
        listVoucher()
    }, [])
    // let status = data.active;
    // console.log('status',data.active)
    // if (voucher.active === 0) {
    //     status = <div className="no_active">Chưa kích hoạt</div>
    // } else {
    //     status = <div className="active">Đã kích hoạt</div>
    // }
    const handlerDelete = async (id, title) => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Do you want delete ${title}`)
        if (result) {
            await VoucherService.delete(id);
            const newUser = voucher.filter((voucher) => voucher.id !== id);
            setVoucher(newUser);
        }
    }
    const [search, setSearch] = useState('');
    return (

        <DataTable
            title="Voucher đã kích hoạt"
            // subTitle="Danh sách voucher"
            metadata={metadata}
            searchform={
                <form className="mb-7">
                    <div className="row align-items-center">
                        <div className="col-lg-5 ">
                            <div className="input-icon">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                />
                                <span>
                                    <i className="flaticon2-search-1 text-muted" />
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            }
            thead={
                <div>
                    <div className="btn btn-sm btn-default btn-text-primary mt-5">
                        Tổng số voucher : {voucher == null ? '0' : `${voucher.length}`} voucher
                    </div>
                    <div className="row mb-4">
                        <div className="col-lg-1 col-md-1 col-1 text-center fw-bolder fz-16px" >#</div>
                        <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px" >Tiêu đề</div>
                        <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px" >Ngày bắt đầu</div>
                        <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px" >Kế hoạch</div>
                        <div className="col-lg-2 col-md-2 col-2 text-center fw-bolder fz-16px" >Trạng thái</div>
                        <div className="col-lg-3 col-md-3 col-3 text-center fw-bolder fz-16px" >Action</div>
                    </div>
                </div>
            }
            tbody={
                voucher == null ? (
                    <div className="text-center b-block">Xin lỗi chưa có voucher nào được kích hoạt !</div>
                ) : (
                    <div className="">
                        {voucher.filter((data) => {
                            if (search == '') {
                                return data
                            } else if (data.title.toLowerCase().includes(search.toLowerCase())) {
                                return data
                            }
                        }).map((data, index) => (
                            console.log(data, 'data'),
                            <div key={index} data-row={1} className="row mb-3 list-voucher">
                                <div className="col-lg-1 col-md-1 d-flex align-items-center justify-content-center text-center">

                                    <p className="text-dark-50 font-weight-bold">{(index += 1)}</p>
                                </div>

                                <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center">

                                    <p className="text-hover-primary font-weight-bold text-dark-50">{data.title}</p>
                                </div>

                                <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center">

                                    <p className="text-dark-50  font-weight-bold">{data.start_day}</p>
                                </div>
                                <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center">

                                    {data.planning == 0 ? (
                                        <p className="no_active">Chưa lên kế hoạch</p>
                                    ) : (
                                        <p className="active">Đã lên kế hoạch</p>
                                    )}
                                </div>
                                <div className="col-lg-2 col-md-2 d-flex align-items-center justify-content-center text-center">

                                    {data.active == 0 ? (
                                        <p className="no_active">Chưa kích hoạt</p>
                                    ) : (
                                        <p className="active_voucher">Đã kích hoạt</p>
                                    )}
                                </div>
                                {data.active == 0 ? (
                                    <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center">
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
                                                title="Xóa voucher"
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
                                ) : (
                                    <div data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
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
                                                title="Dừng kích hoạt"
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-danger">
                                                    <i class="fa fa-stop-circle cl-red" style={{ color: 'red' }}></i>
                                                </span>
                                            </button>
                                        </span>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                )

            }
            options={options}
            setOptions={setOptions}
            loading={loading}
        />
    )
}
export default VoucherListPage