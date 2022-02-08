import clsx from 'clsx'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import MediaLibraryComponent from '../../../modules/MediaLibrary/MediaLibrary.component'

function ImageInput(props) {
  const { initialValue, onChoose, imageCircle } = props
  const [showMedia, setShowMedia] = useState(false)
  const [path, setPath] = useState(initialValue || null)

  const onChooseMedia = (file) => {
    onChoose(file.url)
    setPath(file.url)
  }

  const onRemove = () => {
    onChoose(null)
    setPath(initialValue || null)
  }

  const onHideMedia = () => {
    setShowMedia(false)
  }
  return (
    <>
      <div
        className={clsx('image-input image-input-outline', {
          'image-input-circle': imageCircle
        })}
        style={{
          backgroundImage: `url(${toAbsoluteUrl(
            'media/static/icon-default.svg'
          )}})`
        }}
      >
        <div
          className="image-input-wrapper"
          style={{
            backgroundImage: `url(${
              path
                ? path
                : toAbsoluteUrl('media/static/icon-default.svg')
            })`
          }}
        />

        <label
          className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
          data-action="change"
          onClick={() => {
            setShowMedia(true)
          }}
        >
          <OverlayTrigger
            overlay={<Tooltip id="change-image">Change image</Tooltip>}
          >
            <i className="fa fa-pen icon-sm text-muted" />
          </OverlayTrigger>
        </label>

        {(path || initialValue) && (
          <span
            className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
            data-action="remove"
            onClick={() => {
              onRemove()
            }}
          >
            <OverlayTrigger
              overlay={<Tooltip id="remove-image">Remove image</Tooltip>}
            >
              <i className="ki ki-bold-close icon-xs text-muted" />
            </OverlayTrigger>
          </span>
        )}
      </div>
      <MediaLibraryComponent
        show={showMedia}
        onHide={onHideMedia}
        onChoose={onChooseMedia}
        folderToUpload="areas"
      />
    </>
  )
}

ImageInput.propTypes = {
  onChoose: PropTypes.func.isRequired,
  circle: PropTypes.bool,
  initialValue: PropTypes.string
}

export default ImageInput
