import React, { useCallback, useEffect, useState } from 'react'
import InputField from '../../../components/global/fields/Input.field'
import { Link } from 'react-router-dom'


function DeleteOder() {
    return (
        <div>
            <section className="section-all">
                <div className="container">
                    <div className="action">
                        <div className="action_message">
                            <label htmlFor="">Lý do hủy</label>
                            <textarea type="textarea" name="" id="" rows="4" cols="180"></textarea>
                        </div>
                        <div className="btn_action text-end">
                            <button className="btn btn-danger">
                                Hủy đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    )
}
export default DeleteOder