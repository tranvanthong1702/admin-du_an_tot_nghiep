import React, { ReactElement } from 'react'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../_metronic/_helpers'
import ModalComponent from '../global/Modal.component'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link } from 'react-router-dom'
import { Group } from '../../interfaces/models/Group'
import { getFullName } from '../../interfaces/models/User'
import { useTranslate } from '../../hooks/translate'

interface PropsInterface {
  group: Group | null
  show: boolean
  onHide(): void
}

function MembersModalComponent(props: PropsInterface): ReactElement {
  const { group, show, onHide } = props
  const t = useTranslate()
  return (
    <ModalComponent
      title={t('List member group {name}', { name: group ? group.name : '' })}
      onHide={onHide}
      show={show}
      dialogClassName="modal-600"
    >
      <div className="flex-row-auto offcanvas-mobile" id="kt_chat_aside">
        <div className="card card-custom">
          <div className="card-body">
            <div className="input-group input-group-solid">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="svg-icon svg-icon-lg">
                    <SVG src={toAbsoluteUrl('media/svg/icons/General/Search.svg')} />
                  </span>
                </span>
              </div>
              <input type="text" className="form-control py-4 h-auto" placeholder="Email" />
            </div>
            <PerfectScrollbar
              options={{ wheelSpeed: 0.4, wheelPropagation: false }}
              className="scroll"
              style={{ maxHeight: '60vh', position: 'relative' }}
            >
              <div className="mt-7 scroll scroll-pull">
                {group &&
                  group.members.map((member, index) => (
                    <div className="d-flex align-items-center justify-content-between mb-5" key={index}>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle symbol-50 mr-3">
                          <img alt="Pic" src={member && member.avatar ? member.avatar : ''} />
                        </div>
                        <div className="d-flex flex-column">
                          <Link to="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-lg">
                            {member ? getFullName(member) : 'Unknow'}
                          </Link>
                          <span className="text-muted font-weight-bold font-size-sm">Head of Development</span>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <span className="text-muted font-weight-bold font-size-sm">35 mins</span>
                        <span className="label label-sm label-success">4</span>
                      </div>
                    </div>
                  ))}
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </ModalComponent>
  )
}

export default MembersModalComponent
