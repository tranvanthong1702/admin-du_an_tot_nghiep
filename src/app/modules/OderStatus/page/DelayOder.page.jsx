import React from 'react'
import { Link } from 'react-router-dom'

function DelayOder() {
  return (
    <div>
      <section className="section-link">
        <Link to="/status/list" className="btn btn-success font-weight-bolder font-size-sm">
          Chưa xử lý
        </Link>
        <Link to="/status/process" className="btn btn-success font-weight-bolder font-size-sm">
          Đang xử lý
        </Link>
        <Link to="/status/delay" className="btn btn-success active_link font-weight-bolder font-size-sm">
          Chờ giao
        </Link>
        <Link to="/status/delivery" className="btn btn-success font-weight-bolder font-size-sm">
          Đang giao
        </Link>
        <Link to="/status/over" className="btn btn-success font-weight-bolder font-size-sm">
          Giao thành công
        </Link>
        <Link to="/status/fail" className="btn btn-success font-weight-bolder font-size-sm">
          Giao thất bại
        </Link>
      </section>
      <section className="section-all">
        <div className="row">
          <div className="col-lg-9">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Hình thức thanh toán</th>
                  <th scope="col">Ngày đặt hàng</th>
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <input type="checkbox" />
                  </th>
                  <td>vn768776</td>
                  <td>1.000.000 đ</td>
                  <td>COD</td>
                  <td>2021-11-21</td>
                  <td>Xuân Thành</td>
                  <td>0987654321</td>
                  <td>
                    <Link
                      to="/status/view"
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                      title="Xem đơn hàng"
                    >
                      <i class="far fa-eye"></i>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <input type="checkbox" />
                  </th>
                  <td>vn799999</td>
                  <td>100.000.000 đ</td>
                  <td>COD</td>
                  <td>2021-11-21</td>
                  <td>Xuân Bắc</td>
                  <td>0987654321</td>
                  <td>
                    <Link
                      to="/status/view"
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                      title="Xem đơn hàng"
                    >
                      <i class="far fa-eye"></i>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <input type="checkbox" />
                  </th>
                  <td>vn80000</td>
                  <td>100.000.000 đ</td>
                  <td>COD</td>
                  <td>2021-11-21</td>
                  <td>Xuân Bắc</td>
                  <td>0987654321</td>
                  <td>
                    <Link
                      to="/status/view"
                      type="button"
                      className="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2"
                      title="Xem đơn hàng"
                    >
                      <i class="far fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="shipper">
              <label htmlFor="">Chọn nhân viên giao hàng</label>
              <select class="form-select mb-4" aria-label="Default select example">
                <option value="1">Nhân viên 1</option>
                <option value="2">Nhân viên 2</option>
              </select>
            </div>
            <div className="action">
              <div className="row">
                <div className="col-lg-1">
                  <input type="checkbox" />
                </div>
                <div className="col-lg-5">
                  <p>Chọn tất cả</p>
                </div>
                <div className="col-lg-6">
                  <div className="box__btn d-flex justify-content-around">
                    <button className="btn_xl btn-primary">Bàn giao</button>
                    <button className="btn_xl btn-danger">Hủy bàn giao</button>
                    <button className="btn_delete btn-danger">Hủy đơn hàng</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-status">
              <form>
                <label htmlFor="">Hình thức thanh toán :</label>
                <select class="form-select mb-4" aria-label="Default select example">
                  <option value="1">Thanh toán online</option>
                  <option value="2">Code COD</option>
                </select>
                <label htmlFor="">Sắp xếp theo :</label>
                <select class="form-select mb-4" aria-label="Default select example">
                  <option value="1">Giá cao đến thấp</option>
                  <option value="2">Giá thấp đến cao</option>
                </select>
                <select class="form-select mb-4" aria-label="Default select example">
                  <option value="1">Cập nhật mới nhất</option>
                  <option value="2">Cập nhật cũ nhất</option>
                </select>
                <label htmlFor="">Lọc theo số điện thoại :</label>
                <input type="text" className="form-control mb-4" />
                <div className="bt__ text-center">
                  <button className="btn btn-primary">Lọc</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DelayOder
