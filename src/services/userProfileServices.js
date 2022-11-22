import axios from 'axios';
import { setError, setLoading, setProfile } from "../redux/actions/profileActions"

const SERVER_URL = 'http://localhost:3000/';
export const updateProfile = async (dispatch, name, roles, yrsExp, bio, github, website, skills, achievements, city, state, country, location_query) => {
    dispatch(setLoading(true))
    let userProfile = null
    await axios.post(SERVER_URL + 'api/v1/user/profile_update', {
        name: name,
        jobrole_list: roles,
        experience: yrsExp,
        skill_list: skills,
        bio: bio,
        url: website,
        github: github,
        achievements: achievements,
        city,
        state,
        country,
        location_query
    }).then( (res) => {
        userProfile = res.data
        dispatch(setProfile(userProfile))
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setError(message || 'Could not update profile'))
    })
    dispatch(setLoading(false));
    return userProfile
}

export const fetchProfile = async(dispatch) => {
    dispatch(setLoading(true))
    let userProfile = null
    await axios.get(SERVER_URL + 'api/v1/user/profile').then( (res) => {
        console.log("res.data", res.data)
        dispatch(setProfile(res.data))
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setError(message || 'Could not fetch profile'))
    })
    dispatch(setLoading(false));
    return userProfile
}

export const addExperience = async (dispatch, profileId, company, title, startDate, endDate, current_work, description ) => {
    dispatch(setLoading(true))
    let result = null
    await axios.post(SERVER_URL + 'api/v1/user/profile/create_exp', {
        profile_id: profileId,
        company: company,
        title: title,
        start_date: startDate,
        end_date: endDate,
        current_work,
        description
    }).then( (res) => {
        result = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setError(message || 'Could not create work experience'))
    })
    dispatch(setLoading(false))
    return result
}   

export const deleteWorkExperience = async (dispatch, profileId) => {
    dispatch(setLoading(true))
    let result = null
    await axios.post(SERVER_URL + 'api/v1/user/profile/delete_exp', {
        id: profileId,
    }).then( (res) => {
        result = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setError(message || 'Could not delete work experience'))
    })
    dispatch(setLoading(false))
    return result
}

export const updateWorkExperience = async (dispatch, profileId, company, title, startDate, endDate, current_work, description) => {
    dispatch(setLoading(true))
    let result = null
    await axios.post(SERVER_URL + 'api/v1/user/profile/update_exp', {
        id: profileId,
        company: company,
        title: title,
        start_date: startDate,
        end_date: endDate,
        current_work,
        description
    }).then( (res) => {
        result = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setError(message || 'Could not update work experience'))
    })
    dispatch(setLoading(false))
    return result
}