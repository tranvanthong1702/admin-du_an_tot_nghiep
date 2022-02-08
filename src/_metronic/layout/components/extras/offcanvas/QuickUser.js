/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, { useEffect, useState } from "react";
import SVG from 'react-inlinesvg'
import { useHistory } from 'react-router-dom'
import { useLocation } from "react-router";
import { toAbsoluteUrl } from '../../../../_helpers'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isAuthenticated, logout } from "../offcanvas/index";

export function QuickUser() {
  const { pathname } = useLocation();
  const history = useHistory()
  // const { user } = useSelector((state) => state.auth)
  const profile = () => {
    const auth = localStorage.getItem('ACCESS_TOKEN_KEY') || null
    return auth ? JSON.parse(auth) : null
  }
  const profile1 = () => {
    const auth = localStorage.getItem('User') || null
    return auth ? JSON.parse(auth) : null
  }
  const [isLogged, setIsLogged] = useState(false);
  
  const user = profile()
  const user1 = profile1()
  // console.log(user1, 'user1')
  useEffect(() => {
    isAuthenticated() && setIsLogged(true);


  }, [pathname, isLogged]);
  // const logoutClick = () => {
  //   const toggle = document.getElementById('kt_quick_user_toggle')
  //   if (toggle) {
  //     toggle.click()
  //   }
  //   history.push('/logout')
    
  // }

  return (
    <>
      {user1 ? (
        <div
          id="kt_quick_user"
          className="offcanvas offcanvas-right offcanvas p-10"
        >
          <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
            <a
              href="#"
              className="btn btn-xs btn-icon btn-light btn-hover-primary"
              id="kt_quick_user_close"
            >
              <i className="ki ki-close icon-xs text-muted" />
            </a>
          </div>

          <div className="offcanvas-content pr-5 mr-n5">
            <div className="d-flex align-items-center mt-5">
              <div className="symbol symbol-100 mr-5">
                <div
              className="symbol-label"
              style={{
                backgroundImage: `url(${user1.avatar ||
                  toAbsoluteUrl('/media/users/default.jpg')})`
              }}
            />
                <i className="symbol-badge bg-success" />
              </div>
              <div className="d-flex flex-column">
                <a
                  href="#"
                  className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
                >
                  {user1.user_name}
                </a>
                <div className="navi mt-2">
                  <a href="#" className="navi-item">
                    <span className="navi-link p-0 pb-2">
                      <span className="navi-icon mr-1">
                        <span className="svg-icon-lg svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              '/media/svg/icons/Communication/Mail-notification.svg'
                            )}
                          ></SVG>
                        </span>
                      </span>
                      <span className="navi-text text-muted text-hover-primary">
                        {user1.email}
                      </span>
                    </span>
                  </a>
                </div>
                {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
                <button
                  className="btn btn-light-primary btn-bold"
                  onClick={() =>
                    logout(() => {
                      setIsLogged(false);
                      
                    })
                  }
                >
                  Sign out
                </button>
              </div>
            </div>

            <div className="separator separator-dashed mt-8 mb-5" />

            <div className="navi navi-spacer-x-0 p-0">
              <Link to={`/user/profile/${user1.id}`} className="navi-item">
                <div className="navi-link">
                  <div className="symbol symbol-40 bg-light mr-3">
                    <div className="symbol-label">
                      <span className="svg-icon svg-icon-md svg-icon-success">
                        <SVG
                          src={toAbsoluteUrl(
                            '/media/svg/icons/General/Notification2.svg'
                          )}
                        ></SVG>
                      </span>
                    </div>
                  </div>
                  <div className="navi-text">
                    <div className="font-weight-bold">My Profile</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )
      }
    </>
  )
}
