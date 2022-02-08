import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import UserListPage from './pages/UserList.page'
import UserUpdatePage from './pages/UserUpdate.page'
import UserAddPage from './pages/UserAdd.page'
export const UserRoutePath = {
    root: '/user',
    add: '/user/add',
    list: '/user/profile/:id',
    edit: '/user/edit/:id'
}

function UserRoutes() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                {<Redirect exact from={UserRoutePath.root} to={UserRoutePath.list} />}
                <ContentRoute path={UserRoutePath.list} component={UserListPage} />
                <ContentRoute path={UserRoutePath.edit} component={UserUpdatePage} />
                <ContentRoute path={UserRoutePath.add} component={UserAddPage} />
            </Switch>
        </Suspense>
    )
}

export default UserRoutes
