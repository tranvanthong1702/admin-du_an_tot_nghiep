export const DATATABLE_LIMITS = [5, 10, 15, 20, 30, 50]

export const DATATABLE_OPTIONS_DEFAULT = {
  page: 1,
  limit: 10,
  sort: null,
  query: [],
  keyword: ''
}

export const DATATABLE_METADATA_DEFAULT = {
  total: 0,
  per_page: DATATABLE_OPTIONS_DEFAULT.limit,
  current_page: 1,
  last_page: 10,
  first_page_url: '',
  last_page_url: '',
  next_page_url: '',
  prev_page_url: null,
  path: '',
  from: 1,
  to: DATATABLE_OPTIONS_DEFAULT.limit,
  data: []
}
