import React, { ReactElement } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { getFullName, User } from '../../interfaces/models/User'
import { toAbsoluteUrl } from '../../../_metronic/_helpers'
import { Avatar } from '@material-ui/core'
import { useTranslate } from '../../hooks/translate'
import { useIsYou } from '../../hooks/account'

interface PropEnhancers {
  members: User[]
  limit: number
}

function MemberItem({ member }: { member: User }): ReactElement {
  const t = useTranslate()
  const isYou = useIsYou(member._id)
  return (
    <div className="symbol symbol-30 symbol-circle">
      <OverlayTrigger
        overlay={<Tooltip id={`area-member-${member._id}`}>{isYou ? `(${t('You')})` : getFullName(member)}</Tooltip>}
      >
        <Avatar src={member.avatar || toAbsoluteUrl('media/users/blank.png')} alt={member.firstName} />
      </OverlayTrigger>
    </div>
  )
}

function MembersSymbolComponent({ members, limit }: PropEnhancers): ReactElement {
  return (
    <div className="symbol-group symbol-hover">
      {members.slice(0, limit).map((member, index) => (
        <div key={index}>
          <MemberItem member={member} />
        </div>
      ))}
      {members.length > limit && (
        <div className="symbol symbol-30 symbol-circle symbol-light">
          <span className="symbol-label font-weight-bold">{members.length - limit}+</span>
        </div>
      )}
    </div>
  )
}

export default MembersSymbolComponent
