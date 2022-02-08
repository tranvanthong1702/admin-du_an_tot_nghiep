import React, { ReactElement } from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { SHOW_MODAL_TYPE } from '../constants/area.constant'
import MembersSymbolComponent from '../../../components/extra/MembersSymbol.component'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Spinning from '../../../components/extra/Spinning.component'
import { Group } from '../../../interfaces/models/Group'
import { GROUP_STATUS } from '../constants/group.constant'
import { useTranslate } from '../../../hooks/translate'
import SpinningSingle from '../../../components/extra/SpinningSingle.component'

interface PropsInterface {
  groups: Group[]
  setShowModal(key: string): void
  setGroupSelected(groupId: string): void
  loading: boolean
}

function AreaGroupsComponent(props: PropsInterface): ReactElement {
  const t = useTranslate()
  const { groups, loading, setGroupSelected, setShowModal } = props
  const getStatus = (group: Group): { name: string; class: string } => {
    let className = 'default'
    const status = GROUP_STATUS.find((status) => group.status === status.value)
    if (status) {
      switch (status.value) {
        case 0:
          className = 'warning'
          break
        case 1:
          className = 'success'
          break
        default:
          className = 'default'
      }
      return { name: t(status.name), class: className }
    }
    return {
      name: t('unset'),
      class: className
    }
  }
  return (
    <div className="card card-custom card-stretch gutter-b">
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">{t('Groups')}</span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">{t('Grouping and decentralization')}</span>
        </h3>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn btn-success font-weight-bolder font-size-sm"
            onClick={() => {
              setShowModal(SHOW_MODAL_TYPE.GROUP.FORM)
            }}
          >
            <span className="svg-icon svg-icon-md svg-icon-white">
              <SVG src={toAbsoluteUrl('media/svg/icons/Communication/Group.svg')} />
            </span>
            {t('Create new groups')}
          </button>
        </div>
      </div>
      <div className="card-body pt-0 pb-3">
        {/*begin::Table*/}
        <div className="table-responsive">
          <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
            <thead>
              <tr className="text-uppercase">
                <th style={{ minWidth: '250px' }} className="pl-7">
                  <span className="text-dark-75">{t('Group')}</span>
                </th>
                <th style={{ minWidth: '200px' }}>{t('Managers')}</th>
                <th style={{ minWidth: '200px' }}>{t('Members')}</th>
                <th style={{ minWidth: '100px' }}>{t('Status')}</th>
                <th style={{ minWidth: '120px' }} />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <SpinningSingle background />
                  </td>
                </tr>
              ) : groups.length > 0 ? (
                groups.map((group, index) => (
                  <tr key={index}>
                    <td className="pl-0 py-8">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50 flex-shrink-0 mr-4">
                          <div
                            className="symbol-label"
                            style={{
                              backgroundImage: `url(${group.thumbnail ||
                                toAbsoluteUrl('media/images/default/icons8-image-100-6.png')})`
                            }}
                          />
                        </div>
                        <div>
                          <a href="/" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                            {group.name}
                          </a>
                          <span className="text-muted font-weight-bold d-block">HTML, JS, ReactJS</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center flex-lg-fill my-1">
                        <span className="mr-4">
                          <i className="flaticon-users icon-2x text-muted font-weight-bold" />
                        </span>
                        <MembersSymbolComponent limit={10} members={group.managers} />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center flex-lg-fill my-1">
                        <span className="mr-4">
                          <i className="flaticon-users icon-2x text-muted font-weight-bold" />
                        </span>
                        <MembersSymbolComponent limit={10} members={group.members} />
                      </div>
                    </td>
                    <td>
                      <span className={`label label-lg label-light-${getStatus(group).class} label-inline`}>
                        {getStatus(group).name}
                      </span>
                    </td>
                    <td className="text-right pr-0">
                      <OverlayTrigger placement="top" overlay={<Tooltip id="add-member">{t('Add member')}</Tooltip>}>
                        <button
                          type="button"
                          className="btn btn-icon btn-light btn-hover-success btn-sm mr-3"
                          onClick={() => {
                            setGroupSelected(group._id)
                            setShowModal(SHOW_MODAL_TYPE.MEMBER.ADD)
                          }}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-success">
                            <SVG src={toAbsoluteUrl('media/svg/icons/Communication/Add-user.svg')} />
                          </span>
                        </button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="update-permission">{t('Update permission')}</Tooltip>}
                      >
                        <button
                          type="button"
                          className="btn btn-icon btn-light btn-hover-warning btn-sm mr-3"
                          onClick={() => {
                            setGroupSelected(group._id)
                          }}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-warning">
                            <SVG src={toAbsoluteUrl('media/svg/icons/Shopping/Settings.svg')} />
                          </span>
                        </button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={<Tooltip id="edit">{t('Edit')}</Tooltip>}>
                        <button
                          type="button"
                          className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                          onClick={() => {
                            setShowModal(SHOW_MODAL_TYPE.GROUP.FORM)
                            setGroupSelected(group._id)
                          }}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-primary">
                            <SVG src={toAbsoluteUrl('media/svg/icons/Communication/Write.svg')} />
                          </span>
                        </button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={<Tooltip id="delete">{t('Delete')}</Tooltip>}>
                        <button
                          type="button"
                          className="btn btn-icon btn-light btn-hover-danger btn-sm mr-3"
                          onClick={() => {
                            setShowModal(SHOW_MODAL_TYPE.GROUP.DELETE)
                            setGroupSelected(group._id)
                          }}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-danger">
                            <SVG src={toAbsoluteUrl('media/svg/icons/Home/Trash.svg')} />
                          </span>
                        </button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <div className="d-flex py-3 col-12 justify-content-center mx-48">
                        <div className="d-flex align-items-center p-3">
                          <div className="text-muted">{t('Group empty')}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AreaGroupsComponent
