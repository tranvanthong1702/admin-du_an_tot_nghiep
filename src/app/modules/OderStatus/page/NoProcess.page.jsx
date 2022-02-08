import React, { useCallback, useEffect, useState } from 'react'
import FilterBar from '../components/filterBar'
import TableData from '../components/tableData'
import { useParams } from 'react-router'
import OrderService from '../service/Order.service'
import { DATA_LOAD_TIME } from '../../../../constants'
import SpinningSingle from '../../../components/extra/SpinningSingle.component'
import Notify from '../../../components/global/notify/notify'

function NoProcess() {
  const [loading, setLoading] = useState(false)
  const [orders, setOrder] = useState([])
  const [count, setCount] = useState([])

  const { id } = useParams()
  const convertID = parseInt(id)

  const loadOrder = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      OrderService.list(convertID).then((res) => {
        if (res.success === true) {
          if (res.data && res.data.length > 0) {
            setOrder(res.data)
            setLoading(false)
          } else {
            setOrder([])
            setLoading(false)
          }
        } else {
          setOrder([])
          setLoading(false)
        }
      })
      OrderService.countProcess().then((res) => {
        if (res.success === true) {
          if (res.data && res.data.length > 0) {
            setCount(res.data)
            setLoading(false)
          } else {
            setCount([])
            setLoading(false)
          }
        } else {
          setCount([])
          setLoading(false)
        }
      })
    }, DATA_LOAD_TIME)
  }, [convertID])

  useEffect(() => {
    loadOrder()
  }, [id])
  return (
    <div>
      <FilterBar count={count} loading={loading} orders={orders} />
      {loading ? (
        <tr className='d-flex justify-content-center'>
          <td colSpan={8}>
            <SpinningSingle background />
          </td>
        </tr>
      ) : (
        <div>
          {orders.length === 0 ? (
            <div className='d-flex justify-content-center'>
              <div>
                <div className='text-center'>
                  <i className='fas fa-database' />
                </div>
                <div>Không có dữ liệu</div>
              </div>
            </div>
          ) : (
            <TableData orders={orders} callBack={loadOrder} />
          )}
        </div>
      )}
    </div>
  )
}

export default NoProcess
