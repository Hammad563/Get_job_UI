import React, { useEffect } from 'react';
import { Routes, Route, Redirect, useNavigate } from 'react-router-dom';
import HomePage from './homePage';
import {useSelector, useDispatch} from 'react-redux'
import { removeUser } from '../../redux/actions/authActions';
import { initUser } from '../../services/authServices';
import DashboardHeader from '../../components/dashboardHeader';
import ProfileSummary from './profile';
import ProfileEdit from './profileEdit';



function UserRouter(props) {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let currentUser = useSelector( (state) => state.auth.user)
  let loading = useSelector( (state) => state.auth.loading)
  useEffect( () => {
    if(!currentUser && !loading){
      try{
        let res = initUser(dispatch)
        console.log("res", res)
        if(!res){
          navigate('/auth')
        }
      } catch (e){
        dispatch(removeUser())
      }
    }
  }, [currentUser])

      return(
        <>
        <DashboardHeader></DashboardHeader>
        <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/profile/overview" element={<ProfileSummary></ProfileSummary>}></Route>
            <Route path="/profile/edit" element={<ProfileEdit></ProfileEdit>}></Route>
        </Routes>
        </>
      )
      
}

export default UserRouter