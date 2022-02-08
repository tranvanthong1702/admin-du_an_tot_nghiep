import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import AppHelper from '../../../../helpers/app.helper'
import SlideService from '../service/Slide.service'
import { Link } from 'react-router-dom'

function SlideListPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [slide, setSlide] = useState([])

  const loadSlide = useCallback(() => {
    console.log('Options: ', options)
    setLoading(true)
    setTimeout(() => {
      SlideService.list().then((respon) => {
        setSlide(respon.data)
        setLoading(false)
      })
    }, DATA_LOAD_TIME)
  }, [options])
  useEffect(() => {
    AppHelper.setTitle('Slide')
    loadSlide()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const handlerDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Do you want delete ${name}`)
    if (result) {
      setLoading(true)
      setTimeout(() => {
        SlideService.delete(id)
        setLoading(false)
      }, DATA_LOAD_TIME)
      setSlide(slide.filter((item) => item.id !== id))
    }
  }
  return (
    <DataTable
      title="List Slide"
      subTitle="Danh sách slide"
      metadata={metadata}
      toolbar={
        <>
          <Link to="/slides/add" className="btn btn-success font-weight-bolder font-size-sm">
            New slide
          </Link>
        </>
      }
      thead={
        <tr className="datatable-row" style={{ left: '0px' }}>
          <th data-field="#" className="datatable-cell datatable-cell-sort" width={`5%`}>
            <span>#</span>
          </th>
          <th data-field="name" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Title</span>
          </th>
          <th data-field="name" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Image</span>
          </th>
          <th data-field="name" className="datatable-cell datatable-cell-sort" width={`15%`}>
            <span>Pro_id</span>
          </th>

          <th data-field="action" className="datatable-cell datatable-cell-sort">
            <span>action</span>
          </th>
        </tr>
      }
      tbody={
        <>
          {slide.map((data, index) => (
            <tr key={index} data-row={1} className="datatable-row datatable-row-even" style={{ left: '0px' }}>
              <td data-field="#" aria-label="null" className="datatable-cell" width={`5%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                </span>
              </td>

              <td data-field="name" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.title}</p>
                </span>
              </td>
              <td data-field="name" aria-label="null" className="datatable-cell" width={`15%`}>
                <span>
                  <p className="text-dark-50 text-hover-primary font-weight-bold">{data.pro_id}</p>
                </span>
              </td>
              <td data-field="name" aria-label="null" className="datatable-cell" width={`15%`}>
                <img src={`https://6187ce0b057b9b00177f9ab3.mockapi.io/slide/${slide.image}`} alt="" />
              </td>
              <td data-field="Actions" data-autohide-disabled="false" aria-label="null" className="datatable-cell">
                <span
                  style={{
                    overflow: 'visible',
                    position: 'relative',
                    width: '130px'
                  }}
                >
                  <div className="dropdown dropdown-inline">
                    <button
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                    >
                      <span className="svg-icon svg-icon-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                          className="svg-icon"
                        >
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect x={0} y={0} width={24} height={24} />
                            <path
                              d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z"
                              fill="#000000"
                            />
                            <path
                              d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z"
                              fill="#000000"
                              opacity="0.3"
                            />
                          </g>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => handlerDelete(data.id, data.name)}
                    type="button"
                    className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon"
                    title="Delete"
                  >
                    <span className="svg-icon svg-icon-md svg-icon-danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                          <rect x={0} y={0} width={24} height={24} />
                          <path
                            d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
                            fill="#000000"
                            fillRule="nonzero"
                          />
                          <path
                            d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                            fill="#000000"
                            opacity="0.3"
                          />
                        </g>
                      </svg>
                    </span>
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </>
      }
      options={options}
      setOptions={setOptions}
      loading={loading}
    />
  )
}

export default SlideListPage
