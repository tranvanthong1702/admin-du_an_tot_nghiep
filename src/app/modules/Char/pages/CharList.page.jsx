import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router'

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import FilterChar from '../components/filterChar'
import CharService from '../service/Char.service'
import Chart from './CharPro.page'
import AnalyticsPage from './Analytics.page'
import AnalyticYearPage from './Analyticyear.page'

function CharPage() {
  const { status, month, year } = useParams()
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
        const { data: chars } = await CharService.revenue(defaultDate.monthNow, defaultDate.yearNow)
        const keys = Object.keys(chars.time)
        const array = keys.map((i, index) => ({
          time: i,
          value: chars.value[index]
        }))
        setChars(array)
      } catch (error) {
        console.log(error)
      }
    }
    getChars()
  }, [])
  return (
    <section className="section-all">
      <FilterChar />
      {status == 'list' && (
        <div>
          <h1>
            Tháng : {defaultDate.monthNow}, Năm : {defaultDate.yearNow}
          </h1>
          <section className="mt-20 d-flex justify-content-center">
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
              <Bar dataKey="value" name="Doanh thu" fill="#8884d8" />
            </BarChart>
          </section>
        </div>
      )}
      {status == 'analytics' && (
        <div>
          <AnalyticsPage />
        </div>
      )}
      {status == 'analytic-year' && (
        <div>
          <AnalyticYearPage />
        </div>
      )}
    </section>
  )
}

export default CharPage
