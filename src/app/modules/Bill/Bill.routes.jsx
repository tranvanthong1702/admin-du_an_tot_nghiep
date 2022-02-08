import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import Bill from './pages/Bill.page'
import DetailOrderBill from './pages/DetailOrderBill.page'
export const BillRoutePath = {
    root: '/bill',
    list: '/bill/list',
    order: '/bill/order/:id'
}


function BillRoutes() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {<Redirect exact from={BillRoutePath.root} to={BillRoutePath.list} />}
                <ContentRoute path={BillRoutePath.list} component={Bill} />
                <ContentRoute path={BillRoutePath.order} component={DetailOrderBill} />

            </Switch>
        </Suspense>
    )
}
export default BillRoutes