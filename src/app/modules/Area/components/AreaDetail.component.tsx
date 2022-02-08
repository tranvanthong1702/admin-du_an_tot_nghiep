import React, { ReactElement } from 'react'
import { Dropdown, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { Skeleton } from '@material-ui/lab'
import SVG from 'react-inlinesvg'
import { DateHelper } from '../../../../helpers/date.helper'
import moment from 'moment'
import { SHOW_MODAL_TYPE } from '../constants/area.constant'
import { Link } from 'react-router-dom'
import MembersSymbolComponent from '../../../components/extra/MembersSymbol.component'
import { Area } from '../../../interfaces/models/Area'
import { User } from '../../../interfaces/models/User'
import { useTranslate } from '../../../hooks/translate'

interface PropsInterface {
  area: Area | null
  members: User[]
  setShowModal(type: string): void
}

function AreaDetailComponent(props: PropsInterface): ReactElement {
  const { area, setShowModal, members } = props
  const t = useTranslate()
  const getProgress = () => {
    if (!area) {
      return 0
    }
    return DateHelper.progress(area.currentPackage.createdAt, area.currentPackage.expireAt)
  }
  return (
    <div className="card card-custom gutter-b">
      <div className="card-body">
        <div className="d-flex">
          {/*begin: Pic*/}
          <div className="flex-shrink-0 mr-7 mt-lg-0 mt-3">
            <div className="symbol symbol-50 symbol-lg-120">
              {area ? (
                <img
                  alt={area.name}
                  src={area.thumbnail || toAbsoluteUrl('media/images/default/icons8-image-100-6.png')}
                />
              ) : (
                <Skeleton animation="pulse" variant="rect" width={120} height={120} />
              )}
            </div>
            <div className="symbol symbol-50 symbol-lg-120 symbol-primary d-none">
              <span className="font-size-h3 symbol-label font-weight-boldest">JM</span>
            </div>
          </div>
          {/*end: Pic*/}
          {/*begin: Info*/}
          <div className="flex-grow-1">
            {/*begin: Title*/}
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="mr-3">
                {/*begin::Name*/}
                {area ? (
                  <h5 className="d-flex align-items-center text-dark font-size-h5 font-weight-bold mr-3">
                    {area.name}
                    <i className="flaticon2-correct text-success icon-md ml-2" />
                  </h5>
                ) : (
                  <Skeleton
                    variant="text"
                    className="d-flex align-items-center text-dark text-hover-primary font-size-h5 font-weight-bold mr-3"
                    width={411.22}
                    height={24}
                  />
                )}
                {/*end::Name*/}
                {/*begin::Contacts*/}
                {area ? (
                  <div className="d-flex flex-wrap my-2">
                    <a
                      href={`mailto::${area.owner.email}`}
                      className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                    >
                      <span className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                        <SVG src={toAbsoluteUrl('media/svg/icons/Communication/Mail-notification.svg')} />
                      </span>
                      {area.owner.email}
                    </a>
                    <Link to="#" className="text-muted text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2">
                      <span className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                        <SVG src={toAbsoluteUrl('media/svg/icons/General/Lock.svg')} />
                      </span>
                      PR Manager
                    </Link>
                    <Link to="#" className="text-muted text-hover-primary font-weight-bold">
                      <span className="svg-icon svg-icon-md svg-icon-gray-500 mr-1">
                        <SVG src={toAbsoluteUrl('media/svg/icons/Map/Marker2.svg')} />
                      </span>
                      Melbourne
                    </Link>
                  </div>
                ) : (
                  <Skeleton variant="text" className="d-flex flex-wrap my-2" width={420.97} height={20.17} />
                )}
                {/*end::Contacts*/}
              </div>
              {area && (
                <div className="my-lg-0 my-1">
                  <Link to="#" className="btn btn-sm btn-light-success font-weight-bolder text-uppercase mr-3">
                    Reports
                  </Link>
                  <Link to="#" className="btn btn-sm btn-info font-weight-bolder text-uppercase mr-3">
                    New Task
                  </Link>
                  <Dropdown className="dropdown-inline">
                    <OverlayTrigger
                      delay={300}
                      placement="left"
                      overlay={<Tooltip id={`area-quick-action-${area._id}`}>{t('Quick action')}</Tooltip>}
                    >
                      <Dropdown.Toggle
                        id="show-more"
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
                              setShowModal(SHOW_MODAL_TYPE.FORM)
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
                              setShowModal(SHOW_MODAL_TYPE.ARCHIVE)
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
                              setShowModal(SHOW_MODAL_TYPE.DELETE)
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
            {/*end: Title*/}
            {/*begin: Content*/}
            <div className="d-flex align-items-center flex-wrap justify-content-between">
              {area ? (
                <div className="flex-grow-1 font-weight-bold text-dark-50 py-5 py-lg-2 mr-5">{area.description}</div>
              ) : (
                <Skeleton
                  variant="text"
                  className="flex-grow-1 font-weight-bold text-dark-50 py-5 py-lg-2 mr-5"
                  width={816.5}
                  height={51}
                />
              )}
              {area ? (
                <div className="d-flex flex-wrap align-items-center py-2">
                  <div className="d-flex align-items-center mr-10">
                    <div className="mr-6">
                      <div className="font-weight-bold mb-2">{t('Start date')}</div>
                      <span className="btn btn-sm btn-text btn-light-primary text-uppercase font-weight-bold">
                        {moment(area.currentPackage.createdAt).format('DD/MM/YYYY')}
                      </span>
                    </div>
                    <div>
                      <div className="font-weight-bold mb-2">{t('Due date')}</div>
                      <span className="btn btn-sm btn-text btn-light-danger text-uppercase font-weight-bold">
                        {moment(area.currentPackage.expireAt).format('DD/MM/YYYY')}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 flex-shrink-0 w-150px w-xl-300px mt-4 mt-sm-0">
                    <span className="font-weight-bold">{t('Progress')}</span>
                    <div className="progress progress-xs mt-2 mb-2">
                      <ProgressBar
                        className={`progress-bar ${getProgress() < 100 ? 'bg-success' : 'bg-danger'}`}
                        style={{
                          width: `${getProgress()}%`
                        }}
                        now={getProgress()}
                        animated
                        min={0}
                        max={100}
                      />
                    </div>
                    <span className="font-weight-bolder text-dark">{getProgress().toFixed(2)}%</span>
                  </div>
                </div>
              ) : (
                <Skeleton
                  variant="rect"
                  className="d-flex flex-wrap align-items-center py-2"
                  width={550.64}
                  height={70.78}
                />
              )}
            </div>
            {/*end: Content*/}
          </div>
          {/*end: Info*/}
        </div>
        <div className="separator separator-solid my-7" />
        {/*begin: Items*/}
        {area ? (
          <div className="d-flex align-items-center flex-wrap">
            {/*begin: Item*/}
            <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
              <span className="mr-4">
                <i className="flaticon-piggy-bank icon-2x text-muted font-weight-bold" />
              </span>
              <div className="d-flex flex-column text-dark-75">
                <span className="font-weight-bolder font-size-sm">Earnings</span>
                <span className="font-weight-bolder font-size-h5">
                  <span className="text-dark-50 font-weight-bold">$</span>
                  249,500
                </span>
              </div>
            </div>
            {/*end: Item*/}
            {/*begin: Item*/}
            <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
              <span className="mr-4">
                <i className="flaticon-confetti icon-2x text-muted font-weight-bold" />
              </span>
              <div className="d-flex flex-column text-dark-75">
                <span className="font-weight-bolder font-size-sm">Expenses</span>
                <span className="font-weight-bolder font-size-h5">
                  <span className="text-dark-50 font-weight-bold">$</span>
                  164,700
                </span>
              </div>
            </div>
            {/*end: Item*/}
            {/*begin: Item*/}
            <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
              <span className="mr-4">
                <i className="flaticon-pie-chart icon-2x text-muted font-weight-bold" />
              </span>
              <div className="d-flex flex-column text-dark-75">
                <span className="font-weight-bolder font-size-sm">Net</span>
                <span className="font-weight-bolder font-size-h5">
                  <span className="text-dark-50 font-weight-bold">$</span>
                  782,300
                </span>
              </div>
            </div>
            {/*end: Item*/}
            {/*begin: Item*/}
            <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
              <span className="mr-4">
                <i className="flaticon-file-2 icon-2x text-muted font-weight-bold" />
              </span>
              <div className="d-flex flex-column flex-lg-fill">
                <span className="text-dark-75 font-weight-bolder font-size-sm">73 Tasks</span>
                <a href="/" className="text-primary font-weight-bolder">
                  View
                </a>
              </div>
            </div>
            {/*end: Item*/}
            {/*begin: Item*/}
            <div className="d-flex align-items-center flex-lg-fill mr-5 my-1">
              <span className="mr-4">
                <i className="flaticon-chat-1 icon-2x text-muted font-weight-bold" />
              </span>
              <div className="d-flex flex-column">
                <span className="text-dark-75 font-weight-bolder font-size-sm">648 Comments</span>
                <a href="/" className="text-primary font-weight-bolder">
                  View
                </a>
              </div>
            </div>
            {/*end: Item*/}
            {/*begin: Item*/}
            <div className="d-flex align-items-center flex-lg-fill my-1">
              <span className="mr-4">
                <i className="flaticon-network icon-2x text-muted font-weight-bold" />
              </span>
              <MembersSymbolComponent limit={5} members={members} />
            </div>
            {/*end: Item*/}
          </div>
        ) : (
          <Skeleton variant="rect" className="d-flex align-items-center flex-wrap" width={975.5} height={48.5} />
        )}
        {/*begin: Items*/}
      </div>
    </div>
  )
}

export default AreaDetailComponent
