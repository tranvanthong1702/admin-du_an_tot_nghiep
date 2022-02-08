import React, { ReactElement } from 'react'
import { Button } from 'react-bootstrap'
import ModalComponent from '../../../components/global/Modal.component'
import AreaService from '../services/Area.service'
import { Area } from '../../../interfaces/models/Area'
import { useTranslate } from '../../../hooks/translate'
import { AlertHelper } from '../../../../helpers/alert.helper'

interface PropsInterface {
  area: Area | null
  show: boolean
  onHide(): void
  callback(): void
}

function AreaDelete(props: PropsInterface): ReactElement {
  const t = useTranslate()
  const { area, show, onHide, callback } = props

  const onDelete = () => {
    if (area) {
      onHide()
      AreaService.delete(area._id).then((res) => {
        if (res) {
          AlertHelper({ type: 'info', title: res.message })
        }
        callback()
      })
    }
  }

  return (
    <>
      <ModalComponent
        title={`${t('Delete')} ${area && area.name}`}
        onHide={onHide}
        show={show}
        dialogClassName="modal-600"
        body={
          <>
            <p>{t('Confirm to delete {name}', { name: area && area.name })}</p>
          </>
        }
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                onHide()
              }}
            >
              {t('Cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onDelete()
              }}
            >
              {t('Confirm')}
            </Button>
          </>
        }
      />
    </>
  )
}

export default AreaDelete
