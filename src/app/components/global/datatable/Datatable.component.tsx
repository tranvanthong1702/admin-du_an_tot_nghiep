import React, { ReactElement, ReactNode, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap'
import { DATATABLE_LIMITS } from './datatable.constant'
import PaginationComponent from './Pagination.component'
import SpinningSingle from '../../extra/SpinningSingle.component'
import { Link } from 'react-router-dom'

interface Options {
  page: number
  limit: number
  sort: null | { field: string; sort: 'asc' | 'desc' }
  query: { field: string; value: string }[]
  keyword: string
}

interface Metadata {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string
  prev_page_url: null
  path: string
  from: 1
  to: 15
  data: any[]
}

interface PropsInterface {
  title?: string
  subTitle?: string
  thead: ReactNode
  tbody: ReactNode
  searchForm?: {
    search: boolean
    queries: {
      field: string
      options: {
        name: string
        value: string | number
      }[]
    }[]
  }
  options: Options
  metadata: Metadata
  setOptions(value: Options): void
  loading?: boolean
  toolbar?: ReactNode
  filters?:ReactNode
  button?: ReactNode
  searchform?: ReactNode
}

function DataTable(props: PropsInterface): ReactElement {
  const { title, subTitle, thead, tbody, searchform, options, metadata, setOptions, loading, toolbar, button,filters } = props


  const [keyword, setKeyword] = useState('')
  return (
    <Card className="card-custom">
      <Card.Header className="d-flex flex-row-reverse bd-highlight border-0 pt-6 pb-6">
        <div className=" p-2 bd-highlight">
          {button}
        </div>
        <h3 className="card-title align-items-center flex-column">
          <span className="card-label font-weight-bolder text-dark">{title ? title : 'Data'}</span>
          {subTitle && <span className="text-muted mt-1 font-weight-bold font-size-sm">{subTitle}</span>}
        </h3>

        <div className="   p-2 bd-highlight card-toolbar">
          {toolbar}
        </div>

      </Card.Header>
      <Card.Body>
        
        {searchform}
        {filters}
        <div
          className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded"
          id="kt_datatable"
        >
          <table className="datatable-table" style={{ display: 'block' }}>
            <thead className="datatable-head">{thead}</thead>
            {loading ? (
              <tbody className="datatable-body h-lg-400px">
                <tr className="datatable-row">
                  <td className="m-auto">
                    <SpinningSingle background />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="datatable-body">{tbody}</tbody>
            )}
          </table>
          <div className="datatable-pager datatable-paging-loaded">
            {/* <PaginationComponent
              page={metadata.current_page}
              lastPage={metadata.last_page}
              setPage={(page) => {
                setOptions({ ...options, page })
              }}
              perPage={options.limit}
            /> */}
            <div className="datatable-pager-info my-2 mb-sm-0">
              <Dropdown drop="up" className="bootstrap-select datatable-pager-size" style={{ width: '60px' }}>
                {/* <Dropdown.Toggle
                  as="button"
                  id="dropdown-toggle"
                  bsPrefix="dropdown-inline-toggle"
                  className="btn btn-light"
                >
                  <div className="filter-option">
                    <div className="filter-option-inner">
                      <div className="filter-option-inner-inner">{options.limit}</div>
                    </div>
                  </div>
                </Dropdown.Toggle> */}
                <Dropdown.Menu>
                  <ul className="dropdown-menu inner">
                    {DATATABLE_LIMITS.map((limit, index) => (
                      <Dropdown.Item
                        as="button"
                        key={index}
                        onClick={() => {
                          setOptions({ ...options, limit })
                        }}
                      >
                        <span className="text">{limit}</span>
                      </Dropdown.Item>
                    ))}
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default DataTable
