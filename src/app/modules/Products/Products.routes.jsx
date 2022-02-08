import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import ProductsListPage from './pages/ProductsList.page'
import ProductAddPage from './pages/ProductAdd.page'
import ProductEditPage from './pages/ProductEdit.page'
import ProductTrashedPage from './pages/ProductTrashed.page'
import ProductsDetailPage from './pages/ProductDetail.page'

export const ProductRoutePath = {
  root: '/product',
  list: '/product/list',
  add: '/product/add',
  edit: '/product/edit/:id',
  detail: '/product/detail/:id',
  trashed: '/product/trashed'
}

function ProductsRoutes() {
  const profile1 = () => {
    const auth = localStorage.getItem('User') || null
    return auth ? JSON.parse(auth) : null
  }
  const user = profile1()
  const roles = user.roles[0]
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      {roles.id != 1 ? (
        (window.location.href = '/dashboard')
      ) : (
        <Switch>
          {<Redirect exact from={ProductRoutePath.root} to={ProductRoutePath.list} />}
          <ContentRoute path={ProductRoutePath.list} component={ProductsListPage} />
          <ContentRoute path={ProductRoutePath.add} component={ProductAddPage} />
          <ContentRoute path={ProductRoutePath.edit} component={ProductEditPage} />
          <ContentRoute path={ProductRoutePath.detail} component={ProductsDetailPage} />
          <ContentRoute path={ProductRoutePath.trashed} component={ProductTrashedPage} />
        </Switch>
      )}
    </Suspense>
  )
}

export default ProductsRoutes
