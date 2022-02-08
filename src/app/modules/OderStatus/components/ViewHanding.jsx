import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FilterBar from './filterBar'
import OrderService from '../service/Order.service'
import { DATA_LOAD_TIME } from '../../../../constants'
import SpinningSingle from '../../../components/extra/SpinningSingle.component'
import TableData from './tableData'
import FilterBarConfirm from './filterBarConfirm'

function ViewHanding() {
  const { id, idHand } = useParams()
  const [count, setCount] = useState([])
  const [handList, setHandList] = useState([])
  const [loading, setLoading] = useState(false)
  const loadOrder = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      OrderService.countStatus().then((res) => {
        if (res.success === true) {
          if (res.data) {
            setCount(res.data)
            console.log('data', res.data)
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
      OrderService.handShop(parseInt(idHand)).then((res) => {
        if (res.success === true) {
          if (res.data && res.data.length > 0) {
            setHandList(res.data)
            setLoading(false)
          } else {
            setHandList([])
            setLoading(false)
          }
        } else {
          setHandList([])
          setLoading(false)
        }
      })
    }, DATA_LOAD_TIME)
  }, [idHand])

  useEffect(() => {
    loadOrder()
  }, [idHand])
  return (
    <div>
      <FilterBarConfirm count={count} />
      {loading ? (
        <tr className='d-flex justify-content-center'>
          <td colSpan={8}>
            <SpinningSingle background />
          </td>
        </tr>
      ) : (
        <div>{handList.length === 0 ?
          <div className='d-flex justify-content-center'>
            <div>
              <div className='text-center'>
                <i className='fas fa-database' />
              </div>
              <div>
                Không có dữ liệu
              </div>
            </div>
          </div>
          :
          <TableData orders={handList} callBack={loadOrder} />}
        </div>
      )}
    </div>
  )
}

export default ViewHanding