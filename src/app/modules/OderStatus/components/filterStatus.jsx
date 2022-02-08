import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function filterStatus({ count }) {
  // const nameHi = count.filter(item => item.process_id == 2)[0].count
  return (
    <section className='section-link'>
      {
        count.length>0?(
          <div>
            <NavLink to='/status/handing/7/0' activeClassName='active_link' className='btn btn-success font-weight-bolder font-size-sm'>
              Chưa bàn giao ()
            </NavLink>
            <NavLink to='/status/handing/8/1' activeClassName='active_link' className='btn btn-success font-weight-bolder font-size-sm'>
              Đã bàn giao ()
            </NavLink>
          </div>
        ):('')
      }
    </section>
  )
}

export default filterStatus
