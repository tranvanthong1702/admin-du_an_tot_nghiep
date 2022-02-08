import React from 'react'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'

function TextareaComponent(props) {
  const { form, field, rows = 3 } = props
  const { name } = field
  const isInvalid = form.touched[name] && form.errors[name]
  return (
    <>
      <FormControl
        id={name}
        {...field}
        className={`${props.className} ${isInvalid && 'is-invalid'}`}
        as="textarea"
        rows={rows}
        placeholder={props.placeholder}
        disabled={props.disabled || false}
        autoComplete={props.autoComplete ? 'on' : 'off'}
      />
      {isInvalid && <div className="invalid-feedback">{form.errors[name]}</div>}
    </>
  )
}

TextareaComponent.propTypes = {
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }),
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.bool
}

export default TextareaComponent
