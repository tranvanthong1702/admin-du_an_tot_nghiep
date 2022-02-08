import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from '@material-ui/lab'
import './scss/pagination.scss'

function PaginationComponent({ lastPage, page, setPage }) {
  const onHandleChangePage = (event, toPage) => {
    setPage(toPage)
  }

  return (
    <ul className="datatable-pager-nav my-2 mb-sm-0">
      <Pagination
        defaultPage={page}
        count={lastPage}
        onChange={onHandleChangePage}
        shape="rounded"
      />
    </ul>
  )
}

PaginationComponent.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired
}

export default PaginationComponent
