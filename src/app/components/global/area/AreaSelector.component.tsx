import React, { ReactElement, useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import { Area } from '../../../interfaces/models/Area'
import { connect, useSelector } from 'react-redux'
import * as area from 'app/modules/Area/redux/area.redux'

function AreaSelector(props: any): ReactElement {
  const { areas, areaSelected }: any = useSelector<any>((state) => state.area)
  const [keyword, setKeyword] = useState<string>('')

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '')
    setKeyword(inputValue)
    return inputValue
  }
  const filterAreas = (inputValue: string) => {
    return areas.filter((i: Area) => i.name.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const loadOptions = (inputValue: string, callback: (options: Area[]) => void) => {
    setTimeout(() => {
      callback(filterAreas(inputValue))
    }, 1000)
  }

  useEffect(() => {
    if (areas.length === 0) {
      // props.loadAreas()
    }
  }, [])
  return (
    <div className="area-selector w-100">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onInputChange={handleInputChange}
        options={areas}
      />
    </div>
  )
}

export default connect(null, area.actions)(AreaSelector)
