import PropTypes from 'prop-types'
import React from 'react'
import { FormGroup, FormLabel } from 'react-bootstrap'
import Select from 'react-select'

function SelectComponent(props) {
  const {
    form,
    field,
    options,
    label,
    placeholder,
    defaultValue,
    disabled
  } = props
  const { name, value } = field
  const isInvalid = form.touched[name] && form.errors[name]

  const selectedOption = options.find((option) => option.value === value)

  const handleSelectedOptionChange = (clickedOption) => {
    const selectedValue = clickedOption ? clickedOption.value : clickedOption

    const changeEvent = {
      target: {
        name,
        value: selectedValue
      }
    }
    field.onChange(changeEvent)
  }
  return (
    <>
      <FormGroup>
        {label && <FormLabel>{label}</FormLabel>}
        <Select
          id={name}
          {...field}
          value={selectedOption || defaultValue}
          onChange={handleSelectedOptionChange}
          isDisabled={disabled && true}
          options={options}
          placeholder={placeholder}
          className={`${props.className} ${isInvalid && 'is-invalid'}`}
          defaultValue={defaultValue}
        />
        {isInvalid && (
          <div className="invalid-feedback">{form.errors[name]}</div>
        )}
      </FormGroup>
    </>
  )
}

SelectComponent.propTypes = {
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }),
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any
}

export default SelectComponent
