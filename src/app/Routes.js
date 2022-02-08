/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { Layout } from '../_metronic/layout'
import BasePage from './BasePage'
import { AuthPage, Logout } from './modules/Auth'
import ErrorsPage from './modules/ErrorsExamples/ErrorsPage'

export function Routes() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  )
  const profile = () => {
    const auth = localStorage.getItem('ACCESS_TOKEN_KEY') || null
    return auth ? JSON.parse(auth) : null
  }
  const user = profile()

  return (
    <Switch>
      {!user ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from='/auth' to='/' />
      )}

      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />

      {!user ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to='/auth/login' />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  )
}
