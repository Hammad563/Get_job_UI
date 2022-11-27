import {combineReducers, legacy_createStore as createStore, applyMiddleware} from 'redux'
import AuthReducer from './reducers/authReducer'
import thunkMiddleware from 'redux-thunk'
import ProfileReducer from './reducers/profileReducer'
import CompaniesReducer from './reducers/companiesReducer'
import UserReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    auth: AuthReducer,
    userProfile: ProfileReducer,
    companies: CompaniesReducer,
    user: UserReducer
})

const store = createStore(rootReducer, undefined,  applyMiddleware(thunkMiddleware))

export default store;

