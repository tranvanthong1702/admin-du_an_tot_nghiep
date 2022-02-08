import React, { Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { ContentRoute, LayoutSplashScreen } from '../_metronic/layout'
import { GeneratePermission } from './pages/GeneratePermisson'
import { MyPage } from './pages/MyPage'
import { DashboardPage } from './pages/DashboardPage'
import AreaRoutes, { AreaRoutePath } from './modules/Area/Area.routes'
import ProductsRoutes, { ProductRoutePath } from './modules/Products/Products.routes'

import CategoriesRoutes, { CategoryRoutePath } from './modules/Categories/Category.routes'
import BlogsRoutes, { BlogRoutePath } from './modules/Blogs/Blogs.routes'
import SlideRoutes, { SlideRoutePath } from './modules/Slide/Slide.routes'
import CustomerRoutes, { CustomerRoutePath } from './modules/Customer/Customer.routes'
import UserRoutes, { UserRoutePath } from './modules/User/User.routes'
import VoucherRoutes, { VoucherRoutePath } from './modules/Voucher/Voucher.routes'
import OderStatusRoutes, { OderStatusRoutePath } from './modules/OderStatus/OderStatus.routes'
import ShipperOderRoutes, { ShipperOderRoutePath } from './modules/Shipper/Shipper.routes'
import BillRoutes, { BillRoutePath } from './modules/Bill/Bill.routes'
import ShippingPriceRoutes, { ShippingPriceRoutePath } from './modules/ShippingPrice/ShippingPrice.routes'
import CharRoutes, { CharRoutePath } from './modules/Char/Chars.routes'
import CommentsRoutes, { CommentRoutePath } from './modules/Comment/Comment.routes'

import Notify from './components/global/notify/notify'
import FeedbacksRoutes, { FeedbackRoutePath } from './modules/Feedback/Feedback.routes'

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Notify />
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from='/' to='/dashboard' />
        }
        <ContentRoute path={AreaRoutePath.root} component={AreaRoutes} />
        <ContentRoute path={ProductRoutePath.root} component={ProductsRoutes} />
        <ContentRoute path={CategoryRoutePath.root} component={CategoriesRoutes} />
        <ContentRoute path={BlogRoutePath.root} component={BlogsRoutes} />
        <ContentRoute path={SlideRoutePath.root} component={SlideRoutes} />
        <ContentRoute path={CustomerRoutePath.root} component={CustomerRoutes} />
        <ContentRoute path={UserRoutePath.root} component={UserRoutes} />
        <ContentRoute path={VoucherRoutePath.root} component={VoucherRoutes} />
        <ContentRoute path={OderStatusRoutePath.root} component={OderStatusRoutes} />
        <ContentRoute path={ShipperOderRoutePath.root} component={ShipperOderRoutes} />
        <ContentRoute path={BillRoutePath.root} component={BillRoutes} />
        <ContentRoute path={ShippingPriceRoutePath.root} component={ShippingPriceRoutes} />
        <ContentRoute path={CharRoutePath.root} component={CharRoutes} />
        <ContentRoute path={CommentRoutePath.root} component={CommentsRoutes} />
        <ContentRoute path={FeedbackRoutePath.root} component={FeedbacksRoutes} />
        <ContentRoute path='/dashboard' component={DashboardPage} />

        <ContentRoute
          path='/generate-permission'
          component={GeneratePermission}
        />
        <ContentRoute path='/my-page' component={MyPage} />
        <Redirect to='error/error-v1' />
      </Switch>
    </Suspense>
  )
}
