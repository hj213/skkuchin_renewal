
import { REGISTER_SUCCESS, 
        REGISTER_FAIL, 
        SET_AUTH_LOADING, 
        REMOVE_AUTH_LOADING, 
        LOGIN_SUCCESS, 
        LOGIN_FAIL,
        LOGOUT_SUCCESS, 
        LOGOUT_FAIL, 
        LOAD_USER_SUCCESS,
        LOAD_USER_FAIL,
        RESET_REGISTER_SUCCESS,
        AUTHENTICATED_FAIL,
        AUTHENTICATED_SUCCESS,
        REFRESH_SUCCESS,
        REFRESH_FAIL
      } 
        from './types';

//load_user
export const load_user = () => async dispatch => {
    try {
        const res = await fetch('/api/account/user',{
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await res.json();

        if(res.status === 200){
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data
            });
        }else {
            dispatch({
                type: LOAD_USER_FAIL
            });
        }

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL
        });
    }
}


//verify
export const check_auth_status = () => async dispatch => {
    try {
        const res = await fetch('/api/account/verify',{
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
            }
        });

        if(res.status === 200){
            dispatch({
                type: AUTHENTICATED_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}

export const request_refresh = () => async dispatch => {
    try {
        const res = await fetch('/api/account/refresh', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if(res.status === 200){
            dispatch({
                type: REFRESH_SUCCESS
            });
            dispatch(check_auth_status());
        } else{
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

//회원가입
export const register = (
    nickname,
    username,
    password,
    re_password
) => async dispatch => {
    const body = JSON.stringify({
        nickname,
        username,
        password,
        re_password
    });

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch('/api/account/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        if (res.status === 201) {
            dispatch({
                type: REGISTER_SUCCESS
            });
        } else {
            dispatch({
                type: REGISTER_FAIL
            });
        }
    } catch(error) {
        dispatch({
            type: REGISTER_FAIL
        });
    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    });
};

export const reset_register_success = () => dispatch => {
    dispatch({
        type: RESET_REGISTER_SUCCESS
    });
};

// 로그인
export const login = (username, password) => async dispatch => {
    const body = JSON.stringify({
        username,
        password
    });

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS
            });
            dispatch(load_user());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch(error) {
        dispatch({
            type: LOGIN_FAIL
        });
    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    });
};

//로그아웃
export const logout = () => async dispatch => {
    try {
        const res = await fetch('/api/account/logout', {
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
        dispatch({
            type: LOGOUT_FAIL
        });
    }
}