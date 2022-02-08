import React, { useState, useEffect, PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router'

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CharService from '../service/Char.service'

function CharOrder() {
  const start = Date.now()
  const convertDate = (data) => {
    const date = new Date(data)
    const newData = {
      dateNow: date.getDate(),
      monthNow: date.getMonth() + 1,
      yearNow: date.getFullYear()
    }
    return newData
  }
  const defaultDate = convertDate(start)

  const [chars, setChars] = useState([]) // 1
  useEffect(() => {
    const getChars = async () => {
      try {
        const { data: chars } = await CharService.compareCreateSuccess(defaultDate.monthNow, defaultDate.yearNow)
        setChars(chars)
        console.log(chars)
      } catch (error) {
        console.log(error)
      }
    }
    getChars()
  }, [])

  const changeExport = async (event) => {
    const x = await CharService.ExportCompareCreateSuccess(
      defaultDate.monthNow,
      defaultDate.yearNow)
  }
  return (
    <div>
      <section className="section-all mt-20 d-flex justify-content-center">
        <div>
          <BarChart
            width={1000}
            height={500}
            data={chars}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="create" name="hoàn thành" stackId="a" fill="#8884d8" />
            <Bar dataKey="success" name="hủy" stackId="a" fill="#82ca9d" />
          </BarChart>
        </div>
        <div className=''>
          <button className="btn btn-success font-weight-bolder font-size-sm" onClick={changeExport} value="xlsx">
            Export
          </button>
        </div>
      </section>

    </div>
  )
}

export default CharOrder
