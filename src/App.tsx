import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from 'pages/Auth';
import Home from 'pages/Auth/Home';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ForgotPassword from 'pages/Auth/ForgotPassword'
import Onboarding from 'pages/Onboarding';
import Dashboard from 'pages/Dashboard';
import ResetPassword from 'pages/Auth/ResetPassword';
import Settings from 'pages/Settings';
import UserOnboarding from 'components/UserOnboading';
import AccessConfig from 'components/AccesConfig';
import CommunityDetails from 'components/CommunityDetails';
import Account from 'components/Account';
import PushNotifications from 'components/PushNotifications';
import Verification from 'pages/Auth/Verification';
import GateAuth from 'pages/GateAuth';
import GateVerification from 'pages/GateAuth/GateVerification';
import GateLogin from 'pages/GateAuth/GateLogin';
import GrantAccess from 'pages/GrantAccess';
import OneTimeAccess from 'pages/GrantAccess/OneTimeAccess';
import RecurringAccess from 'pages/GrantAccess/RecurringAccess';
import EventAccess from 'pages/GrantAccess/EventAccess';
import MultipleAccess from 'pages/GrantAccess/MultipleAccess';
import AccessHistory from 'pages/GrantAccess/AccessHistory';
import VisitorDetails from 'pages/GrantAccess/VisitorDeatils';
import Gates from 'pages/Gates';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<Auth />} >
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot_password' element={<ForgotPassword />} />
            <Route path='/reset_password' element={<ResetPassword />} />
            <Route path='/verification' element={<Verification />} />

        </Route>
        <Route element={<GateAuth/>} >
            <Route path='/gate_auth' element={<GateLogin/>}/>
            <Route path='/gate_auth/verification' element={<GateVerification/>} />
        </Route>
        <Route element={<Settings />} >
            <Route path='/settings' element={<Navigate to="/settings/onboarding" replace />} />
            <Route path='/settings/onboarding' element={<UserOnboarding/>}  /> 
            <Route path='/settings/access_rules' element={<AccessConfig/>}  /> 
            <Route path='/settings/community_account' element={<CommunityDetails/>}  /> 
            <Route path='/settings/admin_account' element={<Account/>}  /> 
            <Route path='/settings/push_notifications' element={<PushNotifications/>}  /> 
        </Route> 
        <Route element={<GrantAccess />} >
            <Route path='/grant_access' element={<Navigate to="/grant_access/one_time_access" replace />} />
            <Route path='/grant_access/one_time_access' element={<OneTimeAccess/>}  /> 
            <Route path='/grant_access/recurring_access' element={<RecurringAccess/>}  /> 
            <Route path='/grant_access/event_access' element={<EventAccess/>}  /> 
            <Route path='/grant_access/multiple_access' element={<MultipleAccess/>}  /> 
            <Route path='/grant_access/access_history' element={<AccessHistory/>}  /> 
            <Route path='/grant_access/access_history/visitor_details' element={<VisitorDetails/>}  /> 
            
        </Route> 
        <Route path='gates' element={<Gates />} />
        <Route path='/onboarding' element={<Onboarding/>} />
        <Route path='/dashboard' element={<Dashboard/>} >
        <Route path='/dashboard/:user' element={<Dashboard/>} />

        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
