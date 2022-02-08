import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import CharService from '../service/Char.service'
import { useForm } from 'react-hook-form'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function AnalyticsPage() {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm()
  // const start = Date.now()
  // const convertDate = (data) => {
  //   const date = new Date(data)
  //   const newData = {
  //     monthNow: date.getMonth() + 1,
  //     yearNow: date.getFullYear()
  //   }
  //   return newData
  // }
  const [chars, setChars] = useState([])
  const [date, setDates] = useState([])
  const onHandSubmit = async (data) => {
    const convertDate = data.monthNow
    const arrayConvertDate = convertDate.split('-')
    setDates({ monthNow: parseInt(arrayConvertDate[1]), yearNow: parseInt(arrayConvertDate[0]) })
    const { data: chars } = await CharService.revenue(parseInt(arrayConvertDate[1]), parseInt(arrayConvertDate[0]))
    const keys = Object.keys(chars.time)
    const array = keys.map((i, index) => ({
      time: i,
      value: chars.value[index]
    }))
    setChars(array)
  }
  const changeExport = async (event) => {
    const x = await CharService.ExportOrderRevenue(date.monthNow, date.yearNow, event.target.value)
  }
  return (
    <div className='section-all'>
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
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="doanh thu" fill="#8884d8" />
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
            <input type="month" id="start" className='form-control' name="monthNow" ref={register} placeholder="chọn tháng" />
            <button className="btn-success font-weight-bolder font-size-sm" type="submit">
              Xem biểu đồ
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
export default AnalyticsPage
