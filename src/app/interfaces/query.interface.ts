interface QueryInterface {
  limit: number
  sort: { field: string; sort: 'asc' | 'desc' }
  query: [{ field: string; value: string }]
  keyword: string
}

declare const queryInterface: QueryInterface

export default queryInterface
