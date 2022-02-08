import React, { ReactElement, useState } from 'react'
import { FastField, Form, Formik } from 'formik'
import Spinning from '../../extra/Spinning.component'
import InputComponent from './input.component'
import TextareaComponent from './textarea.component'
import ImageInput from './imageInput.component'
import clsx from 'clsx'
import ModalComponent from '../Modal.component'
import { useTranslate } from '../../../hooks/translate'
import * as Yup from 'yup'

interface PropsInterface {
  show: boolean
  onHide(): void
  title: string
  onSubmit(values: object): Promise<void>
  loadingData?: boolean
}

export default function FormModalComponent(props: PropsInterface): ReactElement {
  const t = useTranslate()
  const { show, onHide, title, onSubmit, loadingData } = props
  const [submitting, setSubmitting] = useState(false)

  const initialValues = {
    name: '',
    description: '',
    thumbnail: ''
  }

  const formAreaValidate = Yup.object().shape({
    name: Yup.string()
      .min(3, t('Minimum field length: {min} symbols', { min: 3 }))
      .max(50, t('Maximum field length: {max} symbols', { max: 50 }))
      .required(t('{name} is required', { name: t('Name') })),
    description: Yup.string()
      .max(500, t('Maximum field length: {max}', { max: 500 }))
      .nullable()
  })

  const onSubmitForm = async (values: object): Promise<void> => {
    setSubmitting(true)
    onSubmit(values).then(() => {
      setSubmitting(false)
    })
  }
  return (
    <ModalComponent title={title} onHide={onHide} show={show} dialogClassName="modal-600">
      <Formik
        onSubmit={onSubmitForm}
        initialValues={initialValues}
        validationSchema={formAreaValidate}
        enableReinitialize
      >
        {({ setFieldValue, values }) => {
          const onChooseImage = (path: string) => {
            setFieldValue('thumbnail', path)
          }
          return (
            <Form>
              <Spinning loading={loadingData || false}>
                <div className="card-body">
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label text-lg-right text-first-uppercase">{t('Name')}:</label>
                    <div className="col-lg-9">
                      <FastField name="name" type="text" component={InputComponent} className="form-control" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label text-lg-right text-first-uppercase">
                      {t('Description')}:
                    </label>
                    <div className="col-lg-9">
                      <FastField name="description" rows={4} component={TextareaComponent} className="form-control" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label text-lg-right text-first-uppercase">{t('Image')}</label>
                    <div className="col-lg-9">
                      <ImageInput onChoose={onChooseImage} initialValue={values.thumbnail} />
                    </div>
                  </div>
                </div>
              </Spinning>
              <div className="card-footer modal-footer">
                <div className="row">
                  <button
                    type="submit"
                    className={clsx('btn btn-primary float-right spinner-white spinner-left', {
                      spinner: submitting
                    })}
                  >
                    {t('Submit')}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary ml-3"
                    onClick={() => {
                      onHide()
                    }}
                  >
                    {t('Cancel')}
                  </button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </ModalComponent>
  )
}
