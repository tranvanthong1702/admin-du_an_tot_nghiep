import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import AreaDetailComponent from '../components/AreaDetail.component'
import AreaService from '../services/Area.service'
import { DATA_LOAD_TIME } from '../../../../constants'
import { SHOW_MODAL_TYPE } from '../constants/area.constant'
import { useSubheader } from '../../../../_metronic/layout'
import AppHelper from '../../../../helpers/app.helper'
import FormArea from '../components/FormArea.component'
import GroupForm from '../components/GroupForm.component'
import MembersModalComponent from '../../../components/extra/MembersModal.component'
import { Area } from '../../../interfaces/models/Area'
import { Group } from '../../../interfaces/models/Group'
import AreaGroupsComponent from '../components/AreaGroups.component'
import AddMemberComponent from '../components/AddMember.component'
import { User } from '../../../interfaces/models/User'
import { useTranslate } from '../../../hooks/translate'
import GroupDeleteComponent from '../components/GroupDelete.component'
import AlertGutter from '../../../components/extra/AlertGutter.component'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import AreaSelector from '../../../components/global/area/AreaSelector.component'

export default function AreaManagerPage(): ReactElement {
  const t = useTranslate()
  const { id } = useParams<{ id: string }>()
  const subHeader = useSubheader()
  const [loading, setLoading] = useState<boolean>(true)
  const [showModal, setShowModal] = useState<string | null>(null)
  const [groupIdSelected, setGroupIdSelected] = useState<string | null>(null)
  const [area, setArea] = useState<Area | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [members, setMembers] = useState<User[]>([])
  const groupSelected = useMemo(() => {
    if (!groupIdSelected) {
      return null
    }
    return groups.find((i) => i._id === groupIdSelected) || null
  }, [groupIdSelected, groups])

  const onSelectGroup = (groupId: string) => {
    setGroupIdSelected(groupId)
  }

  const onShowModal = (key: string) => {
    setShowModal(key)
  }

  const loadArea = useCallback(() => {
    setTimeout(() => {
      if (id) {
        AreaService.find(id).then((data) => {
          setLoading(false)
          if (data) {
            setArea(data)
          }
        })
      }
    }, DATA_LOAD_TIME)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadGroups = useCallback(() => {
    setTimeout(() => {
      if (id) {
        AreaService.groups(id).then((data) => {
          setLoading(false)
          if (data) {
            setGroups(data)
          }
        })
      }
    }, DATA_LOAD_TIME)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadMembers = useCallback(() => {
    setTimeout(() => {
      if (id) {
        AreaService.members(id).then((data) => {
          if (data) {
            setMembers(data)
          }
        })
      }
    }, DATA_LOAD_TIME)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onHideModal = () => {
    setShowModal(null)
    setGroupIdSelected(null)
  }

  const renderSubheader = () => {
    subHeader.setTitle(t('Manager {name}', { name: t('Company') }))
    subHeader.setAction(<AreaSelector />)
  }

  useEffect(() => {
    AppHelper.setTitle(t('Manager {name}', { name: 'Company' }))
    renderSubheader()
    loadArea()
    loadGroups()
    loadMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <>
      {area && area.progress === 100 && (
        <AlertGutter
          icon={
            <span className="svg-icon svg-icon-danger svg-icon-3x">
              <SVG src={toAbsoluteUrl('media/svg/icons/Code/Warning-1-circle.svg')} />
            </span>
          }
          title="Package expired!"
          content="Your package has expired, please renew to use full features."
        />
      )}
      <AreaDetailComponent area={area} setShowModal={setShowModal} members={members} />
      <div className="row">
        <div className="col-12">
          <AreaGroupsComponent
            groups={groups}
            setShowModal={onShowModal}
            setGroupSelected={onSelectGroup}
            loading={loading}
          />
        </div>
      </div>
      <FormArea
        show={showModal === SHOW_MODAL_TYPE.FORM}
        onHide={onHideModal}
        callback={loadArea}
        id={area ? area._id : null}
      />
      <GroupForm
        show={showModal === SHOW_MODAL_TYPE.GROUP.FORM}
        callback={() => {
          loadGroups()
        }}
        id={groupSelected ? groupSelected._id : null}
        onHide={onHideModal}
        areaId={id}
      />
      <MembersModalComponent
        show={showModal === SHOW_MODAL_TYPE.MEMBER.LIST}
        onHide={onHideModal}
        group={groupSelected || null}
      />
      <AddMemberComponent
        show={showModal === SHOW_MODAL_TYPE.MEMBER.ADD}
        onHide={onHideModal}
        group={groupSelected}
        callback={() => {
          loadMembers()
          loadGroups()
        }}
        areaId={id}
        members={members}
      />
      <GroupDeleteComponent
        group={groupSelected}
        show={showModal === SHOW_MODAL_TYPE.GROUP.DELETE}
        onHide={onHideModal}
        callback={() => {
          loadMembers()
          loadGroups()
        }}
      />
    </>
  )
}
