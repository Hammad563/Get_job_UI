import React, { useEffect } from 'react';
import { Routes, Route, Redirect, useNavigate } from 'react-router-dom';
import HomePage from './homePage';
import {useSelector, useDispatch} from 'react-redux'
import { removeUser } from '../../redux/actions/authActions';
import { initUser } from '../../services/authServices';
import DashboardHeader from '../../components/dashboardHeader';
import CompanyDashboard from './companyDashboard';
import AllCompanies from './companiesDashboard';
import CompanyJobDashboard from './companyJobDashboard';



function CompanyIndex(props) {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  
  
      return(
        <>
        <Routes>
            <Route path="/" element={<AllCompanies></AllCompanies>}></Route>
            <Route path="/:id" element={<CompanyDashboard></CompanyDashboard>}></Route>
            <Route path="/:id/:jobId" element={<CompanyJobDashboard></CompanyJobDashboard>}></Route>
        </Routes>
        </>
      )
      
}

export default CompanyIndex