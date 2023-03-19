import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import {
    LOAD_PLACE_FAIL,
    LOAD_PLACE_SUCCESS,
    LOAD_PLACES_FAIL,
    LOAD_PLACES_SUCCESS,
    ENROLL_PLACE_FAIL,
    ENROLL_PLACE_SUCCESS,
    MODIFY_PLACE_FAIL,
    MODIFY_PLACE_SUCCESS,
    DELETE_PLACE_SUCCESS,
    DELETE_PLACE_FAIL,
    SEARCH_PLACES_SUCCESS,
    SEARCH_PLACES_FAIL,
    CLEAR_SEARCH_RESULTS,
    SEARCH_PLACES_DISCOUNT_SUCCESS,
    SEARCH_PLACES_DISCOUNT_FAIL,
    SEARCH_PLACES_CATEGORY_SUCCESS,
    SEARCH_PLACES_CATEGORY_FAIL,
    SEARCH_PLACES_TAG_SUCCESS,
    SEARCH_PLACES_TAG_FAIL,
    SEARCH_PLACES_KEYWORD_SUCCESS,
    SEARCH_PLACES_KEYWORD_FAIL
} from './types'
import { getCoordinate } from '../../utils/getCoordinate';

//load_places
export const load_places = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
    try {
        const res = await fetch(`${API_URL}/api/place`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACES_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: LOAD_PLACES_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: LOAD_PLACES_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

//load_place
export const load_place = (id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/${id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACE_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: LOAD_PLACE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: LOAD_PLACE_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    };
}

//search_place
export const search_places = (keyword, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/search?q=${keyword}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_PLACES_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            

        } else {
            dispatch({
                type: SEARCH_PLACES_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PLACES_FAIL
        })
        
        if (callback) callback([false, error]);
    };
}

export const search_places_discount = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/search/discount`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_PLACES_DISCOUNT_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            

        } else {
            dispatch({
                type: SEARCH_PLACES_DISCOUNT_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PLACES_DISCOUNT_FAIL
        })
        
        if (callback) callback([false, error]);
    };
}

export const search_places_category = (category ,callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/search/category/${category}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_PLACES_CATEGORY_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            

        } else {
            dispatch({
                type: SEARCH_PLACES_CATEGORY_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PLACES_CATEGORY_FAIL
        })
        
        if (callback) callback([false, error]);
    };
}

export const search_places_tag = (tag, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/search/tag/${tag}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_PLACES_TAG_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            

        } else {
            dispatch({
                type: SEARCH_PLACES_TAG_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PLACES_TAG_FAIL
        })
        
        if (callback) callback([false, error]);
    };
}

export const search_places_keyword = (keyword, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/search/keyword?q=${keyword}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: SEARCH_PLACES_KEYWORD_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            

        } else {
            dispatch({
                type: SEARCH_PLACES_KEYWORD_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: SEARCH_PLACES_KEYWORD_FAIL
        })
        
        if (callback) callback([false, error]);
    };
}

export const clear_search_results = () => ({
    type: CLEAR_SEARCH_RESULTS
});

export const enroll_place = (
    data,
    callback
) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const coordinate = await getCoordinate(data.address);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('detailCategory', data.detail_category);
        formData.append('campus', data.campus);
        formData.append('gate', data.gate);
        formData.append('address', data.address);
        formData.append('xcoordinate', Number(coordinate.x));
        formData.append('ycoordinate', Number(coordinate.y));
        formData.append('serviceTime', data.service_time);
        formData.append('breakTime', data.break_time);
        formData.append('discountAvailability', data.discount_availability);
        formData.append('discountContent', data.discount_content);
    
        if (data.images && data.images.length > 0) {
            for (const image of data.images) {
                formData.append('images', image);
            }
        } else {
            formData.append('images', new File([""], { type: 'image/png' }));
        }

        const res = await fetch(`${API_URL}/api/place`, {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
            body: formData
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            dispatch({
                type: ENROLL_PLACE_SUCCESS
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: ENROLL_PLACE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: ENROLL_PLACE_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    };
}

export const modify_place = (
    place_id,
    data,
    callback
) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const coordinate = await getCoordinate(data.address);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('discountAvailability', data.discount_availability);

        formData.append('detailCategory', data.detail_category);
        formData.append('campus', data.campus);

        if (data.gate === null) {
            formData.append('gate', "기타");
        } else {
            formData.append('gate', data.gate); 
        }

        formData.append('address', data.address);
        formData.append('xcoordinate', Number(coordinate.x));
        formData.append('ycoordinate', Number(coordinate.y));

        if (data.service_time !== null) {
            formData.append('serviceTime', data.service_time);
        }

        if (data.break_time !== null) {
            formData.append('breakTime', data.break_time);
        }

        if (data.discount_availability !== null) {
            formData.append('discountAvailability', data.discount_availability);
        }

        if (data.discount_content !== null) {
            formData.append('discountContent', data.discount_content);
        }
    
        if (data.images && data.images.length > 0) {
            for (const image of data.images) {
                formData.append('images', image);
            }
        } else {
            formData.append('images', new File([""], { type: 'image/png' }));
        }
    
        if (data.urls && data.urls.length > 0) {
            for (const url of data.urls) {
                formData.append('urls', url);
            }
        } else {
            formData.append('urls', '');
        }

        const res = await fetch(`${API_URL}/api/place/${place_id}`, {
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
            body: formData
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: MODIFY_PLACE_SUCCESS
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: MODIFY_PLACE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: MODIFY_PLACE_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    };
}

export const delete_place = (place_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/${place_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_PLACE_SUCCESS
            })
            
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: DELETE_PLACE_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: DELETE_PLACE_FAIL
        })
        
        if (callback) callback([false, error]);
    }
};

export const get_no_review_places = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/noreview`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACES_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_PLACES_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: LOAD_PLACES_FAIL
        })
        
        if (callback) callback([false, error]);
    }
}

export const get_no_image_places = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/noimage`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACES_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_PLACES_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: LOAD_PLACES_FAIL
        })
        
        if (callback) callback([false, error]);
    }
}

export const get_no_menu_places = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/place/nomenu`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_PLACES_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_PLACES_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        dispatch({
            type: LOAD_PLACES_FAIL
        })
        
        if (callback) callback([false, error]);
    }
}