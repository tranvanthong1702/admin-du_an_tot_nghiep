import clsx from 'clsx'
import { FastField, Formik, Form } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
import Spinning from '../../../components/extra/Spinning.component'
import ImageInput from '../../../components/global/form/imageInput.component'
import InputComponent from '../../../components/global/form/input.component'
import TextareaComponent from '../../../components/global/form/textarea.component'
import ModalComponent from '../../../components/global/Modal.component'
import { AREA_FORM_DEFAULT } from '../constants/area.constant'
import AreaService from '../services/Area.service'
import { useTranslate } from '../../../hooks/translate'
import { AlertHelper } from '../../../../helpers/alert.helper'
import FormModalComponent from '../../../components/global/form/FormModal.component'

interface PropsInterface {
  id: string | null
  show: boolean
  onHide(): void
  callback(): void
}

function FormArea(props: PropsInterface) {
  const t = useTranslate()
  const { id, show, onHide, callback } = props
  const [initialValues, setInitialValues] = useState(AREA_FORM_DEFAULT)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)

  const formAreaValidate = Yup.object().shape({
    name: Yup.string()
      .min(3, t('Minimum field length: {min}', { min: 3 }))
      .max(50, t('Maximum field length: {max}', { max: 50 }))
      .required(t('Required field {name}', { name: t('Name') })),
    description: Yup.string().max(500, t('Maximum field length: {max} symbols', { max: 500 }))
  })

  const onSubmit = async (values: object) => {
    setSubmitting(true)
    let data
    if (id) {
      data = await AreaService.update(id, values)
    } else {
      data = await AreaService.store(values)
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

  const loadArea = useCallback(() => {
    if (id) {
      setLoading(true)
      AreaService.find(id).then((area) => {
        setLoading(false)
        if (area) {
          setInitialValues({
            name: area.name,
            description: area.description || '',
            thumbnail: area.thumbnail || ''
          })
        }
      })
    } else {
      setInitialValues(AREA_FORM_DEFAULT)
    }
  }, [id])

  useEffect(() => {
    loadArea()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <FormModalComponent
      show={show}
      onHide={onHide}
      title={id ? `${t('Edit {name}', { name: t('Company') })}` : `${t('Create {name}', { name: 'Company' })}`}
      onSubmit={onSubmit}
    />
  )
}

export default FormArea
