import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AppHelper from '../../../../helpers/app.helper'
import SlideService from '../service/Slide.service'
import { DATA_LOAD_TIME } from '../../../../constants'
import InputField from '../../../components/global/fields/Input.field'
import SelectField from '../../../components/global/fields/Select.field'
import {
    DATATABLE_METADATA_DEFAULT,
    DATATABLE_OPTIONS_DEFAULT
} from '../../../components/global/datatable/datatable.constant'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import firebase from 'firebase/app'
import CategoryService from 'app/modules/Categories/service/Category.service'
function SlideEditPage() {
    const [options, setOptions] = useState(DATATABLE_OPTIONS_DEFAULT)
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState(DATATABLE_METADATA_DEFAULT)
    const [slide, setSlide] = useState([])
    const [categories, setCategories] = useState([])
    const [imageChange, setImageChange] = useState('')
    const [success, setSuccess] = useState([])

    const { id } = useParams()
    const history = useHistory()
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit
    } = useForm()
    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await CategoryService.list();
                setCategories(data)
                const { success } = await CategoryService.find(id);
                setSuccess(success);
            } catch (error) {
                console.log(error)
            }
        }
        getCategories()
    }, [])
    useEffect(() => {
        const getSlide = async () => {
            try {
                const { data } = await SlideService.find(id);
                setImageChange(data.image)
                setSlide(data)
            } catch (error) {
                console.log(error)
            }
        }
        getSlide()
    }, [])
    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        let storageRef = firebase.storage().ref(`images/${file.name}`);
        storageRef.put(file).then(() => {
            storageRef.getDownloadURL().then(async (url) => {
                setImageChange(url)

            })
        }).catch(err => console.log('erorr', err))

    }
    const onSubmit = async (data) => {
        const newData = {
            ...data,
            image: imageChange
        }
        await SlideService.update(id, newData)
        history.push('/slides/list')
    }
    return (
        <div>
            <section className="section-all">
                <div className="container">
                    <h2 className="fz-1a text-center">Edit Slide</h2>
                    {success ? (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <InputField
                                    id="name"
                                    type="text"
                                    className="form-control fw-b"
                                    name='name'
                                    placeholder="Tên"
                                    defaultValue={slide.name}
                                    ref={register({
                                        required: 'Vui lòng nhập tên '
                                    })}
                                    label="Tiêu đề"
                                    error={errors.name}
                                />
                                <img src={slide.image} alt="" className="col-lg-6" />
                                <InputField
                                    id="image"
                                    type="file"
                                    className="form-control fw-b"
                                    name='image'
                                    label='Hình ảnh'
                                    id="product-photo"
                                    onChange={handleChangeImage}
                                />
                                {errors.photo && (
                                    <span className="text-danger mt-2">Bạn chưa điền thông tin</span>
                                )}
                                <div className="form-floating">
                                    <label htmlFor="floatingSelect">Danh mục</label>
                                    <select
                                        className="form-select"
                                        id="floatingSelect"
                                        name='cate_id'
                                        ref={register}
                                        defaultValue={slide.cate_id}
                                    >
                                        {categories.map((category, index) => (
                                            <option key={index} value={`${category.id}`}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="btn_ text-center">
                                <Link to="/slides" className="btn btn-success font-weight-bolder back_vc font-size-sm">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 5L4 12L11 19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M4 12H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Quay lại
                                </Link>
                                <button class="btn btn-primary" type="submit">Submit</button>
                            </div>

                        </form>
                    ) : (
                        <div className="d-flex justify-content-center mt-5">
                            <div>
                                <div className="text-center">
                                    <i className="fas fa-database" />
                                </div>
                                <div>Không có dữ liệu</div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default SlideEditPage
