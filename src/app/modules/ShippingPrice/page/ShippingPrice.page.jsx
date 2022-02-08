import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { DATATABLE_METADATA_DEFAULT } from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import ShippingPriceService from '../service/ShippingPrice.service'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

function ShippingPrice() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
    const [provinces, setProvinces] = useState([])
    const [ghtk, setGttk] = useState([])
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()
    useEffect(() => {
        const getProvinces = async () => {
            try {
                const { data } = await ShippingPriceService.list();
                setProvinces(data)
            } catch (error) {
                console.log(error)
            }
        }
        getProvinces()
    }, [])
   
    const history = useHistory()
    useEffect(() => {
        const getGHTK = async () => {
            try {
                const { data } = await ShippingPriceService.edit();
                setGttk(data)
            } catch (error) {
                console.log(error)
            }
        }
        getGHTK()
    }, [])
    const onHandSubmit = async (data) => {
        const newData = {
            ...data,
            height: parseInt(data.height),
            width: parseInt(data.width),
            length: parseInt(data.length),
            provinceID: parseInt(data.provinceID)
        }
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Bạn muốn cập nhật giá ship ?`)
        if (result) {
            await ShippingPriceService.update(newData).then((res) => {
                Swal.fire(`Cập nhật giá ship thành công`, '', 'success');
            });
        }
        window.location.href='/shipping/default'
    }
    const reSet = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Bạn muốn reset giá ship ?`)
        if (result) {
            await ShippingPriceService.reset().then((res) => {
                Swal.fire(`Reset giá ship thành công`, '', 'success');
            });
        }
        window.location.href='/shipping/default'
    }
    console.log(ghtk)
    return (
        <section className="section-all section-pay">
            <div className="container">
                <div className="col-lg-6 m-auto">
                    <div className="header-top">
                        Bảng tính giá vận chuyển
                    </div>
                    <form onSubmit={handleSubmit(onHandSubmit)} className="pay" encType="multipart/form-data">
                        <label className="mb-2" htmlFor>Khu vực bán hàng:</label>
                        <select name="provinceID" className="form-control mb-3" ref={register}>
                            {provinces.map((data, index) => (
                                <option  key={index} value={`${data.provinceID}`}>
                                    {data.provinceName}
                                </option>
                            ))}
                        </select>
                        <label className="mb-2" htmlFor>Chiều rộng hàng hóa :</label>
                        <input type="number" className="form-control mb-3" defaultValue={ghtk.width} placeholder="cm" name="width" ref={register({
                            required: 'Nhập đầy đủ thông tin'
                        })}
                            error={errors.width} />
                        <label className="mb-2" htmlFor>Chiều dài hàng hóa :</label>
                        <input type="number" className="form-control mb-3" defaultValue={ghtk.length} placeholder="cm" name="length" ref={register({
                            required: 'Nhập đầy đủ thông tin'
                        })}
                            error={errors.length} />
                        <label className="mb-2" htmlFor>Chiều cao hàng hóa :</label>
                        <input type="number" className="form-control mb-3" defaultValue={ghtk.height} placeholder="cm" name="height" ref={register({
                            required: 'Nhập đầy đủ thông tin'
                        })} error={errors.height} />
                        <label className="mb-2" htmlFor>Giá cước ước tính :</label>
                        <input type="number" className="form-control mb-3" placeholder="đ" value={ghtk.expected_price} />
                        <div className="btn_ d-flex">
                            <div className="btn_update">
                                <button >Cập nhật</button>
                            </div>

                        </div>
                    </form>
                    <div className="btn_ d-flex text-center">
                        <div className="btn_reset">
                            <button onClick={() => reSet()}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ShippingPrice