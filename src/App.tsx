import React, { useEffect, useState } from "react";
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
import AuthGuard from "helpers/authGuard";
import { dispatchStore, getToken } from "helpers/utils";
import { getUser } from "services/helperServices";
import { setUser } from "store/actions/user";

function App() {
  const [sideBar, setSidebar] = useState<any>(false);

  const token = getToken();

  useEffect(() => {
    if (token.length > 0) {
      getUser().then(
        (res) => {
          dispatchStore(setUser(res.data));
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }, [token]);

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
            <Route path="gate_auth/:community_id/:token" element={<GateAuth />}>
              <Route index element={<GateLogin />} />
              <Route
                path="verification/:gate_id"
                element={<GateVerification />}
              />
            </Route>

            <Route
              path="settings"
              element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              }
            >
              <Route
                index
                element={
                  <AuthGuard>
                    <Navigate to="/settings/onboarding" replace />
                  </AuthGuard>
                }
              />
              <Route
                path="onboarding"
                element={
                  <AuthGuard>
                    <UserOnboarding editMode />
                  </AuthGuard>
                }
              />
              <Route
                path="access_rules"
                element={
                  <AuthGuard>
                    <AccessConfig editMode />
                  </AuthGuard>
                }
              />
              <Route
                path="community_account"
                element={
                  <AuthGuard>
                    <CommunityDetails />
                  </AuthGuard>
                }
              />
              <Route
                path="admin_account"
                element={
                  <AuthGuard>
                    <Account />
                  </AuthGuard>
                }
              />
              <Route
                path="push_notifications"
                element={
                  <AuthGuard>
                    <PushNotifications />
                  </AuthGuard>
                }
              />
            </Route>
            <Route
              path="grant_access"
              element={
                <AuthGuard>
                  <GrantAccess />
                </AuthGuard>
              }
            >
              <Route
                index
                element={
                  <AuthGuard>
                    <Navigate to="/grant_access/one_time_access" replace />
                  </AuthGuard>
                }
              />
              <Route
                path="one_time_access"
                element={
                  <AuthGuard>
                    <OneTimeAccess />
                  </AuthGuard>
                }
              />
              <Route
                path="recurring_access"
                element={
                  <AuthGuard>
                    <RecurringAccess />
                  </AuthGuard>
                }
              />
              <Route
                path="event_access"
                element={
                  <AuthGuard>
                    <EventAccess />
                  </AuthGuard>
                }
              />
              <Route
                path="multiple_access"
                element={
                  <AuthGuard>
                    <MultipleAccess />
                  </AuthGuard>
                }
              />
              <Route
                path="access_history"
                element={
                  <AuthGuard>
                    <AccessHistory />
                  </AuthGuard>
                }
              ></Route>
              <Route
                path="access_history/visitor_details"
                element={
                  <AuthGuard>
                    <VisitorDetails />
                  </AuthGuard>
                }
              />
            </Route>
            <Route
              path="community"
              element={
                <AuthGuard>
                  <Community />
                </AuthGuard>
              }
            >
              <Route
                index
                element={
                  <AuthGuard>
                    <Navigate to="members" replace />
                  </AuthGuard>
                }
              />
              <Route
                path="members"
                element={
                  <AuthGuard>
                    <Members />
                  </AuthGuard>
                }
              />
            </Route>

            <Route
              path="test"
              element={
                <AuthGuard>
                  <UserOnboarding />
                </AuthGuard>
              }
            />
            <Route
              path="gates"
              element={
                <AuthGuard>
                  <Gates />
                </AuthGuard>
              }
            />

            <Route
              path="onboarding"
              element={
                <AuthGuard>
                  <Onboarding />
                </AuthGuard>
              }
            />
            <Route
              path="dashboard"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            >
              <Route
                path=":user"
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </SideBarContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
