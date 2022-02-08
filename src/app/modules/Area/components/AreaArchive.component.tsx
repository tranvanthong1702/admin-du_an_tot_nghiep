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

function AreaArchive(props: PropsInterface): ReactElement {
  const t = useTranslate()
  const { area, show, onHide, callback } = props

  const onArchive = (): void => {
    if (area) {
      onHide()
      AreaService.archive(area._id).then((res) => {
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
        title={`${t(area && area.archive ? 'Un archive' : 'Archive')} ${area && area.name}`}
        onHide={onHide}
        show={show}
        dialogClassName="modal-600"
        body={
          <>
            <p>
              {t(area && area.archive ? 'Confirm to un archive {name}' : 'Confirm to archive {name}', {
                name: area && area.name
              })}
            </p>
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
                onArchive()
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

export default AreaArchive
