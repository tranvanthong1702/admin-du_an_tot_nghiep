import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { Group } from '../../../interfaces/models/Group'
import SVG from 'react-inlinesvg'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link } from 'react-router-dom'
import ModalComponent from '../../../components/global/Modal.component'
import { getFullName, User } from '../../../interfaces/models/User'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import UserService from '../../User/services/User.service'
import { IconButton } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AreaService from '../services/Area.service'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useTranslate } from '../../../hooks/translate'
import DoneOutLineIcon from '@material-ui/icons/DoneOutline'
import { AlertHelper } from '../../../../helpers/alert.helper'
import Spinning from '../../../components/extra/Spinning.component'

interface PropEnhancers {
  group: Group | null
  show: boolean
  onHide(): void
  callback(): void
  areaId: string
  members: User[]
}

function ItemSearch({
  user,
  group,
  onAddMember
}: {
  user: User
  group: Group | null
  onAddMember(email: string): void | null
}): ReactElement {
  const t = useTranslate()
  const [isMember, setIsMember] = useState<boolean>(false)
  useEffect(() => {
    if (group) {
      const check =
        !!group.members.find((member) => member._id === user._id) ||
        !!group.managers.find((member) => member._id === user._id)
      setIsMember(check)
    } else {
      setIsMember(false)
    }
  }, [group, user._id])
  return (
    <div className="d-flex align-items-center justify-content-between mb-5 item-hover">
      <div className="d-flex align-items-center">
        <div className="symbol symbol-circle symbol-50 mr-3">
          <img alt="Pic" src={user.avatar || toAbsoluteUrl('media/users/default.jpg')} />
        </div>
        <div className="d-flex flex-column">
          <Link to="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-lg">
            {getFullName(user)}
          </Link>
          <span className="text-muted font-weight-bold font-size-sm">{user.email}</span>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <OverlayTrigger overlay={<Tooltip id="add-member">{t(isMember ? 'Member existed' : 'Add member')}</Tooltip>}>
          <IconButton
            onClick={() => {
              !isMember && onAddMember(user.email)
            }}
          >
            {isMember ? <DoneOutLineIcon className="text-success" /> : <PersonAddIcon className="text-primary" />}
          </IconButton>
        </OverlayTrigger>
      </div>
    </div>
  )
}

function AddMemberComponent(props: PropEnhancers): ReactElement {
  const { group, show, onHide, callback, areaId, members } = props
  const t = useTranslate()
  const [loading, setLoading] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [usersSearch, setUsersSearch] = useState<User[]>([])

  const loadUsersSearch = useCallback(() => {
    if (keyword.trim().length >= 3) {
      setLoading(true)
      setTimeout(() => {
        UserService.search({ keyword: keyword.trim(), areaId }).then((users) => {
          setUsersSearch(users)
        })
        setLoading(false)
      }, 5000)
    } else {
      setUsersSearch([])
    }
  }, [keyword])

  const onAddMember = (email: string) => {
    if (group) {
      AreaService.groupAddMember(group._id, email).then((res) => {
        AlertHelper({ type: 'success', title: res.message })
        callback()
      })
    }
  }
  const onHideModal = (): void => {
    setKeyword('')
    onHide()
  }

  useEffect(() => {
    loadUsersSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])
  return (
    <ModalComponent
      title={t('Add member to {name}', { name: group?.name || '' })}
      onHide={onHideModal}
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
              <input
                type="text"
                className="form-control py-4 h-auto"
                placeholder="Email, name ..."
                onChange={(event) => {
                  setKeyword(event.target.value)
                }}
                autoFocus
              />
            </div>
            <PerfectScrollbar
              options={{ wheelSpeed: 0.4, wheelPropagation: false }}
              style={{ maxHeight: '60vh', position: 'relative' }}
            >
              <div className="mt-7">
                <Spinning loading={loading}>
                  <>
                    {(keyword.trim().length === 0 ? members : usersSearch).map((user, index) => (
                      <div key={`user-search-${index}`}>
                        <ItemSearch user={user} group={group} onAddMember={onAddMember} />
                      </div>
                    ))}
                  </>
                </Spinning>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </ModalComponent>
  )
}

export default AddMemberComponent
