import React, { memo, ReactElement, useCallback, useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ModalComponent from '../../components/global/Modal.component'
import MediaItem from './components/MediaItem.component'
import UploadFiles from './components/UploadFiles.component'
import { LIBRARY_TYPE } from './constants/library.constant'
import MediaService from './services/media.services'
import MediaHeaderComponent from './components/MediaHeader.component'
import MediaAsideComponent from './components/MediaAside.component'
import { MediaLibrary } from '../../interfaces/models/MediaLibrary'
import { MediaFolder } from '../../interfaces/models/MediaFolder'
import './style.scss'

interface PropInterface {
  show: boolean
  onHide(): void
  onChoose(file: MediaLibrary): void
  folderToUpload: string | null
}

function MediaLibraryComponent(props: PropInterface): ReactElement {
  const { show, onHide, onChoose, folderToUpload } = props
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState(LIBRARY_TYPE.IMAGE)
  const [mediaFolderRoot, setMediaFolderRoot] = useState<MediaFolder | null>(null)
  const [folderSelected, setFolderSelected] = useState<MediaFolder | null>(null)
  const [showUploadFile, setShowUploadFile] = useState<boolean>(false)
  const onHideUploadFile = () => {
    setShowUploadFile(false)
  }

  const loadMedia = useCallback(() => {
    setShowUploadFile(false)
    MediaService.getFolderRoot(type).then((res) => {
      if (res) {
        setLoading(false)
        setMediaFolderRoot(res)
        setFolderSelected(res)
      }
    })
  }, [type])

  const handleChooseFile = (file: MediaLibrary) => {
    onChoose(file)
    onHide()
  }

  const handleChooseFolder = (folder: MediaFolder) => {
    setFolderSelected(folder)
  }

  useEffect(() => {
    setLoading(true)
    if (show) {
      loadMedia()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, type])
  return (
    <ModalComponent
      title="Media Library"
      onHide={onHide}
      show={show}
      size="xl"
      backdropClassName="level-1"
      className="level-1"
      dialogClassName="modal-100vw modal-25vh media-library-modal"
      body={
        <div className="d-flex flex-row">
          <MediaAsideComponent
            onChooseFolder={handleChooseFolder}
            rootFolder={mediaFolderRoot}
            folderSelected={folderSelected}
          />
          <div className="flex-row-fluid d-flex flex-column ml-lg-8">
            <div className="d-flex flex-column">
              <MediaHeaderComponent setShowUploadFile={setShowUploadFile} setType={setType} type={type} />
              <PerfectScrollbar
                className="row card-scroll"
                options={{
                  wheelSpeed: 0.4,
                  wheelPropagation: true,
                  swipeEasing: true
                }}
                style={{
                  position: 'relative',
                  maxHeight: 'calc(100vh - 65px)'
                }}
              >
                {(loading || !folderSelected ? Array.from(new Array(12)) : folderSelected.files).map((media, index) => (
                  <MediaItem media={media} key={index} type={type} callback={loadMedia} onChoose={handleChooseFile} />
                ))}
              </PerfectScrollbar>
            </div>
          </div>
          <UploadFiles show={showUploadFile} onHide={onHideUploadFile} callback={loadMedia} path={folderToUpload} />
        </div>
      }
      footer={
        <>
          <button
            className="btn btn-danger"
            onClick={() => {
              onHide()
            }}
          >
            Cancel
          </button>
        </>
      }
    />
  )
}

export default memo(MediaLibraryComponent)
