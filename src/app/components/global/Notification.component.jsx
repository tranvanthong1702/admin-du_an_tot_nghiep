import React from 'react'
import SVG from 'react-inlinesvg'
import PropTypes from 'prop-types'
import { toAbsoluteUrl } from '../../../_metronic/_helpers'

function Notification({ show, children }) {
  return (
    <div
      hidden={!show}
      className="alert alert-custom alert-white alert-shadow fade show gutter-b"
      role="alert"
    >
      <div className="alert-icon">
        <span className="svg-icon svg-icon-primary svg-icon-xl">
          <SVG src={toAbsoluteUrl('media/svg/icons/Tools/Compass.svg')} />
        </span>
      </div>
      <div className="alert-text">{children}</div>
    </div>
  )
}

Notification.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}

export default Notification
