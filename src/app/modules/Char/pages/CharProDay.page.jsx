import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import CharService from '../service/Char.service'
import { useForm } from 'react-hook-form'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import FilterCharPro from '../components/filterCharPro'
import Swal from 'sweetalert2'

function CharProDay() {
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm()
    const [chars, setChars] = useState([])
    const [date, setDates] = useState([])
    const onHandSubmit = async (data) => {
        // const convertDate = data.dateNow
        // const arrayConvertDate = convertDate.parseString()
        const newData = {
            ...data
        }
        console.log(newData)
        const { data: chars } = await CharService.quantityProduct(newData)
        try {
            const keys = Object.values(chars.name)
            const array = keys?.map((i, index) => ({
                name: i,
                value: chars.value[index]
            }))
            setChars(array)
        } catch (error) {
            console.log(error)
            Swal.fire(`Không có dữ liệu`)
        }


    }
    const changeExport = async (event) => {
        const x = await CharService.ExportQuantityProduct(event.target.value)
    }
    return (
        <div className='section-all'>
            <FilterCharPro />
            <section className="section-link">
                <BarChart
                    width={1000}
                    height={300}
                    data={chars}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="số lượng" fill="#8884d8" />
                </BarChart>
            </section>
            <section className='d-flex align-items-center row'>
                <div className="col-lg-3">
                    <button className="btn btn-success font-weight-bolder font-size-sm" onClick={changeExport} value="xlsx">
                        Export
                    </button>
                </div>
                <div className="col-lg-4">
                    <form onSubmit={handleSubmit(onHandSubmit)} className='d-flex align-items-center'>
                        <input type="date" id="start" className='form-control' name="day" ref={register} placeholder="chọn tháng" />
                        <button className="btn-success font-weight-bolder font-size-sm" type="submit">
                            Xem biểu đồ
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}
export default CharProDay
