import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    CHECK_USERNAME_SUCCESS,
    CHECK_USERNAME_FAIL,
    CHECK_NICKNAME_SUCCESS,
    CHECK_NICKNAME_FAIL,
    CHANGE_USER_SUCCESS,
    CHANGE_USER_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CHANGE_TOGGLE_SUCCESS,
    CHANGE_TOGGLE_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    FIND_USERNAME_SUCCESS,
    FIND_USERNAME_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} 
    from './types';

export const register = (registerData, callback) => async dispatch => {
    const body = JSON.stringify(registerData);

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch('/api/user/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const data = await res.json();

        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        
        if (res.status === 201) {
            console.log("suc");
            dispatch({
                type: REGISTER_SUCCESS
            });
            if (callback) callback([true, data.success]);
        } else {
            console.log("fail");
            dispatch({
                type: REGISTER_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: REGISTER_FAIL
        });
        if (callback) callback([false, error]);
    }
};

export const login = (username, password, callback) => async dispatch => {
    const body = JSON.stringify({
        username,
        password
    });

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });
            dispatch(load_user());
            if (callback) callback([true, data.success]);
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL
        });
        if (callback) callback([false, error]);
    }
};

export const logout = () => async dispatch => {
    try {
        const res = await fetch('/api/user/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (res.status === 200){
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch(error){
        console.log(error);
        dispatch({
            type: LOGOUT_FAIL
        });
    }
}

export const load_user = () => async dispatch => {
    try {
        const res = await fetch('/api/user/me',{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data
            });
        } else {
            console.log(data)
            dispatch({
                type: LOAD_USER_FAIL,
                payload: data
            });
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_USER_FAIL
        });
    }
}


export const request_verify = () => async dispatch => {
    try {
        const res = await fetch('/api/user/token/verify',{
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
            }
        });

        if (res.status === 200) {
            dispatch({
                type: AUTHENTICATED_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
            dispatch(request_verify());
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}

export const request_refresh = () => async dispatch => {
    try {
        const res = await fetch('/api/user/token/refresh', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: REFRESH_SUCCESS
            });
            dispatch(request_verify());
        } else{
            dispatch({
                type: REFRESH_FAIL,
                payload: data
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const check_username = (username, callback) => async dispatch => {
    const body = JSON.stringify({
        username
    });

    try {
        const res = await fetch('/api/user/check/username', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: CHECK_USERNAME_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        } else{
            dispatch({
                type: CHECK_USERNAME_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHECK_USERNAME_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const check_nickname = (nickname, callback) => async dispatch => {
    const body = JSON.stringify({
        nickname
    });

    try {
        const res = await fetch('/api/user/check/nickname', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: CHECK_NICKNAME_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        } else{
            dispatch({
                type: CHECK_NICKNAME_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHECK_NICKNAME_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const change_user = (nickname, major, image, student_id, callback) => async dispatch => {
    const body = JSON.stringify({
        nickname, major, image, student_id
    });

    try {
        const res = await fetch('/api/user/me', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: CHANGE_USER_SUCCESS
            });
            if (callback) callback([true, data.success]);
        } else{
            dispatch({
                type: CHANGE_USER_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_USER_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const change_password = (password, new_password, new_re_password, callback) => async dispatch => {
    const body = JSON.stringify({
        password,
        new_password,
        new_re_password
    });

    try {
        const res = await fetch('/api/user/password', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: CHANGE_PASSWORD_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        } else{
            dispatch({
                type: CHANGE_PASSWORD_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_PASSWORD_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const change_toggle = (campus) => async dispatch => {
    const body = JSON.stringify({
        campus
    });

    try {
        const res = await fetch('/api/user/toggle', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        if(res.status === 200){
            dispatch({
                type: CHANGE_TOGGLE_SUCCESS
            });
        } else{
            dispatch({
                type: CHANGE_TOGGLE_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_TOGGLE_FAIL
        });
    }
}

export const delete_user = (callback) => async dispatch => {

    try {
        const res = await fetch('/api/user/me', {
            method: 'DELETE'
        });

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        } else {
            dispatch({
                type: DELETE_USER_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: DELETE_USER_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const find_username = (email, callback) => async dispatch => {
    const body = JSON.stringify({
        email
    });

    try {
        const res = await fetch('/api/user/find/username', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if (res.status === 200) {
            console.log("test1");
            dispatch({
                type: FIND_USERNAME_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        } else {
            console.log("test2");
            dispatch({
                type: FIND_USERNAME_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        console.log("test3");
        console.log(error);
        dispatch({
            type: FIND_USERNAME_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const reset_password = (email, new_password, new_re_password, callback) => async dispatch => {
    const body = JSON.stringify({
        email,
        new_password,
        new_re_password
    });

    try {
        const res = await fetch('/api/user/password/reset', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: data
            });
            if (callback) callback([true, data.success]);
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: data
            });
            if (callback) callback([false, data.error]);
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
        if (callback) callback([false, error]);
    }
}