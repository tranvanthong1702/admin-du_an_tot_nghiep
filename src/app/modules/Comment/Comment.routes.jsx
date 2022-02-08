import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import CommentsListPage from './pages/CommentList.page'
import CommentTrashedPage from './pages/CommentTrashed.page'

export const CommentRoutePath = {
  root: '/comment',
  list: '/comment/list',
  trashed: '/comment/trashed'
}

function CommentsRoutes() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from={CommentRoutePath.root} to={CommentRoutePath.list} />}
        <ContentRoute path={CommentRoutePath.list} component={CommentsListPage} />
        <ContentRoute path={CommentRoutePath.trashed} component={CommentTrashedPage} />
      </Switch>
    </Suspense>
  )
}

export default CommentsRoutes
