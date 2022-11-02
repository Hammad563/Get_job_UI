import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Redirect, useNavigate } from 'react-router-dom';
import LandingHeader from '../../components/landingHeader';
import { removeUser } from '../../redux/actions/authActions';
import { initUser } from '../../services/authServices';
import Landing from './landingPage';
import Login from './login';
import Register from './register';



function AuthRouter(props) {
    
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let currentUser = useSelector( (state) => state.auth.user)
  let loading = useSelector( (state) => state.auth.loading)
  useEffect( () => {
    if(!currentUser && !loading){
      try{
        initUser(dispatch)
      } catch (e){
        dispatch(removeUser())
        navigate('/auth')
      }
    }
  }, [currentUser])

  if(currentUser){
    navigate('/')
  }

      return(
        <div className='root'>
            <Routes>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/Register" element={<Register></Register>}></Route>
                <Route path="/" element={<Landing></Landing>}></Route>
            </Routes>
        </div>
      )
      
}

export default AuthRouter