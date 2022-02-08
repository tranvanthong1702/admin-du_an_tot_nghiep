import clsx from 'clsx'
import React from 'react'
import { Button, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { LIBRARY_TYPE } from '../constants/library.constant'
import { useTranslate } from '../../../hooks/translate'

function MediaHeaderComponent({ type, setType, setShowUploadFile }) {
  const t = useTranslate()
  return (
    <div className="card card-custom gutter-b">
      <div className="card-body d-flex align-items-center justify-content-between flex-wrap py-3">
        <div className="d-flex align-items-center mr-2 py-2">
          <h3 className="font-weight-bold mb-0 mr-10">Files manager</h3>
          <div className="d-flex mr-3">
            <div className="navi navi-hover navi-active navi-link-rounded navi-bold d-flex flex-row">
              {Object.keys(LIBRARY_TYPE).map((key, index) => (
                <div className="navi-item mr-2" key={index}>
                  <Button
                    variant=""
                    onClick={() => {
                      console.log('Get key: ', LIBRARY_TYPE[key])
                      setType(LIBRARY_TYPE[key])
                    }}
                    className={clsx('navi-link', {
                      active: LIBRARY_TYPE[key] === type
                    })}
                  >
                    <span className="navi-text">{t(key)}</span>
                  </Button>
                </div>
              ))}
            </div>
            <Dropdown>
              <OverlayTrigger
                placement="right"
                delay={500}
                overlay={<Tooltip id="tooltip-file-options">{t('Options')}</Tooltip>}
              >
                <Dropdown.Toggle as="div" className="btn btn-clean btn-icon" bsPrefix="dropdown-inline">
                  <i className="ki ki-bold-more-hor font-size-md" />
                </Dropdown.Toggle>
              </OverlayTrigger>
              <Dropdown.Menu className="dropdown-menu-md dropdown-menu-right">
                <ul className="navi navi-hover py-5">
                  <Dropdown.Item className="navi-item">
                    <Button variant="" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-drop" />
                      </span>
                      <span className="navi-text">New Group</span>
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item">
                    <Button variant="" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-list-3" />
                      </span>
                      <span className="navi-text">Contacts</span>
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item">
                    <Button variant="" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-rocket-1" />
                      </span>
                      <span className="navi-text">Groups</span>
                      <span className="navi-link-badge">
                        <span className="label label-light-primary label-inline font-weight-bold">new</span>
                      </span>
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item">
                    <Button variant="" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-bell-2" />
                      </span>
                      <span className="navi-text">Calls</span>
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item">
                    <Button variant="" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-gear" />
                      </span>
                      <span className="navi-text">Settings</span>
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-separator my-3" />
                  <Dropdown.Item className="navi-item">
                    <Button variant="" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-magnifier-tool" />
                      </span>
                      <span className="navi-text">Help</span>
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item">
                    <Button variant="" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-bell-2" />
                      </span>
                      <span className="navi-text">Privacy</span>
                      <span className="navi-link-badge">
                        <span className="label label-light-danger label-rounded font-weight-bold">5</span>
                      </span>
                    </Button>
                  </Dropdown.Item>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="symbol-group symbol-hover py-2">
          <OverlayTrigger
            placement="top"
            delay={500}
            overlay={<Tooltip id="tooltip-new-file">{t('New file')}</Tooltip>}
          >
            <div
              className="symbol symbol-40 symbol-light-primary"
              role="button"
              onClick={() => {
                setShowUploadFile(true)
              }}
            >
              <span className="symbol-label font-weight-bold">
                <i className="fa flaticon-upload font-size-lg" />
              </span>
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  )
}

MediaHeaderComponent.propTypes = {
  setShowUploadFile: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired
}

export default MediaHeaderComponent
