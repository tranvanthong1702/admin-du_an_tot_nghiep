import clsx from 'clsx'
import React, { ReactChild, ReactNode } from 'react'
import PropTypes from 'prop-types'

interface PropsInterface {
  background?: boolean
  content?: ReactNode
}

function SpinningSingle(props: PropsInterface) {
  const { background, content } = props
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap">
      <div className="d-flex py-3 col-12 justify-content-center my-5">
        {content ? (
          content
        ) : (
          <div
            className={clsx('d-flex align-items-center p-3', {
              'border-3 shadow-sm bg-white-o-20': background
            })}
          >
            <div className="mr-2 text-muted">Loading...</div>
            <div className="spinner mr-6 spinner-primary" />
          </div>
        )}
      </div>
    </div>
  )
}

export default SpinningSingle
