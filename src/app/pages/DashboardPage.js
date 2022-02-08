import ProductService from 'app/modules/Products/service/Product.service'
import React, { useCallback, useEffect, useState } from 'react'
import { DATA_LOAD_TIME } from '../../constants'
import AppHelper from '../../helpers/app.helper'
import DataTable from '../components/global/datatable/Datatable.component.tsx'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../components/global/datatable/datatable.constant'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import CharService from 'app/modules/Char/service/Char.service'


export function DashboardPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [dashboard, setDashboard] = useState([])
  console.log(dashboard)
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const { data } = await ProductService.dashboard()
        setDashboard(data)
      } catch (error) {
        console.log(error)
      }
    }
    getDashboard()
  }, [])
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
    <section className='section-all'>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col-lg-3 col-md-3 mb-4'>
            <div className='box_dashboard align-items-center d-flex'>
              <div className='image'>
                <img src="https://i.pinimg.com/564x/f5/fd/f2/f5fdf2316106a7c74743c439cabf2235.jpg" />
              </div>
              <div className='box_text'>
                <p className='title_dashbord'>
                  Tổng khách hàng
                </p>
                <p className='ct_text'>
                  {dashboard?.user}
                </p>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-3 mb-4'>
            <div className='box_dashboard align-items-center d-flex'>
              <div className='image'>
                <img src="https://i.pinimg.com/236x/64/44/ee/6444ee468948a6d86e366fde4c41448b.jpg" />
              </div>
              <div className='box_text'>
                <p className='title_dashbord'>
                  Tổng sản phẩm
                </p>
                <p className='ct_text'>
                  {dashboard?.pro}
                </p>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-3 mb-4'>
            <div className='box_dashboard align-items-center d-flex'>
              <div className='image'>
                <img src="https://i.pinimg.com/564x/12/b9/37/12b9379f71ac9b9620cfc046fa330b77.jpg" />
              </div>
              <div className='box_text'>
                <p className='title_dashbord'>
                  Đơn hàng mới
                </p>
                <p className='ct_text'>
                  {dashboard?.orderNew}
                </p>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-3 mb-4'>
            <div className='box_dashboard align-items-center d-flex'>
              <div className='image'>
                <img src="https://i.pinimg.com/564x/ea/c1/b2/eac1b27bf3e5675c3669577131ec71ad.jpg" />
              </div>
              <div className='box_text'>
                <p className='title_dashbord'>
                  Tổng danh mục
                </p>
                <p className='ct_text'>
                  {dashboard?.cate}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="fw-bolder fz-16px ms-4">
            Tháng : {defaultDate.monthNow}, Năm : {defaultDate.yearNow}
          </p>
          <section className="mt-2 d-flex justify-content-center">
            <BarChart
              width={1200}
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
      </div>
    </section>
  )
}
