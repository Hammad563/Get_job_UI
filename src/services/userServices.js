import axios from 'axios';
import { setUserError, setUserLoading } from '../redux/actions/userActions';
const SERVER_URL = 'http://localhost:3000/api/v1/';


export const searchJobs = async (dispatch,query,page) => {
    setUserLoading(true)
    let data = null
    await axios.get(SERVER_URL + `user/search?query=${query}&page=${page+1}`).then( (res) => {
        data = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setUserError(message || 'Could not update profile'))
    })
    setUserLoading(false)
    return data

}

export const jobFeed = async (dispatch,query, page) => {
    setUserLoading(true)
    let data = null
    await axios.get(SERVER_URL + `user/jobfeed?query=${query}&page=${page}`).then( (res) => {
        data = res.data
    }).catch( (e) => {
        let message = e.response && e.response.data && e.response.data.response_message;
        dispatch(setUserError(message || 'Could not update profile'))
    })
    setUserLoading(false)
    return data
}