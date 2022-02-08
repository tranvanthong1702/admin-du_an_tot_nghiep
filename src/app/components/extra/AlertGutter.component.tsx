import React, { ReactElement, ReactNode } from 'react'

interface PropsInterface {
  icon: ReactNode
  title: string
  content?: string
  buttons?: ReactNode
}

function AlertGutter(props: PropsInterface): ReactElement {
  const { icon, title, content, buttons } = props
  return (
    <div className="alert alert-custom alert-white alert-shadow fade show gutter-b" role="alert">
      <div className="alert-icon">{icon}</div>
      <div className="alert-text">
        <h5 className="font-weight-bold">{title}</h5>
        {content && <p>{content}</p>}
        {buttons}
      </div>
    </div>
  )
}

export default AlertGutter
