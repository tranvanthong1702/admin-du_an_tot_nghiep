import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import * as auth from '../_redux/authRedux'
import { register } from '../_redux/authCrud'
import { useTranslate } from '../../../hooks/translate'

const initialValues = {
  fullname: '',
  email: '',
  username: '',
  password: '',
  changepassword: '',
  acceptTerms: false
}

function Registration(props) {
  const t = useTranslate()
  const [loading, setLoading] = useState(false)
  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, t('Minimum field length: {min} symbols', { min: 3 }))
      .max(50, t('Maximum field length: {max} symbols', { max: 50 }))
      .required(t('Required field')),
    last_name: Yup.string()
      .min(3, t('Minimum field length: {min} symbols', { min: 3 }))
      .max(50, t('Maximum field length: {max} symbols', { max: 50 }))
      .required(t('Required field')),
    email: Yup.string()
      .email(t('Wrong email format'))
      .min(3, t('Minimum field length: {min} symbols', { min: 3 }))
      .max(50, t('Maximum field length: {max} symbols', { max: 50 }))
      .required(t('Required field')),
    password: Yup.string()
      .min(3, t('Minimum field length: {min} symbols', { min: 3 }))
      .max(50, t('Maximum field length: {max} symbols', { max: 50 }))
      .required(t('Required field')),
    changepassword: Yup.string()
      .required(t('Required field'))
      .when('password', {
        is: (val) => val && val.length > 0,
        then: Yup.string().oneOf([Yup.ref('password')], t('Password and Confirm Password did not match'))
      }),
    acceptTerms: Yup.bool().required(t('You must accept the terms and conditions'))
  })

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'is-invalid'
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'is-valid'
    }

    return ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true)
      enableLoading()
      register(values.email, values.firstName, values.last_name, values.password, values.changepassword)
        .then(({ accessToken }) => {
          props.register(accessToken)
          disableLoading()
          setSubmitting(false)
        })
        .catch((error) => {
          const message = JSON.parse(error.request.response).content.message
          setSubmitting(false)
          setStatus(message)
          disableLoading()
        })
    }
  })

  return (
    <div className="login-form login-signin" style={{ display: 'block' }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">{t('Sign Up')}</h3>
        <p className="text-muted font-weight-bold">{t('Enter your details to create your account')}</p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: First name */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={t('First name')}
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('firstName')}`}
            name="firstName"
            {...formik.getFieldProps('firstName')}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.firstName}</div>
            </div>
          ) : null}
        </div>
        {/* end: First name */}

        {/* begin: Username */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={t('Last name')}
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('last_name')}`}
            name="last_name"
            {...formik.getFieldProps('last_name')}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.last_name}</div>
            </div>
          ) : null}
        </div>
        {/* end: Username */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={t('Email')}
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('email')}`}
            name="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={t('Password')}
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('password')}`}
            name="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder={t('Confirm Password')}
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('changepassword')}`}
            name="changepassword"
            {...formik.getFieldProps('changepassword')}
          />
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.changepassword}</div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

        {/* begin: Terms and Conditions */}
        <div className="form-group">
          <label className="checkbox">
            <input type="checkbox" name="acceptTerms" className="m-1" {...formik.getFieldProps('acceptTerms')} />
            <Link to="/terms" target="_blank" className="mr-1" rel="noopener noreferrer">
              {t('I agree the Terms and Conditions')}
            </Link>
            <span />
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.acceptTerms}</div>
            </div>
          ) : null}
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span>{t('Submit')}</span>
            {loading && <span className="ml-3 spinner spinner-white" />}
          </button>

          <Link to="/auth/login">
            <button type="button" className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4">
              {t('Cancel')}
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

Registration.propTypes = {
  register: PropTypes.func.isRequired
}

export default connect(null, auth.actions)(Registration)
