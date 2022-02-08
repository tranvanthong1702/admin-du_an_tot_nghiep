import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import ShippingPrice from './page/ShippingPrice.page'


export const ShippingPriceRoutePath = {
  root: '/shipping',
  default: '/shipping/default',
  
}

function ShippingPriceRoutes() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from={ShippingPriceRoutePath.root} to={ShippingPriceRoutePath.default} />}
        <ContentRoute path={ShippingPriceRoutePath.default} component={ShippingPrice} />
      </Switch>
    </Suspense>
  )
}

export default ShippingPriceRoutes
