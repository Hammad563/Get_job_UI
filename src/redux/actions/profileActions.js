import { REMOVE_PROFILE, SET_ERROR, SET_PROFILE, SET_LOADING } from "../actionTypes/profileTypes";


export const setProfile = (profile) => ({
    type: SET_PROFILE,
    profile: profile
})

export const removeProfile = () => ({
    type: REMOVE_PROFILE,
    profile: null
})

export const setError = (error) => ({
    type: SET_ERROR,
    error: error
})

export const setLoading = (loading) => ({
    type: SET_LOADING,
    loading: loading
})