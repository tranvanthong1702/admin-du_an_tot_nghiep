import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import NoProcess from './page/NoProcess.page'
import ViewOder from './page/ViewOder.page'
import ViewHanding from './components/ViewHanding'
import filterStatus from './components/filterStatus'
export const OderStatusRoutePath = {
  root: '/status',
  default: '/status/1',
  process: '/status/:id',
  detail: '/status/view/:idProcess/:idOrder',
  handing: '/status/handing/:id/:idHand',
}

function OderStatusRoutes() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from={OderStatusRoutePath.root} to={OderStatusRoutePath.default} />}
        <ContentRoute path={OderStatusRoutePath.process} exact component={NoProcess} />
        <ContentRoute path={OderStatusRoutePath.detail} exact component={ViewOder} />
        <ContentRoute path={OderStatusRoutePath.handing} exact component={ViewHanding} />
        <ContentRoute path={OderStatusRoutePath.handing} exact component={filterStatus} />
      </Switch>
    </Suspense>
  )
}

export default OderStatusRoutes
