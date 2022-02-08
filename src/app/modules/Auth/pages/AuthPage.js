/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, Redirect, Switch } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { ContentRoute } from '../../../../_metronic/layout'
import Login from './Login'
import Registration from './Registration'
import ForgotPassword from './ForgotPassword'
import '../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss'
import { useTranslate } from '../../../hooks/translate'

export function AuthPage() {
  const t = useTranslate()
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(https://i.pinimg.com/originals/08/0f/0c/080f0ce7b592d262f4941531af2f1bfc.jpg)`
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5">
                <img alt="Logo" className="max-h-70px" src="https://i.pinimg.com/originals/83/b7/ad/83b7ad65a07dd75181dece8a70d95404.jpg" />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-cts text-center">Welcome to MarkVeget!</h3>
                {/* <p className="font-weight-lighter text-white opacity-80">
                  The ultimate Bootstrap & React 16 admin theme framework for next generation web apps.
                </p> */}
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">&copy; 2021 MarkVeget</div>
                <div className="d-flex">
                  <Link to="/terms" className="text-white">
                    {t('Privacy')}
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    {t('Legal')}
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    {t('Contact')}
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            {/*begin::Content header*/}
            {/* <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              <span className="font-weight-bold text-dark-50">{t("Don't have an account?")}</span>
              <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">
                {t('Sign Up')}
              </Link>
            </div> */}
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute path="/auth/registration" component={Registration} />
                <ContentRoute path="/auth/forgot-password" component={ForgotPassword} />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">&copy; 2020 Metronic</div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link to="/terms" className="text-dark-75 text-hover-primary ml-4">
                  Legal
                </Link>
                <Link to="/terms" className="text-dark-75 text-hover-primary ml-4">
                  Contact
                </Link>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  )
}
