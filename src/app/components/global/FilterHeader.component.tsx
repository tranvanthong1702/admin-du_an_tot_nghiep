import React, { ReactElement } from 'react'
import { useTranslate } from '../../hooks/translate'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../_metronic/_helpers'

interface PropsInterface {
  total: number
  onSearch(value: string): void
}

function FilterHeader(props: PropsInterface): ReactElement {
  const t = useTranslate()
  const { total, onSearch } = props
  return (
    <div className="d-flex align-items-center" id="kt_subheader_search">
      <span className="text-dark-50 font-weight-bold" id="kt_subheader_total">
        {t('Total {count}', { count: total })}
      </span>
      <form className="ml-5">
        <div className="input-group input-group-sm input-group-solid" style={{ maxWidth: '175px' }}>
          <input
            type="text"
            onChange={(event) => {
              onSearch(event.target.value)
            }}
            className="form-control"
            id="kt_subheader_search_form"
            placeholder={t('Search')}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <span className="svg-icon">
                <SVG src={toAbsoluteUrl('media/svg/icons/General/Search.svg')} />
              </span>
              {/*<i class="flaticon2-search-1 icon-sm"></i>*/}
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FilterHeader
