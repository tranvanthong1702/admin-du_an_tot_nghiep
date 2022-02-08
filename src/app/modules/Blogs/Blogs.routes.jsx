import React, { Suspense } from 'react'
import { ContentRoute, LayoutSplashScreen } from '../../../_metronic/layout'
import { Redirect, Switch } from 'react-router-dom'
import BlogsListPage from './pages/BlogList.page'
import BlogAddPage from './pages/BlogAdd.page'
import BlogsEditPage from './pages/BlogEdit.page'
import BlogTrashedPage from './pages/BlogTrashed.page'

export const BlogRoutePath = {
    root: '/blogs',
    list: '/blogs/list',
    add: '/blogs/add',
    edit: '/blogs/edit/:id',
    trashed: '/blogs/trashed'

}

function BlogsRoutes() {
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
                        {<Redirect exact from={BlogRoutePath.root} to={BlogRoutePath.list} />}
                        <ContentRoute path={BlogRoutePath.list} component={BlogsListPage} />
                        <ContentRoute path={BlogRoutePath.add} component={BlogAddPage} />
                        <ContentRoute path={BlogRoutePath.edit} component={BlogsEditPage} />
                        <ContentRoute path={BlogRoutePath.trashed} component={BlogTrashedPage} />

                    </Switch>
                )}
        </Suspense>
    )
}

export default BlogsRoutes
