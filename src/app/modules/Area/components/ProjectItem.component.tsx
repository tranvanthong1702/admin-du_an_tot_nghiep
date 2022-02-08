import React, { ReactElement } from 'react'
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { useTranslate } from '../../../hooks/translate'

interface PropsInterface {
  project: any
}

export default function ProjectItemComponent(props: PropsInterface): ReactElement {
  const t = useTranslate()
  const { project } = props
  return (
    <div className="card card-custom gutter-b card-stretch">
      {/*begin::Body*/}
      <div className="card-body pt-4">
        {/*begin::Toolbar*/}
        <div className="d-flex justify-content-end">
          <Dropdown className="dropdown-inline">
            <OverlayTrigger
              delay={300}
              placement="left"
              overlay={<Tooltip id={`area-quick-action-${project._id}`}>{t('Quick action')}</Tooltip>}
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
                      // setShowModal(SHOW_MODAL_TYPE.FORM)
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
                <Dropdown.Item className="navi-separator my-3" />
                <Dropdown.Item className="navi-item" as="button">
                  <div
                    className="navi-link"
                    onClick={() => {
                      // setShowModal(SHOW_MODAL_TYPE.DELETE)
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
        {/*end::Toolbar*/}
        {/*begin::User*/}
        <div className="d-flex align-items-center mb-7">
          {/*begin::Pic*/}
          <div className="flex-shrink-0 mr-4">
            <div className="symbol symbol-circle symbol-lg-75">
              <img src={project.image || toAbsoluteUrl('media/project-logos/1.png')} alt={project.name} />
            </div>
          </div>
          {/*end::Pic*/}
          {/*begin::Title*/}
          <div className="d-flex flex-column">
            <a href="#" className="text-dark font-weight-bold text-hover-primary font-size-h4 mb-0">
              {project.name}
            </a>
            <span className="text-muted font-weight-bold">Head of Development</span>
          </div>
          {/*end::Title*/}
        </div>
        {/*end::User*/}
        {/*begin::Desc*/}
        <p className="mb-7">
          {project.description}
          <a href="#" className="text-primary pr-1">
            #xrs-54pq
          </a>
        </p>
        {/*end::Desc*/}
        {/*begin::Info*/}
        <div className="mb-7">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-dark-75 font-weight-bolder mr-2">Budget:</span>
            <a href="#" className="text-muted text-hover-primary">
              $249,500
            </a>
          </div>
          <div className="d-flex justify-content-between align-items-cente my-1">
            <span className="text-dark-75 font-weight-bolder mr-2">Expences:</span>
            <a href="#" className="text-muted text-hover-primary">
              $76,810
            </a>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-dark-75 font-weight-bolder mr-2">Due Date:</span>
            <span className="text-muted font-weight-bold">21.05.2016</span>
          </div>
        </div>
        {/*end::Info*/}
        <a href="#" className="btn btn-block btn-sm btn-light-success font-weight-bolder text-uppercase py-4">
          write message
        </a>
      </div>
      {/*end::Body*/}
    </div>
  )
}
