import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { getUserByToken, login } from '../_redux/authCrud'
import StorageHelper from '../../../../helpers/storage.helper'
import { ACCESS_TOKEN_KEY } from '../../../../constants'
import { useTranslate } from '../../../hooks/translate'
import { setAccountProfile, setLoggedIn } from '../../../../redux/reducers/auth'

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: '',
  password: ''
}

function Login(props) {
  const t = useTranslate()
  const location = useLocation()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(t('Required field')),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(t('Required field'))
  })

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

  const getInputClasses = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return 'is-invalid'
    }

    if (formik.touched[fieldName] && !formik.errors[fieldName]) {
      return 'is-valid'
    }

    return ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading()
      setTimeout(() => {
        login(values.email, values.password)
          .then((data) => {
            disableLoading()
            const pro = data.user
            const roles = pro.roles[0]
            if (roles) {
              StorageHelper.setItem('ACCESS_TOKEN_KEY', data.token)
              StorageHelper.setItem('User', data.user)
              if (location.state && location.state.ref) {
                history.push(location.state.ref)
              } else {
                window.location.reload()
              }
            }
            else {
              disableLoading()
              setSubmitting(false)
              setStatus(t('Bạn không có quyền truy cập! Hãy liên hệ quản trị'))
            }

            // save status login
            // props.setLoggedIn(true)
            // // call api get user info
            // getUserByToken().then(data => {
            //   // save user info
            //   props.setAccountProfile(data)
            //
            // })
          })
          .catch(() => {
            disableLoading()
            setSubmitting(false)
            setStatus(t('Bạn không có quyền truy cập! Hãy liên hệ quản trị'))
          })
      }, 1000)
    }
  })

  return (
    <div className='login-form login-signin' id='kt_login_signin_form'>
      {/* begin::Head */}
      <div className='text-center mb-10 mb-lg-20'>
        <h3 className='font-size-h1'>{t('Login Account')}</h3>
        <p className='text-muted font-weight-bold'>{t('Enter your email and password')}</p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form onSubmit={formik.handleSubmit} className='form fv-plugins-bootstrap fv-plugins-framework'>
        {formik.status && (
          <div className='mb-10 alert alert-custom alert-light-danger alert-dismissible'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}
        <div className='form-group fv-plugins-icon-container'>
          <input
            placeholder='Email'
            type='email'
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('email')}`}
            name='email'
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className='form-group fv-plugins-icon-container'>
          <input
            placeholder='Password'
            type='password'
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('password')}`}
            name='password'
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className='form-group d-flex flex-wrap justify-content-between align-items-center'>
          <Link to='/auth/forgot-password' className='text-dark-50 text-hover-primary my-3 mr-2' id='kt_login_forgot'>
            {t('Forgot Password')}
          </Link>
          <button
            id='kt_login_signin_submit'
            type='submit'
            disabled={formik.isSubmitting}
            className={'btn btn-primary font-weight-bold px-9 py-4 my-3'}
          >
            <span>{t('Sign In')}</span>
            {loading && <span className='ml-3 spinner spinner-white' />}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  )
}

const mapDispatchToProps = {
  setLoggedIn,
  setAccountProfile
}

export default connect(null, mapDispatchToProps)(Login)
