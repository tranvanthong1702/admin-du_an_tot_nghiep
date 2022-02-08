import React, { useCallback, useEffect, useState } from 'react'
import FilterBarShipper from '../../OderStatus/components/filterBarShipper'
import { useParams } from 'react-router'
import { DATATABLE_METADATA_DEFAULT } from '../../../components/global/datatable/datatable.constant'
import OrderService from '../../OderStatus/service/Order.service'
import { DATA_LOAD_TIME } from '../../../../constants'
import TableDataShipper from '../../OderStatus/components/tableDataShipper'
import SpinningSingle from '../../../components/extra/SpinningSingle.component'


function ShipperOder() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [orders, setOrder] = useState([])
  const [orders1, setOrder1] = useState([])
  const [orders2, setOrder2] = useState([])
  const [count, setCount] = useState([])
  const profile1 = () => {
    const auth = localStorage.getItem('User') || null
    return auth ? JSON.parse(auth) : null
  }
  const user = profile1()
  const roles = user.id

  const loadOrder = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      OrderService.listShipperProcess1(roles).then((res) => {
        if (res.success === true) {
          if (res.data && res.data.length > 0) {
            if (typeof res.data === 'string') {
              setOrder([])
              setLoading(false)
            } else {
              setOrder(res.data)
              setLoading(false)
            }
          } else {
            setOrder([])
            setLoading(false)
          }
        } else {
          setOrder([])
          setLoading(false)
        }
      })
      OrderService.listShipperProcess2(roles).then((res) => {
        if (res.success === true) {
          if (res.data && res.data.length > 0) {
            if (typeof res.data === 'string') {
              setOrder1([])
              setLoading(false)
            } else {
              setOrder1(res.data)
              setLoading(false)
            }
          } else {
            setOrder1([])
            setLoading(false)
          }
        } else {
          setOrder1([])
          setLoading(false)
        }
      })
      OrderService.listShipperProcess3(roles).then((res) => {
        if (res.success === true) {
          if (res.data && res.data.length > 0) {
            if (typeof res.data === 'string') {
              setOrder2([])
              setLoading(false)
            } else {
              setOrder2(res.data)
              setLoading(false)
            }
          } else {
            setOrder2([])
            setLoading(false)
          }
        } else {
          setOrder2([])
          setLoading(false)
        }
      })
      OrderService.countShip(roles).then((res) => {
        if (res.success === true) {
          if (res.data) {
            setCount(res.data)
          } else {
            setOrder2([])
            setLoading(false)
          }
        } else {
          setOrder2([])
          setLoading(false)
        }
      })
    }, DATA_LOAD_TIME)
  }, [])

  useEffect(() => {
    loadOrder()
  }, [id])
  return (
    <div className='section_oder-all'>
      <FilterBarShipper count={count} />
      {loading ? (
        <tr className='d-flex justify-content-center'>
          <td colSpan={8}>
            <SpinningSingle background />
          </td>
        </tr>
      ) : (
        <TableDataShipper orders={orders} orders1={orders1} orders2={orders2} callback={loadOrder} />
      )}
    </div>
  )
}

export default ShipperOder