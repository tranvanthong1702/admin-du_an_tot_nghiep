export function useQuery(queryString = undefined) {
  const urlSearchParams = new URLSearchParams(queryString ? queryString : window.location.search)
  const query = Object.fromEntries(urlSearchParams.entries())
  return [query, urlSearchParams]
}
