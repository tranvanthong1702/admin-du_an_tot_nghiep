import { Skeleton } from '@material-ui/lab'
import moment from 'moment'
import React, { ReactElement } from 'react'
import { Dropdown, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { SHOW_MODAL_TYPE } from '../constants/area.constant'
import currencyFormat from '../../../../helpers/curreny.helper'
import { Link } from 'react-router-dom'
import { AreaRoutePath } from '../Area.routes'
import { Area } from '../../../interfaces/models/Area'
import MembersSymbolComponent from '../../../components/extra/MembersSymbol.component'
import { useTranslate } from '../../../hooks/translate'
import { get } from 'lodash'

interface PropsInterface {
  area: Area | undefined
  setShowModal(area: Area, type: string): void
}

function AreaItem(props: PropsInterface): ReactElement {
  const t = useTranslate()
  const { area, setShowModal } = props
  const members = get(area, 'members', [])
  return (
    <div className="col-xl-6">
      <div className="card card-custom gutter-b card-stretch">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 mr-4 symbol symbol-65">
              {area ? (
                <img
                  src={area.thumbnail || toAbsoluteUrl('media/images/default/icons8-image-100-6.png')}
                  alt={area.name}
                />
              ) : (
                <Skeleton animation="pulse" variant="rect" width={65} height={65} />
              )}
            </div>
            {area ? (
              <div className="d-flex flex-column mr-auto">
                <h5 className="card-title font-weight-bolder font-size-h5 text-dark mb-1">
                  {area.name}
                  {area.progress < 100 ? (
                    <i className="flaticon2-correct text-success icon-md ml-2" />
                  ) : (
                    <i className="flaticon-alert-1 text-danger icon-md ml-2" />
                  )}
                </h5>
                <span className="text-muted font-weight-bold">{t(area.isOwner ? 'Owner' : 'Member')}</span>
              </div>
            ) : (
              <div className="d-flex flex-column mr-auto">
                <Skeleton
                  variant="text"
                  className="card-title text-hover-primary font-weight-bolder font-size-h5 text-dark mb-1"
                  width={120}
                  height={42.88}
                />
                <Skeleton variant="text" className="text-muted font-weight-bold" width={120} height={19} />
              </div>
            )}
            {area && (
              <div className="card-toolbar mb-auto">
                <Dropdown className="dropdown-inline">
                  <OverlayTrigger
                    delay={300}
                    placement="left"
                    overlay={<Tooltip id={`area-quick-action-${area._id}`}>{t('Quick action')}</Tooltip>}
                  >
                    <Dropdown.Toggle
                      id={`show-more-${area._id}`}
                      bsPrefix="dropdown-inline"
                      as="button"
                      className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                    >
                      <i className="ki ki-bold-more-hor" />
                    </Dropdown.Toggle>
                  </OverlayTrigger>
                  <Dropdown.Menu className="dropdown-menu-sm dropdown-menu-right">
                    <ul className="navi navi-hover">
                      <Dropdown.Item className="navi-header pb-1" as="button">
                        <span className="text-primary text-uppercase font-weight-bold font-size-sm">
                          {t('Quick action')}:
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item className="navi-separator my-3" />
                      <Dropdown.Item className="navi-item" as="button">
                        <div
                          className="navi-link"
                          onClick={() => {
                            setShowModal(area, SHOW_MODAL_TYPE.FORM)
                          }}
                        >
                          <span className="navi-icon">
                            <i className="flaticon2-pen" />
                          </span>
                          <span className="navi-text">{t('Edit')}</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="navi-item" as="button">
                        <div className="navi-link">
                          <span className="navi-icon">
                            <i className="flaticon-users" />
                          </span>
                          <span className="navi-text">{t('Members')}</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="navi-item" as="button">
                        <div className="navi-link">
                          <span className="navi-icon">
                            <i className="flaticon2-copy" />
                          </span>
                          <span className="navi-text">{t('Get token')}</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="navi-item" as="button">
                        <div
                          className="navi-link"
                          onClick={() => {
                            setShowModal(area, SHOW_MODAL_TYPE.ARCHIVE)
                          }}
                        >
                          <span className="navi-icon">
                            <i className="flaticon2-delivery-package" />
                          </span>
                          <span className="navi-text">{t(area.archive ? 'Un archive' : 'Archive')}</span>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="navi-separator my-3" />
                      <Dropdown.Item className="navi-item" as="button">
                        <div
                          className="navi-link"
                          onClick={() => {
                            setShowModal(area, SHOW_MODAL_TYPE.DELETE)
                          }}
                        >
                          <span className="navi-icon">
                            <i className="flaticon-delete" />
                          </span>
                          <span className="navi-text">{t('Delete')}</span>
                        </div>
                      </Dropdown.Item>
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
          <div className="d-flex flex-wrap mt-14">
            {area ? (
              <div className="mr-12 d-flex flex-column mb-7">
                <span className="d-block font-weight-bold mb-4">{t('Start date')}</span>
                <span className="btn btn-light-primary btn-sm font-weight-bold btn-upper btn-text">
                  {moment(area.currentPackage.createdAt).format('DD/MM/YYYY')}
                </span>
              </div>
            ) : (
              <div className="mr-12 d-flex flex-column mb-7">
                <Skeleton variant="text" animation="wave" className="d-block font-weight-bold mb-4" width={89} />
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="btn btn-light-primary btn-sm font-weight-bold btn-upper btn-text"
                  width={89}
                  height={32.28}
                />
              </div>
            )}
            {area ? (
              <div className="mr-12 d-flex flex-column mb-7">
                <span className="d-block font-weight-bold mb-4">{t('Due date')}</span>
                <span className="btn btn-light-danger btn-sm font-weight-bold btn-upper btn-text">
                  {moment(area.currentPackage.expireAt).format('DD/MM/YYYY')}
                </span>
              </div>
            ) : (
              <div className="mr-12 d-flex flex-column mb-7">
                <Skeleton variant="text" animation="wave" className="d-block font-weight-bold mb-4" width={89} />
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="btn btn-light-danger btn-sm font-weight-bold btn-upper btn-text"
                  width={89}
                  height={32.28}
                />
              </div>
            )}
            {area ? (
              <div className="flex-row-fluid mb-7">
                <span className="d-block font-weight-bold mb-4">{t('Progress')}</span>
                <div className="d-flex align-items-center pt-2">
                  <div className="progress progress-xs mt-2 mb-2 w-100">
                    <ProgressBar
                      className={`progress-bar ${area.progress < 100 ? 'bg-success' : 'bg-danger'}`}
                      style={{
                        width: `${area.progress}%`
                      }}
                      now={area.progress}
                      animated
                      min={0}
                      max={100}
                    />
                  </div>
                  <span className="ml-3 font-weight-bolder">{area.progress.toFixed(2)}%</span>
                </div>
              </div>
            ) : (
              <div className="flex-row-fluid mb-7">
                <Skeleton variant="text" animation="wave" className="d-block font-weight-bold mb-4" />
                <Skeleton variant="rect" animation="wave" className="d-flex align-items-center pt-2" />
              </div>
            )}
          </div>
          {area ? (
            <p className="mb-7 mt-3">{area.description}</p>
          ) : (
            <Skeleton variant="text" animation="wave" className="mb-7 mt-3" />
          )}
          <div className="d-flex flex-wrap">
            {area && area.isOwner ? (
              <div className="mr-12 d-flex flex-column mb-7">
                <span className="font-weight-bolder mb-4">{t('Month budget')}</span>
                <span className="font-weight-bolder font-size-h5 pt-1">
                  <span className="font-weight-bold text-dark-75">{currencyFormat(500)}</span>
                </span>
              </div>
            ) : (
              <div className="mr-12 d-flex flex-column mb-7">
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="font-weight-bolder mb-4"
                  width={76.41}
                  height={19}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="font-weight-bolder font-size-h5 pt-1"
                  width={76.41}
                  height={27.25}
                />
              </div>
            )}
            <div className="d-flex flex-column flex-lg-fill float-left mb-7">
              {area ? (
                <span className="font-weight-bolder mb-4">{t('Members')}</span>
              ) : (
                <Skeleton variant="text" className="font-weight-bolder mb-4" />
              )}
              <MembersSymbolComponent members={members} limit={5} />
            </div>
          </div>
        </div>
        <div className="card-footer d-flex align-items-center">
          <div className="d-flex">
            <div className="d-flex align-items-center mr-3">
              <span className="svg-icon svg-icon-gray-500">
                <SVG src={toAbsoluteUrl('media/svg/icons/Text/Bullet-list.svg')} />
              </span>
              {area ? (
                <Link to="#" className="font-weight-bolder text-primary ml-2">
                  72 Tasks
                </Link>
              ) : (
                <Skeleton variant="text" animation="wave" className="font-weight-bolder text-primary ml-2" width={90} />
              )}
            </div>
            <div className="d-flex align-items-center mr-3">
              <span className="svg-icon svg-icon-gray-500">
                <SVG src={toAbsoluteUrl('media/svg/icons/Communication/Group-chat.svg')} />
              </span>
              {area ? (
                <Link to="#" className="font-weight-bolder text-primary ml-2">
                  648 Comments
                </Link>
              ) : (
                <Skeleton variant="text" animation="wave" className="font-weight-bolder text-primary ml-2" width={90} />
              )}
            </div>
          </div>
          {area ? (
            <Link
              to={area.isOwner ? AreaRoutePath.toManager(area._id) : AreaRoutePath.toAccess(area._id)}
              className={`btn ${
                area.isOwner ? 'btn-primary' : 'btn-warning'
              } btn-sm d-flex align-items-center text-uppercase font-weight-bolder mt-5 mt-sm-0 mr-auto mr-sm-0 ml-sm-auto`}
            >
              {t(area.isOwner ? 'Manager' : 'Access')}
            </Link>
          ) : (
            <Skeleton
              variant="rect"
              animation="wave"
              width={60.92}
              height={32.28}
              className="btn-light-primary btn-sm d-flex align-items-center mt-5 mt-sm-0 mr-auto mr-sm-0 ml-sm-auto"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AreaItem
