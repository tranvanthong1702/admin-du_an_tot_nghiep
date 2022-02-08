import React, { Suspense,useEffect, useState } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import SlideListPage from './pages/SlideList.page'
import SlideAddPage from './pages/SlideAdd.page'
import SlideEditPage from './pages/SlideEdit.page'


export const SlideRoutePath = {
    root: '/slides',
    list: '/slides/list',
    add: '/slides/add',
    edit: '/slides/edit/:id'
}


function SlideRoutes() {
    const profile1 = () => {
        const auth = localStorage.getItem('User') || null
        return auth ? JSON.parse(auth) : null
    }
    const user = profile1();
    const roles = user.roles[0]
    // let confirm = window.confirm(`Bạn không có quyền truy cập vào đây !Hãy liên hệ quản trị viên để biết thêm chi tiết`),
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            {
                roles.id != 1 ? (
                    window.location.href = '/dashboard'
                ) : (
                    <Switch>
                        {<Redirect exact from={SlideRoutePath.root} to={SlideRoutePath.list} />}
                        <ContentRoute path={SlideRoutePath.list} component={SlideListPage} />
                        <ContentRoute path={SlideRoutePath.add} component={SlideAddPage} />
                        <ContentRoute path={SlideRoutePath.edit} component={SlideEditPage} />
                    </Switch>
                )
            }

        </Suspense>
    )
}

export default SlideRoutes
