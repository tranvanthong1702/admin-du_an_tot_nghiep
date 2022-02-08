import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import CharService from '../service/Char.service'
import { useForm } from 'react-hook-form'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function AnalyticYearPage() {
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
  const [chars, setChars] = useState([]) // 1
  const [date, setDates] = useState([]) // 1
  const onHandSubmit = async (data) => {
    // const convertDate = data.monthNow
    // const arrayConvertDate = convertDate.split('-')
    setDates({ monthNow: 0, yearNow: data.yearNow })
    const { data: chars } = await CharService.revenue(0, data.yearNow)
    console.log(chars)
    const keys = Object.keys(chars.time)
    const array = keys.map((i, index) => ({
      time: i,
      value: chars.value[index]
    }))
    setChars(array)
  }
  const changeExport = async (event) => {
    const x = await CharService.ExportOrderRevenue(0, date.yearNow, event.target.value)
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
      <section className='row'>
        <div className="col-lg-2 d-flex align-items-center">
          <button className="btn btn-success font-weight-bolder font-size-sm" onClick={changeExport} value="xlsx">
            Export
          </button>
        </div>
        <div className="col-lg-3 d-flex align-items-center">
          <form onSubmit={handleSubmit(onHandSubmit)} className='d-flex align-items-center'>
            <select id="cars" name="yearNow" form="carform" ref={register}>
              <option value="">Chọn năm</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
            </select>
            <button className="btn-success font-weight-bolder font-size-sm" type="submit">
              Xem biểu đồ
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
export default AnalyticYearPage
