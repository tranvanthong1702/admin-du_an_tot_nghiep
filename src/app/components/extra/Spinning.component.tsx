import clsx from 'clsx'
import React, { ReactChild, ReactNode, useEffect, useRef } from 'react'
import $ from 'jquery'

interface PropsInterface {
  loading: boolean
  background?: boolean
  content?: ReactNode
  children: ReactChild
}

function Spinning(props: PropsInterface) {
  const { loading, background, children, content } = props
  const childrenRef = useRef(null)

  useEffect(() => {
    if (childrenRef.current) {
      if (loading) {
        $(childrenRef).fadeIn('slow')
      } else {
        $(childrenRef).hide()
      }
    }
  }, [loading])
  return (
    <>
      {loading ? (
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
      ) : (
        <div ref={childrenRef}>{children}</div>
      )}
    </>
  )
}

export default Spinning
