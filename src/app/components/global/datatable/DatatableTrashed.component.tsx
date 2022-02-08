import React, { ReactElement, ReactNode, useState } from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import { DATATABLE_LIMITS } from './datatable.constant'
import PaginationComponent from './Pagination.component'
import SpinningSingle from '../../extra/SpinningSingle.component'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

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
    button: ReactNode
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
}

function DataTableTrashed(props: PropsInterface): ReactElement {
    const { title, subTitle, thead, tbody, searchForm, options, metadata, setOptions, loading, toolbar } = props
    const [keyword, setKeyword] = useState('')
    return (
        <Card className="card-custom">
            <Card.Header className="flex-wrap border-0 pt-6 pb-6">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label font-weight-bolder text-dark">{title ? title : 'Data'}</span>
                    {subTitle && <span className="text-muted mt-1 font-weight-bold font-size-sm">{subTitle}</span>}
                </h3>
                <div className="card-toolbar">
                    {toolbar}
                </div>
            </Card.Header>
            <Card.Body>
                
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
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default DataTableTrashed
