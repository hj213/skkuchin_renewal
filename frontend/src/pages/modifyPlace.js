import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify_place, load_place, clear_search_results } from '../actions/place/place';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { load_menu } from '../actions/menu/menu';
import Image from 'next/image';
import { check_admin } from '../actions/auth/auth';

const EnrollPlace = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const place = useSelector(state => state.place.place);

    const place_id = router.query.place_id;

    useEffect(() => {
        dispatch(check_admin());
        return (() => {
            dispatch(clear_search_results());
        })
    }, [])

    useEffect(() => {
        if (place_id) {
            dispatch(load_place(place_id, ([result, message]) => {
                dispatch(load_menu(place_id));
            }));
        }
    }, [place_id]);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        detail_category: "",
        campus: "",
        gate: "",
        address: "",
        service_time: "",
        break_time: "",
        discount_availability: false,
        discount_content: "",
        urls: [],
        images: []
    });

    useEffect(() => {
        if (formData && place) {
            setFormData({
                ...formData,
                name: place.name,
                category: place.category,
                detail_category: place.detail_category,
                campus: place.campus,
                gate: place.gate,
                address: place.address,
                service_time: place.service_time,
                break_time: place.break_time,
                discount_availability: place.discount_availability,
                discount_content: place.discount_content,
                urls: place.images
            });
        }
    }, [place]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(modify_place(place_id, formData, ([result, message]) => {
            if (result) {
                alert(message);
                router.back();
            } else {
                alert(message);
            }
        }));
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setFormData({
            ...formData,
            images: formData.images.concat(files)
        });
    };

    const deleteImage = (index, event) => {
        event.preventDefault();
        const urls = [...formData.urls];
        urls.splice(index, 1);
    
        setFormData({
            ...formData,
            urls: urls
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                이름:
                <input
                    type="text"
                    name="name"
                    value={formData ? formData.name : ''}
                    onChange={handleInputChange}
                    required
                />
                </label>
            </div>
            <div>
                <label>
                카테고리:
                <select name="category" value={formData ? formData.category : ""} onChange={handleInputChange}>
                    <option value="한식">한식</option>
                    <option value="일식">일식</option>
                    <option value="중식">중식</option>
                    <option value="양식">양식</option>
                    <option value="일식">일식</option>
                    <option value="남미음식">남미음식</option>
                    <option value="분식">분식</option>
                    <option value="아시아음식">아시아음식</option>
                    <option value="기타">기타</option>
                    <option value="카페">카페</option>
                    <option value="술집">술집</option>
                    <option value="일반">일반</option>
                </select>
                </label>
            </div>
            <div>
                <label>
                세부 카테고리:
                <input
                    type="text"
                    name="detail_category"
                    value={formData ? formData.detail_category : ''}
                    onChange={handleInputChange}
                />
                </label>
            </div>
            <div>
                <label>
                캠퍼스:
                <select name="campus" value={formData ? formData.campus : ""} onChange={handleInputChange}>
                    <option value="명륜">명륜</option>
                    <option value="율전">율전</option>
                </select>
                </label>
            </div>
            <div>
                <label>
                위치:
                <select name="gate" value={formData ? formData.gate : ""} onChange={handleInputChange}>
                    <option value="정문">정문</option>
                    <option value="쪽문">쪽문</option>
                    <option value="후문">후문</option>
                    <option value="철문">철문</option>
                    <option value="대학로">대학로</option>
                    <option value="기타">기타</option>
                </select>
                </label>
            </div>
            <div>
                <label>
                주소:
                <input
                    type="text"
                    name="address"
                    value={formData ? formData.address : ''}
                    onChange={handleInputChange}
                    required
                />
                </label>
            </div>
            <div>
                <label>
                영업시간:
                <input
                    type="text"
                    name="service_time"
                    value={formData ? formData.service_time : ''}
                    onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                휴식시간:
                <input
                    type="text"
                    name="break_time"
                    value={formData ? formData.break_time : ''}
                    onChange={handleInputChange}
                />
                </label>
            </div>
            <div>
                <label>
                학생 할인:
                <input
                    type="checkbox"
                    name="discount_availability"
                    checked={formData ? formData.discount_availability : ''}
                    onChange={handleInputChange}
                />
                </label>
            </div>
            <div>
                <label>
                할인 내용:
                <input
                    type="text"
                    name="discount_content"
                    value={formData ? formData.discount_content : ''}
                    onChange={handleInputChange}
                />
                </label>
            </div>
            <div>
                <label>
                기존 사진:
                <div style={{width: '100%', height: '200px', overflowX: 'auto', whiteSpace: 'nowrap'}}>
                {formData && formData.urls && formData.urls.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {formData.urls.map((url, index) => (
                        <div key={index} style={{ marginRight: '10px', position: 'relative' }}>
                            <Image 
                                src={url}
                                alt={`Image ${index}`}
                                width={150}
                                height={150}
                                layout='fixed'
                                objectFit='cover'
                                placeholder='blur'
                                blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='                    
                            />
                            <button 
                                onClick={(event) => deleteImage(index, event)}
                                style={{ position: 'absolute', top: '5px', right: '5px' }}
                            >
                            삭제
                            </button>
                        </div>
                    ))}
                </div>
                )}
                </div>
                </label>
            </div>
            <div>
                <label>
                사진 추가:
                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
                </label>
            </div>
            <button type="submit">등록</button>
        </form>
    );
};
    
export default EnrollPlace;
