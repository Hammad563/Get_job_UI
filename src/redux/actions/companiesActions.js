import { REMOVE_COMPANIES, SET_COMPANIES, SET_COMPANY_ERROR,SET_COMPANY_LOADING } from "../actionTypes/companiesTypes";

export const setCompanies = (companies) => ({
    type: SET_COMPANIES,
    companies: companies
})

export const removeCompanies = () => ({
    type: REMOVE_COMPANIES,
    companies: null
})

export const setCompanyError = (error) => ({
    type: SET_COMPANY_ERROR,
    error: error
})

export const setCompanyLoading = (loading) => ({
    type: SET_COMPANY_LOADING,
    loading: loading
})