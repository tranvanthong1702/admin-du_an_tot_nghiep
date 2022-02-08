import React, { ReactElement } from 'react'
import ModalComponent from '../../../components/global/Modal.component'
import { useTranslate } from '../../../hooks/translate'
import { Group } from '../../../interfaces/models/Group'
import { Button } from 'react-bootstrap'
import AreaService from '../services/Area.service'
import { AlertHelper } from '../../../../helpers/alert.helper'

interface PropsInterface {
  group: Group | null
  show: boolean
  onHide(): void
  callback(): void
}

function GroupDeleteComponent(props: PropsInterface): ReactElement {
  const t = useTranslate()
  const { group, show, onHide, callback } = props

  const onDelete = (): void => {
    if (group) {
      onHide()
      AreaService.groupDelete(group._id).then((res) => {
        if (res) {
          AlertHelper({ type: 'info', title: res.message })
        }
        callback()
      })
    }
  }
  return (
    <ModalComponent
      title={t('Delete {name}', { name: group?.name || '' })}
      onHide={onHide}
      show={show}
      dialogClassName="modal-600"
      body={<p>{t('Confirm to delete {name}', { name: group?.name || '' })}</p>}
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
  )
}

export default GroupDeleteComponent
