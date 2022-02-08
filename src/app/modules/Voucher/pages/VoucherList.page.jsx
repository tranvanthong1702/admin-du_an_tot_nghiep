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
    // useEffect(() => {
    //     const getVoucher = async () => {
    //         try {
    //             const { data } = await VoucherService.list();
    //             setVoucher(data)
    //             console.log(data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getVoucher()
    // }, [])
    const loadVoucher = useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            VoucherService.list().then((res) => {
                setVoucher(res.data)
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
            title="Danh sách voucher"
            // subTitle="Danh sách voucher"
            metadata={metadata}
            button={
                <>
                    <Link to="/voucher/active" className="btn btn-success font-weight-bolder font-size-sm">
                        Đã kích hoạt
                    </Link>
                    <Link to="/voucher/no-active" className="btn btn-success font-weight-bolder font-size-sm">
                        Chưa kích hoạt
                    </Link>
                    <Link to="/voucher/trashed"
                        type="button"
                        className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"
                        title="Lưu trữ"
                    >
                        <i class="fas fa-box-open"></i>
                    </Link>
                </>
            }
            options={options}
            setOptions={setOptions}
            loading={loading}
        />
    )
}
export default VoucherListPage