import { REMOVE_COMPANIES, SET_COMPANIES, SET_COMPANY_ERROR, SET_COMPANY_LOADING } from "../actionTypes/companiesTypes"



const CompaniesReducer = (state={companies: null, error: null, loading: false}, action) => {
    switch(action.type){
        case SET_COMPANIES: 
        return {...state, companies: action.companies}
        case REMOVE_COMPANIES:
            return {companies: null, error: null, loading: false}
        case SET_COMPANY_ERROR:
            return {...state, error: action.error}
        case SET_COMPANY_LOADING :
            return {...state, loading: action.loading }
        default:
            return state
    }
}

export default CompaniesReducer