import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import CharPage from './pages/CharList.page'
import CharPro from './pages/CharPro.page'
import CharOrder from './pages/CharOrder.page'
import CharProDay from './pages/CharProDay.page'
import CharProMonth from './pages/CharProMonth.page'
import CharProYear from './pages/CharProYear.page'
const start = Date.now()
const convertDate = (data) => {
  const date = new Date(data)
  const newData = {
    dateNow: date.getDate(),
    monthNow: date.getMonth() + 1,
    yearNow: date.getFullYear()
  }
  return newData
}
const defaultDate = convertDate(start)
export const CharRoutePath = {
  root: '/char',
  default: `/char/list/${defaultDate.monthNow}/${defaultDate.yearNow}`,
  pro: `/char/pro`,
  proday: `/char/pro/day`,
  promonth: `/char/pro/month`,
  proyear: `/char/pro/year`,
  order: '/char/order',
  list: '/char/:status/:month/:year',
}
function CharRoutes() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      {<Redirect exact from={CharRoutePath.root} to={CharRoutePath.default} />}
      <ContentRoute path={CharRoutePath.list} component={CharPage} />
      <ContentRoute exact path={CharRoutePath.pro} component={CharPro} />
      <ContentRoute path={CharRoutePath.order} component={CharOrder} />
      <ContentRoute exact path={CharRoutePath.proday} component={CharProDay} />
      <ContentRoute exact path={CharRoutePath.promonth} component={CharProMonth} />
      <ContentRoute exact path={CharRoutePath.proyear} component={CharProYear} />
    </Suspense>
  )
}

export default CharRoutes
