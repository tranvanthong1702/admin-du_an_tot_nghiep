import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import CharService from '../service/Char.service'
import { useForm } from 'react-hook-form'

function FilterCharPro() {
    const history = useHistory()

    const start = Date.now()
    const convertDate = (data) => {
        const date = new Date(data)
        const newData = {
            dateNow: date.getDay(),
            monthNow: date.getMonth() + 1,
            yearNow: date.getFullYear()
        }
        return newData
    }
    const [chars, setChars] = useState([]) // 1
    const defaultDate = convertDate(start)
    const [date, setDates] = useState(defaultDate) // 1
    const onHandSubmit = async (data) => {
        const convertDate = data.monthNow
        const arrayConvertDate = convertDate.split('-')
        setDates({ dateNow: parseInt(arrayConvertDate[2]), monthNow: parseInt(arrayConvertDate[1]), yearNow: parseInt(arrayConvertDate[0]) })
        // const { data: chars } = await CharService.revenue(parseInt(arrayConvertDate[1]), parseInt(arrayConvertDate[0]))
        console.log(chars)
        const keys = Object.keys(chars.time)
        const array = keys.map((i, index) => ({
            time: i,
            value: chars.value[index]
        }))
        setChars(array)
    }
    return (
        <section className="section-link">
            <NavLink
                to={`/char/pro/day`}
                activeClassName="active_link"
                className="btn btn-success font-weight-bolder font-size-sm"
            >
                Biểu đồ theo ngày
            </NavLink>
            <NavLink
                to={`/char/pro/month`}
                activeClassName="active_link"
                className="btn btn-success font-weight-bolder font-size-sm"
            >
                Biểu đồ theo tháng
            </NavLink>
            <NavLink
                to={`/char/pro/year`}
                activeClassName="active_link"
                className="btn btn-success font-weight-bolder font-size-sm"
            >
                Biểu đồ theo năm
            </NavLink>
        </section>
    )
}

export default FilterCharPro
