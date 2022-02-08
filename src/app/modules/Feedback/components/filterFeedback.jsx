import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
function FilterFeedback() {
  return (
    <section className="section-link">
      <NavLink
        to={`/feedback/analytics/month`}
        activeClassName="active_link"
        className="btn btn-success font-weight-bolder font-size-sm"
      >
        Biểu đồ theo tháng
      </NavLink>
      <NavLink
        to={`/feedback/analytics/year`}
        activeClassName="active_link"
        className="btn btn-success font-weight-bolder font-size-sm"
      >
        Biểu đồ theo năm
      </NavLink>
    </section>
  )
}

export default FilterFeedback
