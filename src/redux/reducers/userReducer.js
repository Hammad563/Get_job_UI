import { SET_USER_ERROR, SET_USER_LOADING } from "../actionTypes/userTypes";


const UserReducer = (state = { loading: false, error: ''}, action) => {
    switch(action.type){
        case SET_USER_LOADING:
            return{...state, loading: action.loading}
        case SET_USER_ERROR:
            return{...state, error: action.error}
        default:
            return state;
    }
}

export default UserReducer