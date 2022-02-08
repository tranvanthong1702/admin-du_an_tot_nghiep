import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function FilterBar({ count, loading, orders }) {
  const convert = (id, arr) => {
    return arr.filter((item) => item.process_id === id)
  }
  return (
    <section className='section-link'>
      {loading ? (
        <div>Dang Load</div>
      ) : (
        <>
          <NavLink
            to='/status/1'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Chưa xử lý
            {count.length > 0 && <>{convert(1, count).length > 0 ? <>({convert(1, count)[0].count})</> : <>(0)</>}</>}
          </NavLink>
          <NavLink
            to='/status/2'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Đang xử lý
            {count.length > 0 && <>{convert(2, count).length > 0 ? <>({convert(2, count)[0].count})</> : <>(0)</>}</>}
          </NavLink>
          <NavLink
            to='/status/3'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Chờ giao
            {count.length > 0 && <>{convert(3, count).length > 0 ? <>({convert(3, count)[0].count})</> : <>(0)</>}</>}
          </NavLink>
          <NavLink
            to='/status/4'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Đang giao
            {count.length > 0 && <>{convert(4, count).length > 0 ? <>({convert(4, count)[0].count})</> : <>(0)</>}</>}
          </NavLink>
          <NavLink
            to='/status/5'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Giao thành công
            {count.length > 0 && <>{convert(5, count).length > 0 ? <>({convert(5, count)[0].count})</> : <>(0)</>}</>}
          </NavLink>
          <NavLink
            to='/status/6'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Giao thất bại
            {count.length > 0 && <>{convert(6, count).length > 0 ? <>({convert(6, count)[0].count})</> : <>(0)</>}</>}
          </NavLink>
          <NavLink
            to='/status/9'
            activeClassName='active_link'
            className='btn btn-success font-weight-bolder font-size-sm'
          >
            Tất cả
            ({count.length > 0 ? count[0].sum : 0})
          </NavLink>
        </>
      )}
    </section>
  )
}

export default FilterBar
