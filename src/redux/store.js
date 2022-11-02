import {combineReducers, legacy_createStore as createStore, applyMiddleware} from 'redux'
import AuthReducer from './reducers/authReducer'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    auth: AuthReducer
})

const store = createStore(rootReducer, undefined,  applyMiddleware(thunkMiddleware))

export default store;

