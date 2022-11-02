import { SET_USER, REMOVE_USER, SET_AUTH_LOADING, SET_AUTH_ERROR } from "../actionTypes/authTypes";


export const setUser = (user) => ({
    type: SET_USER,
    user: user
})
export const removeUser = () => ({
    type: REMOVE_USER,
    user: null,
});

export const setAuthLoading = (loading) => ({
    type: SET_AUTH_LOADING,
    loading: loading,
});


export const setAuthError = (error) => ({
    type: SET_AUTH_ERROR,
    error: error
})