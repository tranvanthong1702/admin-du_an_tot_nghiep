import React, { memo, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import FirebaseStorage from '../../../../firebase'
import ModalComponent from '../../../components/global/Modal.component'
import MediaService from '../services/media.services'
import { AlertHelper } from '../../../../helpers/alert.helper'
import { useTranslate } from '../../../hooks/translate'

function UploadFiles({ show, onHide, callback, path }) {
  const t = useTranslate()
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const uploadFileToFirebase = async (files) => {
    setShowProgress(true)
    const resFirebase = await FirebaseStorage.uploadMultiple(files, path)
    setProgress(resFirebase.progress)
    await MediaService.store(resFirebase.files).then((res) => {
      AlertHelper({ type: 'info', title: res?.message || t('Can not upload pictures') })
      callback()
      setShowProgress(false)
      setProgress(0)
    })
  }
  return (
    <ModalComponent
      title="Upload files"
      onHide={onHide}
      show={show}
      backdropClassName="level-2"
      className="level-2"
      dialogClassName="modal-600"
      body={
        <Dropzone onDrop={uploadFileToFirebase}>
          {({ getRootProps, getInputProps }) => {
            return (
              <section>
                <div className="dropzone dropzone-default dropzone-success" {...getRootProps()}>
                  <input {...getInputProps()} disabled={showProgress} multiple />
                  <div className="dropzone-msg dz-message needsclick">
                    <h3 className="dropzone-msg-title">Drop files here or click to upload.</h3>
                    <span className="dropzone-msg-desc">Only image, pdf and psd files are allowed for upload</span>
                  </div>
                  {showProgress && <ProgressBar className="mt-1" animated now={progress} />}
                </div>
              </section>
            )
          }}
        </Dropzone>
      }
      footer={
        <button className="btn btn-danger" onClick={onHide}>
          Close
        </button>
      }
    />
  )
}

UploadFiles.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  callback: PropTypes.func,
  path: PropTypes.string
}

export default memo(UploadFiles)
