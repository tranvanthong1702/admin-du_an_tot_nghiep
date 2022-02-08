import React, { useMemo } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import objectPath from 'object-path'
import { useHtmlClassService } from '../../_core/MetronicLayout'
import { UserProfileDropdown } from './dropdowns/UserProfileDropdown'

export function QuickUserToggler() {
  
  const profile1 = () => {
    const auth = localStorage.getItem('User') || null
    return auth ? JSON.parse(auth) : null
  }
  const user = profile1()
  const uiService = useHtmlClassService()
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, 'extras.user.layout') === 'offcanvas'
    }
  }, [uiService])

  return (
    <>
      {
        user == null ? (
          <div></div>
        ) :
          (
            layoutProps.offcanvas && (
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-user-tooltip">View user</Tooltip>}>
                <div className="topbar-item">
                  <div
                    className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
                    id="kt_quick_user_toggle"
                  >
                    <>
                      <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                      <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                        {user.user_name}
                      </span>
                      <span className="symbol symbol-35 symbol-light-success">
                      </span>
                    </>
                  </div>
                </div>
              </OverlayTrigger>
            )
          )
      }

      {!layoutProps.offcanvas && <UserProfileDropdown />}
    </>
  )
}
