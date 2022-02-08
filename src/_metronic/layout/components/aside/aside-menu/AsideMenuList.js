/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { AreaRoutePath } from '../../../../../app/modules/Area/Area.routes'
import { checkIsActive, toAbsoluteUrl } from '../../../../_helpers'
import { useTranslate } from '../../../../../app/hooks/translate'

export function AsideMenuList({ layoutProps }) {
  const profile1 = () => {
    const auth = localStorage.getItem('User') || null
    return auth ? JSON.parse(auth) : null
  }
  const user = profile1();
  const roles = user.roles[0]
  // console.log(roles)

  const location = useLocation()
  const t = useTranslate()
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url) ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open ` : ''
  }
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
  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive('/e-commerce', true)}`}
          aria-haspopup="true"
          data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to="/e-commerce">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Shopping/Bag2.svg')} />
            </span>
            <span className="menu-text">Tác Vụ</span>
          </NavLink>
          <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">Tác Vụ</span>
                </span>
              </li>
              {/*begin::2 Level*/}
              {roles.id === 2 ? (
                <li className={`menu-item ${getMenuItemActive('/shipper')}`} aria-haspopup="true">
                  <NavLink className="menu-link" to="/shipper">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Nhân viên giao hàng</span>
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className={`menu-item ${getMenuItemActive('/customers')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/customers">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Khách hàng</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li className={`menu-item ${getMenuItemActive('/product')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/product">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Sản phẩm</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li className={`menu-item ${getMenuItemActive('/category')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/category">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Danh mục sản phẩm</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li className={`menu-item ${getMenuItemActive('/blogs')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/blogs">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Tin tức</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li className={`menu-item ${getMenuItemActive('/comment')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/comment">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Bình luận</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                  {/*begin::2 Level*/}
                  <li className={`menu-item ${getMenuItemActive('/slides')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/slides">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Slides</span>
                    </NavLink>
                  </li>
                  <li className={`menu-item ${getMenuItemActive('/voucher')}`} aria-haspopup="true">
                    <NavLink className="menu-link menu-toggle" to="/voucher">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Khuyến mãi</span>
                    </NavLink>
                    <div className="menu-submenu">
                      <i className="menu-arrow" />
                      <ul className="menu-subnav">
                        <li className="menu-item menu-item-parent" aria-haspopup="true">
                          <span className="menu-link">
                            <span className="menu-text">Tác Vụ</span>
                          </span>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/voucher/no-active')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/voucher/no-active">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Chưa kích hoạt</span>
                          </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/voucher/active')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/voucher/active">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Đã kích hoạt</span>
                          </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/voucher/trashed')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/voucher/trashed">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Kho lưu trữ</span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className={`menu-item ${getMenuItemActive('/status')}`} aria-haspopup="true">
                    <NavLink className="menu-link menu-toggle " to="/status">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Đơn hàng</span>
                    </NavLink>
                    <div className="menu-submenu">
                      <i className="menu-arrow" />
                      <ul className="menu-subnav">
                        <li className={`menu-item ${getMenuItemActive('/status')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/status">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Cần xử lý</span>
                          </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/status/handing/7/0')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/status/handing/7/0">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Chưa Bàn Giao</span>
                          </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/status/handing/8/1')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/status/handing/8/1">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Đã bàn Giao</span>
                          </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/bill')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/bill">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Hóa đơn momo</span>
                          </NavLink>
                        </li>
                        {/* <li className={`menu-item ${getMenuItemActive('/odertrashed')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/odertrashed">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Kho lưu trữ</span>
                          </NavLink>
                        </li> */}
                      </ul>
                    </div>
                  </li>

                  <li className={`menu-item ${getMenuItemActive('/shipping')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/shipping/default">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Giá ship</span>
                    </NavLink>
                  </li>
                  <li className={`menu-item ${getMenuItemActive('/feedback')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/feedback">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Đánh giá</span>
                    </NavLink>
                  </li>
                  <li className={`menu-item ${getMenuItemActive('/char')}`} aria-haspopup="true">
                    <NavLink className="menu-link menu-toggle" to="/char">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Thống kê</span>
                    </NavLink>
                    <div className="menu-submenu">
                      <i className="menu-arrow" />
                      <ul className="menu-subnav">
                        <li className={`menu-item ${getMenuItemActive('/char')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to={`/char/list/${defaultDate.monthNow}/${defaultDate.yearNow}`}>
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Doanh thu</span>
                          </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/char')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to={`/char/pro`}>
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Số lượng bán ra</span>
                          </NavLink>
                        </li>
                        <li className={`menu-item ${getMenuItemActive('/char')}`} aria-haspopup="true">
                          <NavLink className="menu-link" to="/char/order">
                            <i className="menu-bullet menu-bullet-dot">
                              <span />
                            </i>
                            <span className="menu-text">Số lượng đơn hàng</span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              )
              }
            </ul>
          </div>
        </li>
      </ul>
    </>
  )
}
