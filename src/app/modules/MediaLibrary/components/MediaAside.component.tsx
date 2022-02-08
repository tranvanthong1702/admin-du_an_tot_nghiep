import React, { ReactElement } from 'react'
import { Button } from 'react-bootstrap'
import SVG from 'react-inlinesvg'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { MediaFolder } from '../../../interfaces/models/MediaFolder'
import clsx from 'clsx'

interface PropInterface {
  rootFolder: MediaFolder | null
  folderSelected: MediaFolder | null
  onChooseFolder(folder: MediaFolder): void
}

export default function MediaAsideComponent(props: PropInterface): ReactElement {
  const { rootFolder, folderSelected, onChooseFolder } = props
  return (
    <div className="flex-row-auto offcanvas-mobile w-200px w-xxl-275px">
      <div className="card card-custom card-stretch">
        <div className="card-body px-5">
          <PerfectScrollbar
            className="card-scroll"
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
            <div className="navi navi-hover navi-active navi-link-rounded navi-bold navi-icon-center navi-light-icon">
              <div className="navi-section mb-2 font-size-h6 font-weight-bold pb-0">Folder</div>
              {rootFolder && (
                <div className="navi-item my-2">
                  <Button
                    bsPrefix="a"
                    as="a"
                    className={clsx('navi-link', {
                      active: rootFolder._id === folderSelected?._id
                    })}
                    onClick={() => {
                      onChooseFolder(rootFolder)
                    }}
                  >
                    <span className="navi-icon mr-4">
                      <span className="svg-icon svg-icon-lg">
                        <SVG src={toAbsoluteUrl('media/svg/icons/Files/Group-folders.svg')} />
                      </span>
                    </span>
                    <span className="navi-text font-weight-bolder font-size-lg">{rootFolder.name}</span>
                    <span className="navi-label">
                      <span className="label label-rounded label-light-success font-weight-bolder">3</span>
                    </span>
                  </Button>
                </div>
              )}
              <div className="navi-section mt-7 mb-2 font-size-h6 font-weight-bold pb-0">Tags</div>
              <div className="navi-item my-2">
                <Button bsPrefix="a" as="a" className="navi-link">
                  <span className="navi-icon mr-4">
                    <i className="fa fa-genderless text-danger" />
                  </span>
                  <span className="navi-text font-weight-bolder font-size-lg">Custom Work</span>
                  <span className="navi-label">
                    <span className="label label-rounded label-light-danger font-weight-bolder">6</span>
                  </span>
                </Button>
              </div>
              <div className="navi-item my-2">
                <Button bsPrefix="a" as="a" className="navi-link">
                  <span className="navi-icon mr-4">
                    <i className="fa fa-genderless text-success" />
                  </span>
                  <span className="navi-text font-weight-bolder font-size-lg">Partnership</span>
                </Button>
              </div>
              <div className="navi-item my-2">
                <Button bsPrefix="a" as="a" className="navi-link">
                  <span className="navi-icon mr-4">
                    <i className="fa fa-genderless text-info" />
                  </span>
                  <span className="navi-text font-weight-bolder font-size-lg">In Progress</span>
                </Button>
              </div>
              <div className="navi-item my-2">
                <Button bsPrefix="a" as="a" className="navi-link">
                  <span className="navi-icon mr-4">
                    <i className="fa flaticon2-plus icon-1x" />
                  </span>
                  <span className="navi-text font-weight-bolder font-size-lg">Add Label</span>
                </Button>
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}
