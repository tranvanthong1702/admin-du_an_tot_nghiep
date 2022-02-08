import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import ShipperOder from './page/ShipperOder.page'
import ShipperProgress from './page/ShipperProgress.page'
import ShipperOver from './page/ShipperOver.page'

export const ShipperOderRoutePath = {
  root: '/shipper',
  default: 'shipper/3',
  process: '/shipper/:id',
}

function ShipperOderRoutes() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from={ShipperOderRoutePath.root} to={ShipperOderRoutePath.default} />}
        <ContentRoute path={ShipperOderRoutePath.process} component={ShipperOder} />
      </Switch>
    </Suspense>
  )
}

export default ShipperOderRoutes
