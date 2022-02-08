import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import CategoriesListPage from './pages/CategoriesList.page'
import CategoryAddPage from './pages/CategoryAdd.page'
import CategoryEditPage from './pages/CategoryEdit.page'
import CategoryTrashedPage from './pages/CategoryTrashed.page'
import CategoryDetailPage from './pages/CategoryDetail.page'

export const CategoryRoutePath = {
  root: '/category',
  list: '/category/list',
  add: '/category/add',
  edit: '/category/edit/:id',
  trashed: '/category/trashed',
  detail: '/category/detail/:id'
}

function CategoriesRoutes() {
  const profile1 = () => {
    const auth = localStorage.getItem('User') || null
    return auth ? JSON.parse(auth) : null
  }
  const user = profile1();
  const roles = user.roles[0]
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      {
        roles.id != 1 ? (
          window.location.href = '/dashboard'
        ) : (
          <Switch>
            {<Redirect exact from={CategoryRoutePath.root} to={CategoryRoutePath.list} />}
            <ContentRoute path={CategoryRoutePath.list} component={CategoriesListPage} />
            <ContentRoute path={CategoryRoutePath.add} component={CategoryAddPage} />
            <ContentRoute path={CategoryRoutePath.edit} component={CategoryEditPage} />
            <ContentRoute path={CategoryRoutePath.trashed} component={CategoryTrashedPage} />
            <ContentRoute path={CategoryRoutePath.detail} component={CategoryDetailPage} />
          </Switch>
        )
      }
    </Suspense>
  )
}

export default CategoriesRoutes
