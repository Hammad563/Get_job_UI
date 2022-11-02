import { REMOVE_USER, SET_AUTH_ERROR, SET_AUTH_LOADING, SET_USER } from "../actionTypes/authTypes";


const AuthReducer = (state = { user: null, loading: false, error: ''}, action) => {
    switch(action.type){
        case SET_USER:
            console.log("SETTING USER", action.user)
            return {...state, user: action.user}
        case REMOVE_USER:
            return {user: null, loading: false, error: ''}
        case SET_AUTH_ERROR:
            return {...state, error: action.error}
        case SET_AUTH_LOADING:
            return {...state, loading: action.loading}
        default:
            return state
    }
}

export default AuthReducer;