import React, { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/global/datatable/Datatable.component'
import {
  DATATABLE_METADATA_DEFAULT,
  DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { DATA_LOAD_TIME } from '../../../../constants'
import SlideService from '../service/Slide.service'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import AppHelper from '../../../../helpers/app.helper'
function SlideListPage() {
  const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
  const [slide, setSlide] = useState([])
  const [success, setSuccess] = useState([])
  const [q, setPhone] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const productPerPage = 10
  const pageVisited = pageNumber * productPerPage
  const pageCount = Math.ceil(slide?.length / productPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const convertDate = (data) => {
    const date = new Date(data)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }
  const search = (rows) => {
    return rows.filter((row) => row.name.toLowerCase().indexOf(q) > -1 || row.name.toLowerCase().indexOf(q) > -1)
  }
  const loadSlide = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      SlideService.list().then((res) => {
        setSuccess(res.success)
        setSlide(res.data)
        setLoading(false)
      })
    }, DATA_LOAD_TIME)
  }, [options])
  useEffect(() => {
    AppHelper.setTitle('Slide')
    loadSlide()
  }, [])
  
  const handlerDelete = async (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm(`Do you want delete ${name}`)
    if (result) {
      await SlideService.delete(id)
      const newSlide = slide.filter((slide) => slide.id !== id)
      setSlide(newSlide)
    }
  }
  return (
    <DataTable
      title="Danh sách slide"
      metadata={metadata}
      searchform={
        <form className="mb-7">
          <div className="row align-items-center">
            <div className="col-lg-5 ">
              <div className="input-icon">
                <input type="text" className="form-control mb-4" value={q} onChange={(e) => setPhone(e.target.value)} />
                <span>
                  <i className="flaticon2-search-1 text-muted" />
                </span>
              </div>
            </div>
            <div className="col-lg-7 d-flex justify-content-end">
              <div className="btn__">
                <Link to="/slides/add" className="btn btn-success font-weight-bolder font-size-sm">
                  Thêm slides
                </Link>
              </div>
            </div>
          </div>
        </form>
      }
      thead={
        <div className="row mb-3" >
          <div className='col-lg-1 col-md-1 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
            <span>STT</span>
          </div>
          <div className='col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
            <span>Tiêu đề</span>
          </div>
          <div className='col-lg-5 col-md-5 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
            <span>Ảnh </span>
          </div>
          <div className='col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center fw-bolder fz-16px'>
            <span>Tùy chọn</span>
          </div>
        </div>
      }
      tbody={
        success ? (
          <div>
            {search(slide.slice(pageVisited, pageVisited + productPerPage))?.map((data, index) => {
              return (
                <div className="row slide-img mb-3" key={index} data-row={1} >
                  <div className="col-lg-1 col-md-1 d-flex align-items-center justify-content-center text-center" >
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{(index += 1)}</p>
                  </div>
                  <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center" >
                      <p className="text-dark-50 text-hover-primary font-weight-bold">{data.name}</p>
                  </div>
                  <div className="col-lg-5 col-md-5 d-flex align-items-center justify-content-center text-center" >
                    <img src={data.image} alt="abc" className='img-fluid'/>
                  </div>
                  <div className="col-lg-3 col-md-3 d-flex align-items-center justify-content-center text-center">
                    <Link
                      to={`/slides/edit/${data.id}`}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary mr-2 btn_edit_"
                      title="Edit details"
                    >
                      <i class="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => handlerDelete(data.id, data.name)}
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-danger btn-icon"
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
                  </div>
                </div>
              )
            })}
            <ReactPaginate
              previousLabel={'Trang trước'}
              nextLabel={'Trang sau'}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'paginationBttns'}
              previousClassName={'previousBttn'}
              nextLinkClassName={'nextBttn'}
              disabledClassName={'paginationDisabled'}
              activeClassName={'paginationActive'}
            />
          </div>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <div>
              <div className="text-center">
                <i className="fas fa-database" />
              </div>
              <div>Không có dữ liệu</div>
            </div>
          </div>
        )
      }
      options={options}
      setOptions={setOptions}
      loading={loading}
    />
  )
}

export default SlideListPage
