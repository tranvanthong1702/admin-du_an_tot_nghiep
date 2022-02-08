import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import FeedbackListPage from './pages/FeedbackList.page'
import FeedbackAnalyticsPage from './pages/FeedbackAnalytics.page'
import FeedbackMonth from './pages/FeedbackMonth.page'
import FeedbackYear from './pages/FeedbackYear.page'

export const FeedbackRoutePath = {
  root: '/feedback',
  list: '/feedback/list',
  analytic: '/feedback/analytics',
  analyticmonth: '/feedback/analytics/month',
  analyticyear: '/feedback/analytics/year'

}
function FeedbacksRoutes() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from={FeedbackRoutePath.root} to={FeedbackRoutePath.list} />}
        <ContentRoute path={FeedbackRoutePath.list} component={FeedbackListPage} />
        <ContentRoute path={FeedbackRoutePath.analytic} component={FeedbackAnalyticsPage} />
        <ContentRoute path={FeedbackRoutePath.analyticmonth} component={FeedbackMonth} />
        <ContentRoute path={FeedbackRoutePath.analyticyear} component={FeedbackYear} />
      </Switch>
    </Suspense>
  )
}

export default FeedbacksRoutes
