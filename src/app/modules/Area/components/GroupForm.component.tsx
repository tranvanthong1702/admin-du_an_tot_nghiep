import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { FastField, Formik, Form } from 'formik'
import * as Yup from 'yup'
import Spinning from '../../../components/extra/Spinning.component'
import ImageInput from '../../../components/global/form/imageInput.component'
import InputComponent from '../../../components/global/form/input.component'
import TextareaComponent from '../../../components/global/form/textarea.component'
import ModalComponent from '../../../components/global/Modal.component'
import { AREA_FORM_DEFAULT, GROUP_FORM_DEFAULT } from '../constants/area.constant'
import AreaService from '../services/Area.service'
import { useTranslate } from '../../../hooks/translate'
import { AlertHelper } from '../../../../helpers/alert.helper'
import FormModalComponent from '../../../components/global/form/FormModal.component'

interface PropInterface {
  areaId: string
  id: string | null
  show: boolean
  onHide(): void
  callback(): void
}

interface FormValuesInterface {
  name: string
  description: string | null
  thumbnail: string | null
}

function GroupForm(props: PropInterface) {
  const t = useTranslate()
  const { areaId, id, show, onHide, callback } = props
  const [initialValues, setInitialValues] = useState<FormValuesInterface>(GROUP_FORM_DEFAULT)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)

  const formAreaValidate = Yup.object().shape({
    name: Yup.string()
      .min(3, t('Minimum field length: {min} symbols', { min: 3 }))
      .max(50, t('Maximum field length: {max} symbols', { max: 50 }))
      .required(t('{name} is required', { name: t('Name') })),
    description: Yup.string()
      .max(500, t('Maximum field length: {max}', { max: 500 }))
      .nullable()
  })

  const onSubmit = async (values: object) => {
    setSubmitting(true)
    let data
    if (id) {
      data = await AreaService.groupUpdate(id, values)
    } else {
      data = await AreaService.groupStore(areaId, values)
    }
    setSubmitting(false)
    if (!data) {
      return
    }
    AlertHelper({ type: 'success', title: id ? t('Update successfully') : t('Create successfully') })
    onHide()
    if (callback) {
      callback()
    }
  }

  const loadGroup = useCallback(() => {
    if (id && show) {
      setLoading(true)
      AreaService.groupFind(id).then((group) => {
        setLoading(false)
        if (group) {
          setInitialValues({
            name: group.name,
            description: group.description,
            thumbnail: group.thumbnail
          })
        }
      })
    } else {
      setInitialValues(AREA_FORM_DEFAULT)
    }
  }, [id, show])

  useEffect(() => {
    loadGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <FormModalComponent
      show={show}
      onHide={onHide}
      title={id ? `${t('Edit {name}', { name: t('Group') })}` : `${t('Create {name}', { name: t('Group') })}`}
      onSubmit={onSubmit}
      loadingData={loading}
    />
  )
}

export default GroupForm
