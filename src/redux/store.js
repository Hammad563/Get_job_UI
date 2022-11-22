import {combineReducers, legacy_createStore as createStore, applyMiddleware} from 'redux'
import AuthReducer from './reducers/authReducer'
import thunkMiddleware from 'redux-thunk'
import ProfileReducer from './reducers/profileReducer'
import CompaniesReducer from './reducers/companiesReducer'

const rootReducer = combineReducers({
    auth: AuthReducer,
    userProfile: ProfileReducer,
    companies: CompaniesReducer
})

const store = createStore(rootReducer, undefined,  applyMiddleware(thunkMiddleware))

export default store;

