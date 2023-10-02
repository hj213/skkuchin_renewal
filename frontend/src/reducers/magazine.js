import{
    ADD_MAGAZINE_FAIL,
    ADD_MAGAZINE_SUCCESS,
    LOAD_ALL_MAGAZINE_FAIL,
    LOAD_ALL_MAGAZINE_SUCCESS,
    LOAD_MAGAZINE_FAIL,
    LOAD_MAGAZINE_SUCCESS,
    CHANGE_MAGAZINE_FAIL,
    CHANGE_MAGAZINE_SUCCESS,
    DELETE_MAGAZINE_FAIL,
    DELETE_MAGAZINE_SUCCESS,
} from '../actions/magazine/types'

const initialState = {
    magazine: null,
    allMagazine: null
}

const magazineReducer = (state = initialState, action) => {
    const {type, payload} = action;
    
    switch(type){
        case ADD_MAGAZINE_SUCCESS:
            return{
                ...state
            }
        case ADD_MAGAZINE_FAIL:
            return{
                ...state
            }
        case LOAD_MAGAZINE_SUCCESS:
            return{
                ...state,
                magazine: payload
            }
        case LOAD_MAGAZINE_FAIL:
            return{
                ...state,
                magazine: null
            } 
        case LOAD_ALL_MAGAZINE_SUCCESS:
            return{
                ...state,
                allMagazine: payload
            }
        case LOAD_ALL_MAGAZINE_FAIL:
            return{
                ...state,
                allMagazine: null
            } 
        case CHANGE_MAGAZINE_SUCCESS:
            return{
                ...state
            }
        case CHANGE_MAGAZINE_FAIL:
            return{
                ...state
            }
        case DELETE_MAGAZINE_SUCCESS:
            return{
                ...state
            }
        case DELETE_MAGAZINE_FAIL:
            return{
                ...state
            }
        default:
            return state;
    }
}

export default magazineReducer;