import { 
    GET_FAV_SUCCESS,
    GET_FAV_FAIL,
    ENROLL_FAV_SUCCESS,
    ENROLL_FAV_FAIL,
    DELETE_FAV_SUCCESS,
    DELETE_FAV_FAIL,
    // RESET_GET_FAV_SUCCESS,
    // SET_FAV_LOADING,
    // REMOVE_FAV_LOADING
} 
    from './types';


// load(get) FAV
export const load_favorite = () => async dispatch => {
    try {
        const res = await fetch('/api/map/favorite',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: GET_FAV_SUCCESS,
                payload: data
            });
        }else {
            dispatch({
                type: GET_FAV_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: GET_FAV_FAIL
        });
    }
}


// enroll fav
export const enroll_favorite = (place_id) => async dispatch => {
    const body = JSON.stringify({
        place_id
    });

    try {
        const res = await fetch('/api/map/enrollFav', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        if (res.status === 200) {
            dispatch({
                type: ENROLL_FAV_SUCCESS
            });
            dispatch(load_favorite());
        } else {
            dispatch({
                type: ENROLL_FAV_FAIL
            });
        }
    } catch(error) {
        dispatch({
            type: ENROLL_FAV_FAIL
        });
    }
};

// del fav
export const delete_favorite = (place_id) => async dispatch => {
    const body = JSON.stringify({
        place_id
    });

    try {
        const res = await fetch('/api/map/delFav', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        if (res.status === 200) {
            dispatch({
                type: DELETE_FAV_SUCCESS
            });
            dispatch(load_favorite());
        } else {
            dispatch({
                type: DELETE_FAV_FAIL
            });
        }
    } catch(error) {
        dispatch({
            type: DELETE_FAV_FAIL
        });
    }
};


// export const reset_get_fav_success =() => dispatch => {
//     dispatch({
//         type: RESET_GET_FAV_SUCCESS
//     });    
// }
