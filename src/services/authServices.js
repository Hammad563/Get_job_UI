import axios from 'axios';
import decode from 'jwt-decode';
import moment from 'moment';
import { removeUser, setAuthError, setAuthLoading, setUser } from '../redux/actions/authActions';

const USER_TOKEN = 'usertoken';
const SERVER_URL = 'http://localhost:3000/';


export const logIN = async (navigate,dispatch, email,password) => {
    let user = null;
    dispatch(setAuthLoading(true))
    await axios.post(SERVER_URL + 'api/v1/login', {
        email: email,
        password: password,
        grant_type: 'password'
    }).then( (res) => {
        if(res && res.data && res.data.response_code == 'devise.failure.unconfirmed'){
            navigate("/auth/unconfirmed")
        }else{
            const token = res.data;
            console.log("token",token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
            try{
                localStorage.setItem(USER_TOKEN, JSON.stringify(token))
                const decodedToken = decode(token.access_token);
                console.log("decodedToken", decodedToken)
                user = decodedToken.user;
                dispatch(setUser(user))
                navigate("/")
            } catch(e) {
                console.log("ERROR", e)
                delete axios.defaults.headers.common['Authorization'];
            }
        }
    }).catch( (e) => {
       let message = e.response && e.response.data && e.response.data.response_message;
       console.log(message || 'Invalid username/password')
       delete axios.defaults.headers.common['Authorization'];
    })
    dispatch(setAuthLoading(false))
    return user
}

export const initUser = (dispatch) => {
    dispatch(setAuthLoading(true))
    let token = null;
    token = JSON.parse(localStorage.getItem(USER_TOKEN))

    if(!token){
        if (axios.defaults.headers.common['Authorization']) delete axios.defaults.headers.common['Authorization'];
        dispatch(removeUser())
        dispatch(setAuthLoading(false))
        return null
    }else{
        let user = null;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
        try{
            const decoded = decode(token.access_token);
            user = decoded.user;
            dispatch(setUser(user))
            setAuthLoading(false)
        }catch(e){
            dispatch(setAuthError("Could not initalize user"))
            dispatch(removeUser())
            user = null;
            setAuthLoading(false)
        }
        return user
    }
}

export const logout = async (dispatch) => {
    let result = false
    dispatch(setAuthLoading(true))
    localStorage.removeItem(USER_TOKEN)
    await axios.post(SERVER_URL + 'api/v1/logout').then( (res) => {
        result = true
        delete axios.defaults.headers.common['Authorization'];
        dispatch(removeUser());
        dispatch(setAuthLoading(false))

    }).catch( (e) => {
        dispatch(setAuthError("Could not logout" || e.message))
        dispatch(removeUser())
        dispatch(setAuthLoading(false))
        result = false;
    })
    return result
}