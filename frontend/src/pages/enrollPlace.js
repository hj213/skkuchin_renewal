import { useState } from "react";
import { useDispatch } from "react-redux";
import { enroll_place } from '../actions/place/place';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { clear_search_results } from '../actions/place/place';
import { check_admin } from '../actions/auth/auth';
import dynamic from 'next/dynamic';

const EnrollPlace = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(check_admin());
        return (() => {
            dispatch(clear_search_results());
        })
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        category: "한식",
        detail_category: "",
        campus: "명륜",
        gate: "기타",
        address: "",
        service_time: "",
        break_time: "",
        discount_availability: false,
        discount_content: "",
        images: []
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(enroll_place(formData, ([result, message]) => {
            if (result) {
                alert(message);
                router.back();
            } else {
                alert("장소 등록 실패");
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

    return (
        <div>
            <div>
                <label>
                * 이름:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                </label>
            </div>
            <div>
                <label>
                * 카테고리:
                <select name="category" value={formData.category} onChange={handleInputChange}>
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
                    <option value="금잔디">금잔디</option>
                    <option value="일반">일반</option>
                </select>
                </label>
            </div>
            <div>
                <label>
                * 세부 카테고리:
                <input
                    type="text"
                    name="detail_category"
                    value={formData.detail_category}
                    onChange={handleInputChange}
                    required
                />
                </label>
            </div>
            <div>
                <label>
                * 캠퍼스:
                <select name="campus" value={formData.campus} onChange={handleInputChange}>
                    <option value="명륜">명륜</option>
                    <option value="율전">율전</option>
                </select>
                </label>
            </div>
            <div>
                <label>
                위치:
                <select name="gate" value={formData.gate} onChange={handleInputChange}>
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
                * 주소:
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
                </label>
            </div>
            <div>
                <label>
                영업시간:
                <textarea
                    name="service_time"
                    value={formData.service_time}
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
                    value={formData.break_time}
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
                    checked={formData.discount_availability}
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
                    value={formData.discount_content}
                    onChange={handleInputChange}
                />
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
            <button onClick={handleSubmit}>등록</button>
        </div>
    );
};
    
export default dynamic(() => Promise.resolve(EnrollPlace), {
    ssr: false,
});
