import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

        </Route>
        <Route element={<Settings />} >
            <Route path='/settings/onboarding' element={<UserOnboarding/>}  /> 
            <Route path='/settings/access_rules' element={<AccessConfig/>}  /> 
            <Route path='/settings/community_account' element={<CommunityDetails/>}  /> 
            <Route path='/settings/admin_account' element={<Account/>}  /> 
            <Route path='/settings/push_notifications' element={<PushNotifications/>}  /> 
        </Route> 
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
