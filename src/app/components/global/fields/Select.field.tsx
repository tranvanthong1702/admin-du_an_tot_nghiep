import React, { SelectHTMLAttributes } from 'react'
import { FormGroup, FormLabel } from 'react-bootstrap'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'

type Option = {
  label: string
  value: string
}

interface Props extends SelectHTMLAttributes<any> {
  label?: string
  error?: FieldError
  options: Option[]
}

const SelectField = React.forwardRef<HTMLSelectElement, Props>(
  ({ label, id, error, options, className, ...props }, refFormControl) => {
    return (
      <FormGroup>
        {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        <select className={clsx(className, 'form-control form-control-solid')} {...props} ref={refFormControl}>
          <option disabled>Choose the option</option>
          {options.map((option, index) => (
            <option value={option.value} key={`select-${id}-${index}`}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="feedback text-danger">{error.message}</span>}
      </FormGroup>
    )
  }
)

export default SelectField
