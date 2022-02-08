import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Toastr from '../../../../helpers/toast.helper'
import { LIBRARY_TYPE } from '../constants/library.constant'
import MediaService from '../services/media.services'
import { useTranslate } from '../../../hooks/translate'

function MediaItem({ type, media, onChoose, callback }) {
  const t = useTranslate()
  const handleRemoveMedia = async (id) => {
    await MediaService.remove(id).then((res) => {
      Toastr.show('info', res.message)
      callback()
    })
  }
  return (
    <div className="col-md-4 py-5 col-xxl-3 col-lg-3">
      <div className="overlay">
        <div className="overlay-wrapper text-center symbol symbol-120">
          {media ? (
            <>
              {type === LIBRARY_TYPE.IMAGE && <img src={media.url} alt={media.name} className="mw-100 mh-100" />}
              {type === LIBRARY_TYPE.VIDEO && <video src={media.url} className="mw-100 mh-100" />}
              {type === LIBRARY_TYPE.SOUND && <audio src={media.url} className="mw-100 mh-100" />}
              {type === LIBRARY_TYPE.DOC ||
                (type === LIBRARY_TYPE.OTHER && <div className="mw-100 mh-100">{media.name}</div>)}
            </>
          ) : (
            <Skeleton variant="rect" className="mw-100 mh-100 border-1" width={188.38} height={120} animation="wave" />
          )}
        </div>
        {media && (
          <div className="overlay-layer d-flex justify-content-center">
            <Dropdown placeholder="top" className="border-0 position-absolute right-0 top-0">
              <OverlayTrigger
                placement="right"
                delay={500}
                overlay={<Tooltip id="tooltip-file-options">{t('Options')}</Tooltip>}
              >
                <Dropdown.Toggle as="div" className="btn btn-clean btn-icon" bsPrefix="dropdown-inline">
                  <i className="ki ki-bold-more-hor font-size-md" />
                </Dropdown.Toggle>
              </OverlayTrigger>
              <Dropdown.Menu className="dropdown-menu-sm dropdown-menu-right zindex-5">
                <ul className="navi navi-hover py-5">
                  <Dropdown.Item className="navi-item" as="button">
                    <div className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-drop" />
                      </span>
                      <span className="navi-text">New Group</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item" as="button">
                    <div className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-list-3" />
                      </span>
                      <span className="navi-text">Contacts</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item" as="button">
                    <div className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-rocket-1" />
                      </span>
                      <span className="navi-text">Groups</span>
                      <span className="navi-link-badge">
                        <span className="label label-light-primary label-inline font-weight-bold">new</span>
                      </span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item" as="button">
                    <div className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-bell-2" />
                      </span>
                      <span className="navi-text">Calls</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item" as="button">
                    <div className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-gear" />
                      </span>
                      <span className="navi-text">{t('Settings')}</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-separator my-3" />
                  <Dropdown.Item
                    className="navi-item"
                    as="button"
                    onClick={() => {
                      handleRemoveMedia(media._id)
                    }}
                  >
                    <div className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-trash" />
                      </span>
                      <span className="navi-text">{t('Remove')}</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="navi-item" as="button">
                    <div className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-bell-2" />
                      </span>
                      <span className="navi-text">{t('Privacy')}</span>
                      <span className="navi-link-badge">
                        <span className="label label-light-danger label-rounded font-weight-bold">5</span>
                      </span>
                    </div>
                  </Dropdown.Item>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
            <button
              type="button"
              className="btn btn-sm btn-warning font-weight-bold mx-3 mt-12"
              onClick={() => {
                onChoose(media)
              }}
            >
              {t('Use')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

MediaItem.propTypes = {
  media: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    caption: PropTypes.string
  }),
  onChoose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  callback: PropTypes.func
}

export default MediaItem
