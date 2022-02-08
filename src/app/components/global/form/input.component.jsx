import React from 'react'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'

function InputComponent(props) {
  const { form, field, type, handleOnBlur } = props
  const { name } = field
  const isInvalid = form.touched[name] && form.errors[name]

  return (
    <>
      <FormControl
        id={name}
        {...field}
        onBlur={handleOnBlur && handleOnBlur}
        className={`${props.className} ${isInvalid && 'is-invalid'}`}
        type={type}
        placeholder={props.placeholder}
        disabled={props.disabled || false}
        autoComplete={props.autoComplete ? 'on' : 'off'}
      />
      {isInvalid && (
        <div className="invalid-feedback text-first-uppercase">
          {form.errors[name]}
        </div>
      )}
    </>
  )
}

InputComponent.propTypes = {
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }),
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }),
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.bool,
  handleOnBlur: PropTypes.func
}

export default InputComponent
