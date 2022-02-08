import React, { createContext, useContext, useState } from 'react'

export function getBreadcrumbsAndTitle(menuId, pathName) {
  const result = {
    breadcrumbs: [],
    title: '',
    button: null
  }

  const menu = document.getElementById(menuId)
  if (!menu) {
    return result
  }

  const activeLinksArray = Array.from(menu.getElementsByClassName('active') || [])
  const activeLinks = activeLinksArray.filter((el) => el.tagName === 'A')
  if (!activeLinks) {
    return result
  }

  activeLinks.forEach((link) => {
    const titleSpans = link.getElementsByClassName('menu-text')
    if (titleSpans) {
      const titleSpan = Array.from(titleSpans).find((t) => t.innerHTML && t.innerHTML.trim().length > 0)
      if (titleSpan) {
        result.breadcrumbs.push({
          pathname: link.pathname,
          title: titleSpan.innerHTML
        })
      }
    }
  })
  result.title = getTitle(result.breadcrumbs, pathName)
  return result
}

export function getTitle(breadCrumbs, pathname) {
  if (!breadCrumbs || !pathname) {
    return ''
  }

  const { length } = breadCrumbs
  if (!length) {
    return ''
  }

  return breadCrumbs[length - 1].title
}

const SubheaderContext = createContext()

export function useSubheader() {
  return useContext(SubheaderContext)
}

export const SubheaderConsumer = SubheaderContext.Consumer

export function MetronicSubheaderProvider({ children }) {
  const [title, setTitle] = useState('')
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [action, setAction] = useState(null)
  const [tool, setTool] = useState(null)
  const value = {
    title,
    setTitle,
    breadcrumbs,
    setBreadcrumbs,
    action,
    setAction,
    tool,
    setTool
  }
  return <SubheaderContext.Provider value={value}>{children}</SubheaderContext.Provider>
}
