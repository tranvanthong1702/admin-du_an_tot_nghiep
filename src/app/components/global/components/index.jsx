import React, { useMemo, useState } from 'react'

const [q, setPhone] = useState([])
const [pageNumber, setPageNumber] = useState(0)
const [categorySelected, setCategorySelected] = useState(null)
const [sorted, setSorted] = useState(null)
const [statused, setStatused] = useState(null)
const [success, setSuccess] = useState([])

const pageCount = Math.ceil(products.length / productPerPage)
export const changePage = ({ selected }) => {
  setPageNumber(selected)
}
const convertDate = (data) => {
  const date = new Date(data)
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}
export const search = (rows) => {
  return rows.filter((row) => row.name.toLowerCase().indexOf(q) > -1 || row.price.toLowerCase().indexOf(q) > -1)
}
export const onchangeSort = (e) => {
  setSorted(e.target.value)
}
export const onChangeCate = (e) => {
  setCategorySelected(e.target.value)
}
export const onChangeStatus = (e) => {
  setStatused(e.target.value)
}
