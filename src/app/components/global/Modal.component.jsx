import React, { memo } from 'react'
import { Button, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

function ModalComponent({
  title,
  show,
  size,
  className = '',
  dialogClassName = '',
  backdropClassName = '',
  backdrop = true,
  centered = true,
  closeButton = true,
  onHide,
  onExit,
  body,
  footer,
  children
}) {
  return (
    <Modal
      show={show}
      size={size}
      centered={centered}
      backdrop={backdrop}
      onHide={onHide}
      onExit={onExit}
      className={className}
      dialogClassName={dialogClassName}
      backdropClassName={backdropClassName}
    >
      {title && (
        <Modal.Header closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
          {closeButton && (
            <Button
              variant="link"
              type="button"
              className="close"
              onClick={onHide}
            >
              <i aria-hidden="true" className="ki ki-close" />
            </Button>
          )}
        </Modal.Header>
      )}
      {!!body && <Modal.Body>{body}</Modal.Body>}
      {children}
      {!!footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  )
}

ModalComponent.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['sm', 'xl', 'lg']),
  className: PropTypes.string,
  dialogClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  backdrop: PropTypes.bool,
  centered: PropTypes.bool,
  closeButton: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onExit: PropTypes.func, // required ?
  body: PropTypes.element,
  footer: PropTypes.element,
  children: PropTypes.node
}

export default memo(ModalComponent)
