import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import CustomerListPage from './pages/CustomerList.page'
import CustomerTrashedPage from './pages/CustomerTrashed.page'
import ProfilePage from './pages/Profile.page'
import DisablePage from './pages/Disable.page'
import CustomerViewPage from './pages/CustomerView.page'
export const CustomerRoutePath = {
    root: '/customers',
    list: '/customers/list',
    trashed: '/customers/trashed',
    edit: '/customers/edit/:id',
    view: '/customers/view/:id'
}

function CustomerRoutes() {
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
                        {<Redirect exact from={CustomerRoutePath.root} to={CustomerRoutePath.list} />}
                        <ContentRoute path={CustomerRoutePath.list} component={CustomerListPage} />
                        <ContentRoute path={CustomerRoutePath.trashed} component={CustomerTrashedPage} />
                        <ContentRoute path={CustomerRoutePath.edit} component={DisablePage} />
                        <ContentRoute path={CustomerRoutePath.view} component={CustomerViewPage} />
                    </Switch>
                )}
        </Suspense>
    )
}

export default CustomerRoutes
