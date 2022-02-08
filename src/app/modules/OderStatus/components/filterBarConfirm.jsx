import React from 'react'
import { NavLink } from 'react-router-dom'

function FilterBarConfirm({ count, loading }) {
  return (
    <section className='section-link'>
      {loading ? (
        <div>Dang Load</div>
      ) : (
        <>
          <NavLink
            to='/status/handing/7/0'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Chưa bàn giao
            ({count ? (
            <>
              {count.shop_no_confirm}
            </>
          ) : (
            '0'
          )})
          </NavLink>
          <NavLink
            to='/status/handing/8/1'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Đã bàn giao
            ({count ? (
            <>
              {count.shop_confirm}
            </>
          ) : (
            '0'
          )})
          </NavLink>
        </>
      )}
    </section>
  )
}

export default FilterBarConfirm
