import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "pages/Auth";
import Home from "pages/Auth/Home";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import ForgotPassword from "pages/Auth/ForgotPassword";
import Onboarding from "pages/Onboarding";
import Dashboard from "pages/Dashboard";
import ResetPassword from "pages/Auth/ResetPassword";
import Settings from "pages/Settings";
import UserOnboarding from "components/UserOnboading";
import AccessConfig from "components/AccesConfig";
import CommunityDetails from "components/CommunityDetails";
import Account from "components/Account";
import PushNotifications from "components/PushNotifications";
import Verification from "pages/Auth/Verification";
import GateAuth from "pages/GateAuth";
import GateVerification from "pages/GateAuth/GateVerification";
import GateLogin from "pages/GateAuth/GateLogin";
import GrantAccess from "pages/GrantAccess";
import OneTimeAccess from "pages/GrantAccess/OneTimeAccess";
import RecurringAccess from "pages/GrantAccess/RecurringAccess";
import EventAccess from "pages/GrantAccess/EventAccess";
import MultipleAccess from "pages/GrantAccess/MultipleAccess";
import AccessHistory from "pages/GrantAccess/AccessHistory";
import VisitorDetails from "pages/GrantAccess/VisitorDeatils";
import Gates from "pages/Gates";
import Community from "pages/Community";
import Members from "pages/Community/Members";
import NotFound from "components/NotFound";
import ValidateEmail from "pages/Auth/validateEmail";
import { Helmet } from "react-helmet";
import { SideBarContext } from "helpers/context";

function App() {
  const [sideBar, setSidebar] = useState<any>(false);

  return (
    <div className="App">
      <Helmet>
        <title>Jasper</title>
        <meta name="description" content="" />
      </Helmet>
      <BrowserRouter>
        <SideBarContext.Provider value={{ sideBar, setSidebar }}>
          <Routes>
            <Route element={<Auth />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/reset_password" element={<ResetPassword />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/validate_email" element={<ValidateEmail />} />
            </Route>
            <Route path="gate_auth/:community_id" element={<GateAuth />}>
              <Route index element={<GateLogin />} />
              <Route
                path="verification/:gate_id"
                element={<GateVerification />}
              />
            </Route>
            <Route path="settings" element={<Settings />}>
              <Route
                index
                element={<Navigate to="/settings/onboarding" replace />}
              />
              <Route path="onboarding" element={<UserOnboarding />} />
              <Route path="access_rules" element={<AccessConfig />} />
              <Route path="community_account" element={<CommunityDetails />} />
              <Route path="admin_account" element={<Account />} />
              <Route
                path="push_notifications"
                element={<PushNotifications />}
              />
            </Route>
            <Route path="grant_access" element={<GrantAccess />}>
              <Route
                index
                element={
                  <Navigate to="/grant_access/one_time_access" replace />
                }
              />
              <Route path="one_time_access" element={<OneTimeAccess />} />
              <Route path="recurring_access" element={<RecurringAccess />} />
              <Route path="event_access" element={<EventAccess />} />
              <Route path="multiple_access" element={<MultipleAccess />} />
              <Route path="access_history" element={<AccessHistory />}></Route>
              <Route
                path="access_history/visitor_details"
                element={<VisitorDetails />}
              />
            </Route>
            <Route path="community" element={<Community />}>
              <Route index element={<Navigate to="members" replace />} />
              <Route path="members" element={<Members />} />
            </Route>

            <Route path="test" element={<UserOnboarding />} />
            <Route path="gates" element={<Gates />} />

            <Route path="onboarding" element={<Onboarding />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path=":user" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SideBarContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
