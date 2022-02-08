import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, FormControl } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import * as yup from 'yup'
import { useSubheader } from '../../_metronic/layout'
import { API_ENDPOINT } from '../../configs'
import AppHelper from '../../helpers/app.helper'
import Notification from '../components/global/Notification.component'
import { HttpRequest } from '../../http/HttpRequest'
import { HTTP_STATUS_CODE } from '../../constants'
import { AlertErrorHelper, AlertHelper } from '../../helpers/alert.helper'

export function GeneratePermission() {
  const [modules, setModules] = useState([])
  const [permissions, setPermissions] = useState([])
  const [moduleId, setModuleId] = useState(null)
  const subHeader = useSubheader()

  const schemaValidate = yup.object().shape({
    name: yup
      .string()
      .min(5, 'Tối thiểu 5 ký tự')
      .required('Tên không được để trống')
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schemaValidate)
  })

  const renderSubheader = () => {
    subHeader.setTitle('Generate permission')
  }

  const getPermissions = useCallback(() => {
    let params = {}
    if (moduleId) {
      params = { ...params, moduleId }
    }
    HttpRequest.GET(`${API_ENDPOINT}/permission/all`, params).then((res) => {
      if (res.statusCode !== 200) {
        AlertErrorHelper({ response: res })
      } else {
        setPermissions(res.content)
      }
    })
  }, [moduleId])

  const getModules = () => {
    HttpRequest.GET(`${API_ENDPOINT}/module/all`).then((res) => {
      if (res.statusCode !== 200) {
        AlertErrorHelper({ response: res })
      } else {
        setModules(res.content)
      }
    })
  }

  const onSubmit = (value) => {
    HttpRequest.POST(`${API_ENDPOINT}/permission/generate`, { ...value, module_id: moduleId }).then((res) => {
      if (res.statusCode !== HTTP_STATUS_CODE.CREATED) {
        AlertErrorHelper({ response: res })
      } else {
        AlertHelper({ type: 'info', title: `Đã thêm quyền ${res.content.name}` })
      }
    })
  }

  useEffect(() => {
    AppHelper.setTitle('Generate permission')
    renderSubheader()
    getModules()
    getPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Notification show children={<div>Quản lý các quyền của hệ thống</div>} />
      <Card className="card-custom">
        <Card.Header className="card-header-tabs-line">
          <ul className="nav nav-dark nav-bold nav-tabs nav-tabs-line" data-remember-tab="tab_id" role="tablist">
            <li className="nav-item">
              <Button variant="" as="a" className="nav-link active" data-toggle="tab">
                Thêm quyền
              </Button>
            </li>
            <li className="nav-item">
              <Button variant="" as="a" className="nav-link " data-toggle="tab">
                Danh sách quyền theo Module
              </Button>
            </li>
          </ul>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
              <label htmlFor="example-url-input" className="col-3 col-form-label">
                Kiểm tra quyền tồn tại
              </label>
              <div className="col-5">
                <FormControl
                  className={clsx({ 'is-invalid': errors.name })}
                  list="permissions"
                  type="text"
                  name="name"
                  placeholder="Nhập tên quyền"
                  autoComplete="off"
                  {...register('name')}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => <span className="text-danger">{message}</span>}
                />
              </div>
              <div className="col-3">
                <select
                  className="form-control select2"
                  id="kt_select2_4"
                  name="moduleId"
                  onChange={(event) => {
                    setModuleId(event.target.value)
                  }}
                >
                  {modules.map((module, index) => (
                    <option value={module._id} key={index}>
                      {module.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-1">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <datalist id="modules" className="row">
            {modules.map((module, index) => (
              <option value={module._id} key={index} />
            ))}
          </datalist>
          <datalist id="permissions" className="row">
            {permissions.map((permission, index) => (
              <option disabled value={permission.key} key={index} />
            ))}
          </datalist>
        </Card.Body>
      </Card>
    </>
  )
}
