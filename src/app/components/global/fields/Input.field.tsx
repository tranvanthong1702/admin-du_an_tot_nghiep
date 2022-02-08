import React from 'react'
import { FormControl, FormControlProps, FormGroup, FormLabel } from 'react-bootstrap'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'

interface Props extends FormControlProps {
  label?: string
  error?: FieldError
}

const InputField = React.forwardRef<HTMLInputElement, Props>(({ label, id, error, ...props }, refFormControl) => {
  return (
    <FormGroup>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <FormControl {...props} ref={refFormControl} className={clsx({ 'is-invalid': error })} />
      {error && <span className="feedback text-danger">{error.message}</span>}
    </FormGroup>
  )
})

export default InputField
