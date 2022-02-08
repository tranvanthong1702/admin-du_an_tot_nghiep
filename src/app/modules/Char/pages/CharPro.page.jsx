import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import CharService from '../service/Char.service'
import FilterCharPro from '../components/filterCharPro'

function CharPro() {
  const { status } = useParams()
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
      const date = new Date()
      const newData = {
        year: date.getFullYear()
      }
      try {
        const { data: chars } = await CharService.quantityProduct(newData)
        const keys = Object.values(chars.name)
        const array = keys?.map((i, index) => ({
          name: i,
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
      <FilterCharPro />
      <div>
        <h1>
          Năm: {defaultDate.yearNow}
        </h1>
        <section className="sectio-all mt-20 d-flex justify-content-center">
          <div>
            <ComposedChart
              width={1000}
              height={500}
              data={chars}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Số lượng" barSize={20} fill="#413ea0" />
            </ComposedChart>
          </div>

        </section>
      </div>
    </section>
  )
}

export default CharPro
