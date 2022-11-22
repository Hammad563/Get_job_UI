import axios from 'axios';
import { setCompanies, setCompanyError, setCompanyLoading } from '../redux/actions/companiesActions';


const SERVER_URL = 'http://localhost:3000/';

export const fetchCompanies = async (dispatch) => {
    let data = null
    dispatch(setCompanyLoading(true))
    await axios.get(SERVER_URL + 'api/v1/user/companies').then( (res) => {
        data = res.data
        dispatch(setCompanies(res.data))
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setCompanyError(message || 'Could not update profile'))
    })
    dispatch(setCompanyLoading(false))
    return data
}

export const createCompany = async (dispatch,name, description ) => {
    let data = null
    dispatch(setCompanyLoading(true))
    await axios.post(SERVER_URL + 'api/v1/user/companies', {
        name: name,
        description: description
    }).then( (res) => {
        data = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setCompanyError(message || 'Could not create company'))
    })
    dispatch(setCompanyLoading(false))
    return data
}

export const fetchCompanyJobs = async (dispatch,id) => {
    let data = null
    dispatch(setCompanyLoading(true))
    await axios.get(SERVER_URL + `api/v1/user/companies/jobs?id=${id}`).then( (res) => {
        data = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setCompanyError(message || 'Could not fetch jobs for your company'))
    })
    dispatch(setCompanyLoading(false))
    return data
}

export const createJob = async(dispatch, companies_id, title, city, state, country, location_query, jobType, exp, description, remote, hire_in_country, benefits, job_q, salary_range) => {
    let data = null
    dispatch(setCompanyLoading(true))
    await axios.post(SERVER_URL + "api/v1/user/companies/jobs", {
        companies_id,
        title,
        city,
        state,
        country,
        location_query,
        current_job_type: jobType,
        remote,
        experience: exp,
        description,
        hire_in_country,
        benefits,
        job_q,
        salary_range
    }).then( (res) => {
        data = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setCompanyError(message || 'Could not create job')) 
    })
    dispatch(setCompanyLoading(false))
    return data
}

export const updateJobStatus = async(dispatch, job_id, job_status) => {
    let data = null
    dispatch(setCompanyLoading(true))
    await axios.post(SERVER_URL + 'api/v1/user/companies/jobs/set_status', {
        id: job_id,
        status: job_status 
    }).then( (res) => {
        data = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setCompanyError(message || 'Could not set status')) 
    })
    dispatch(setCompanyLoading(false))
    return data
}

export const fetchSpecificJob = async (dispatch,id) => {
    let data = null
    dispatch(setCompanyLoading(true))
    await axios.get(SERVER_URL + `api/v1/user/companies/job_specific?id=${id}`).then( (res) => {
        data = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setCompanyError(message || 'Could not fetch job for your company'))
    })
    dispatch(setCompanyLoading(false))
    return data
}