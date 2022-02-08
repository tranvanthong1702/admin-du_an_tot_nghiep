import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import AreaListPage from './pages/AreaList.page'
import AreaManagerPage from './pages/AreaManager.page'

export const AreaRoutePath = {
  root: '/area',
  list: '/area/list',
  manager: '/area/:id/manager',
  toManager: (id) => `/area/${id}/manager`,
  access: '/area/:id/access',
  toAccess: (id) => `/area/${id}/access`
}
const profile = () => {
  const auth = localStorage.getItem('User') || null
  return auth ? JSON.parse(auth) : null
}
const user = profile()
// console.log(user)
export default function AreaRoutes() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from={AreaRoutePath.root} to={AreaRoutePath.list} />}
        <ContentRoute path={AreaRoutePath.list} component={AreaListPage} />
        <ContentRoute path={AreaRoutePath.manager} component={AreaManagerPage} />
      </Switch>
    </Suspense>
  )
}
