import { REMOVE_PROFILE, SET_ERROR, SET_LOADING, SET_PROFILE } from "../actionTypes/profileTypes";

const ProfileReducer = (state = { profile: null, loading: false, error: ''}, action) => {
    switch(action.type){
        case SET_PROFILE:
            return{...state, profile: action.profile}
        case REMOVE_PROFILE:
            return{profile: null, loading: false, error: ''}
        case SET_LOADING:
            return{...state, loading: action.loading}
        case SET_ERROR:
            return{...state, error: action.error}
        default:
            return state;
    }
}

export default ProfileReducer