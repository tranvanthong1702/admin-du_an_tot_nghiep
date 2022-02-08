import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import VoucherListPage from './pages/VoucherList.page'
import VoucherAdd1Page from './pages/VoucherAdd1.page'
import VoucherAdd2Page from './pages/VoucherAdd2.page'
import VoucherAdd3Page from './pages/VoucherAdd3.page'
import VoucherEditPage from './pages/VoucherEdit.page'
import VoucherViewPage from './pages/VoucherView.page'
import VoucherTrashedPage from './pages/VoucherTrashed.page'
import VoucherActive from './pages/VoucherActive.page'
import VoucherNoActive from './pages/VoucherNoActive.page'
export const VoucherRoutePath = {
    root: '/voucher',
    list: '/voucher/list',
    add1: '/voucher/add1',
    add2: '/voucher/add2',
    add3: '/voucher/add3',
    edit: '/voucher/edit/:id',
    view: '/voucher/view/:id',
    trashed: '/voucher/trashed',
    active: '/voucher/active',
    noactive: '/voucher/no-active'
}

function VoucherRoutes() {
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
                        {<Redirect exact from={VoucherRoutePath.root} to={VoucherRoutePath.noactive} />}
                        <ContentRoute path={VoucherRoutePath.list} component={VoucherListPage} />
                        <ContentRoute path={VoucherRoutePath.add1} component={VoucherAdd1Page} />
                        <ContentRoute path={VoucherRoutePath.add2} component={VoucherAdd2Page} />
                        <ContentRoute path={VoucherRoutePath.add3} component={VoucherAdd3Page} />
                        <ContentRoute path={VoucherRoutePath.edit} component={VoucherEditPage} />
                        <ContentRoute path={VoucherRoutePath.view} component={VoucherViewPage} />
                        <ContentRoute path={VoucherRoutePath.trashed} component={VoucherTrashedPage} />
                        <ContentRoute path={VoucherRoutePath.active} component={VoucherActive} />
                        <ContentRoute path={VoucherRoutePath.noactive} component={VoucherNoActive} />
                    </Switch>
                )
            }
        </Suspense>
    )
}

export default VoucherRoutes
