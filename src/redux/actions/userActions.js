import { SET_USER_ERROR, SET_USER_LOADING } from "../actionTypes/userTypes"



export const setUserError = (error) => ({
    type: SET_USER_ERROR,
    error: error
})

export const setUserLoading = (loading) => ({
    type: SET_USER_LOADING,
    loading: loading
})