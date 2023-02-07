import {
    LOAD_REVIEWS_FAIL,
    LOAD_REVIEWS_SUCCESS,
    LOAD_REVIEW_FAIL,
    LOAD_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    MODIFY_REVIEW_FAIL,
    MODIFY_REVIEW_SUCCESS,
    ENROLL_REVIEW_FAIL,
    ENROLL_REVIEW_SUCCESS
} from './types'

//load_reviews (장소 관련 리뷰)
export const load_reviews = (place_id) => async dispatch => {
    try {
        const res = await fetch(`/api/review/place/${place_id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_REVIEWS_SUCCESS,
                payload: data
            })
        }else{
            dispatch({
                type: LOAD_REVIEWS_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: LOAD_REVIEWS_FAIL
        });
    }
}

//load_review (유저 리뷰)
//0113 매개변수 삭제 완료
export const load_review = () => async dispatch => {
    try {
        const res = await fetch('/api/review/user/me', {
            method: 'GET',
            headers: {
                'Accept' : 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_REVIEW_SUCCESS,
                payload: data
            })
        }else{
            dispatch({
                type: LOAD_REVIEW_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: LOAD_REVIEW_FAIL
        });
    }
}

// enroll review
export const enroll_review = (place_id, rate, content, images, tags) => async dispatch => {

    const formData = new FormData();
    formData.append('place_id', place_id);
    formData.append('rate', rate);
    formData.append('content', content);
    formData.append('tags', tags);

    // 태그 배열로 받은 후에 위에 지우고 주석 풀기
    // if (tags.length > 0) {
    //     for (const tag of tags) {
    //         formData.append('tags', tag);
    //     }
    // }

    if (images.length > 0) {
        for (const image of images) {
            formData.append('images', image);
        }
    }

    try {
        const res = await fetch('/api/review', {
            method: 'POST',
            body: formData
        });

        if (res.status === 201) {
            dispatch({
                type: ENROLL_REVIEW_SUCCESS
            });
        } else {
            dispatch({
                type: ENROLL_REVIEW_FAIL
            });
        }
    } catch(error) {
        console.log(error)
        dispatch({
            type: ENROLL_REVIEW_FAIL
        });
    }
};

// modify review
export const modify_review = (review_id, rate, content, images, tags) => async dispatch => {

    const formData = new FormData();
    formData.append('rate', rate);
    formData.append('content', content);
    formData.append('tags', tags);

    // 태그 배열로 받은 후에 위에 지우고 주석 풀기
    // if (tags.length > 0) {
    //     for (const tag of tags) {
    //         formData.append('tags', tag);
    //     }
    // }

    if (images.length > 0) {
        for (const image of images) {
            formData.append('images', image);
        }
    }

    try {
        const res = await fetch(`/api/review/${review_id}`, {
            method: 'PUT',
            body: formData
        });

        if (res.status === 201) {
            dispatch({
                type: MODIFY_REVIEW_SUCCESS
            });
        } else {
            dispatch({
                type: MODIFY_REVIEW_FAIL
            });
        }
    } catch(error) {
        dispatch({
            type: MODIFY_REVIEW_FAIL
        });
    }
};

// delete review
export const delete_review = (review_id) => async dispatch => {

    try {
        const res = await fetch(`/api/review/${review_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'application/json',
            },
        });

        if (res.status === 200) {
            dispatch({
                type: DELETE_REVIEW_SUCCESS
            });
        } else {
            dispatch({
                type: DELETE_REVIEW_FAIL
            });
        }
    } catch(error) {
        dispatch({
            type: DELETE_REVIEW_FAIL
        });
    }
};

