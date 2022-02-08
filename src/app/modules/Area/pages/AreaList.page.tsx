import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import AreaDelete from '../components/AreaDelete.component'
import AreaItem from '../components/AreaItem.component'
import FormArea from '../components/FormArea.component'
import { SHOW_MODAL_TYPE } from '../constants/area.constant'
import AreaService from '../services/Area.service'
import { useSubheader } from '../../../../_metronic/layout'
import AreaArchive from '../components/AreaArchive.component'
import { Area } from '../../../interfaces/models/Area'
import { useTranslate } from '../../../hooks/translate'

export default function AreaListPage(): ReactElement {
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showModal, setShowModal] = useState<string | null>(null)
  const [areaSelected, setAreaSelected] = useState<Area | null>(null)
  const subHeader = useSubheader()
  const t = useTranslate()
  const profile = () => {
    const auth = localStorage.getItem('User') || null
    return auth ? JSON.parse(auth) : null
  }
  const user = profile()
  console.log(user)
  const loadAreas = useCallback(() => {
    setTimeout(() => {
      AreaService.list().then((data) => {
        setAreas(data)
        setLoading(false)
      })
    }, DATA_LOAD_TIME)
  }, [])

  const onShowModal = useCallback((area, type) => {
    setAreaSelected(area)
    setShowModal(type)
  }, [])

  const onHideModal = useCallback(() => {
    setAreaSelected(null)
    setShowModal(null)
  }, [])

  const renderSubheader = () => {
    subHeader.setTitle(t('List {name}', { name: t('Company') }))
    subHeader.setAction(
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowModal(SHOW_MODAL_TYPE.FORM)
        }}
      >
        <i className="flaticon2-plus-1" />
        {t('Create {name}', { name: t('Company') })}
      </button>
    )
  }

  useEffect(() => {
    setLoading(true)
    AppHelper.setTitle(t('List {name}', { name: t('Company') }))
    renderSubheader()
    loadAreas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section className="section-all">
      <div className="row">
        
        {(loading ? Array.from(new Array(4)) : areas).map((area, index) => (
          <AreaItem area={area} key={index} setShowModal={onShowModal} />
        ))}
      </div>
      <FormArea
        show={showModal === SHOW_MODAL_TYPE.FORM}
        onHide={onHideModal}
        callback={loadAreas}
        id={areaSelected ? areaSelected._id : null}
      />
      <AreaDelete
        show={showModal === SHOW_MODAL_TYPE.DELETE}
        onHide={onHideModal}
        area={areaSelected}
        callback={loadAreas}
      />
      <AreaArchive
        onHide={onHideModal}
        callback={loadAreas}
        show={showModal === SHOW_MODAL_TYPE.ARCHIVE}
        area={areaSelected}
      />
    </section>
  )
}
