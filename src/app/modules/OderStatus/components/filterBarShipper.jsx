import React from 'react'
import { NavLink } from 'react-router-dom'

function FilterBarShipper({ count, loading }) {
  return (
    <section className='section-link'>
      {loading ? (
        <div>
          Dang Load
        </div>
      ) : (
        <>
          <NavLink to='/shipper/3' activeClassName='active_link'
                   className='btn btn-success font-weight-bolder font-size-sm'>
            Đơn Hàng Mới
            ({count ? (
            <>
              {count.order_new}
            </>
          ) : (
            '0'
          )})
          </NavLink>
          <NavLink to='/shipper/4' activeClassName='active_link'
                   className='btn btn-success font-weight-bolder font-size-sm'>
            Đơn Hàng Đang Giao
            ({count ? (
            <>
              {count.order_delivering}
            </>
          ) : (
            '0'
          )})
          </NavLink>
          <NavLink to='/shipper/5' activeClassName='active_link'
                   className='btn btn-success font-weight-bolder font-size-sm'>
            Bàn Giao
            ({count ? (
            <>
              {count.order_shop_no_confirm}
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

export default FilterBarShipper
