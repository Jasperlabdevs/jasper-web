import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import authentication from "services/authentication";
import URL from "./URLs";
import { getToken } from "./utils";

const AuthGuard = ({ children }: any) => {
  const token = getToken();
  
  let authenticated = false;

  const getUser = () => {
    return axios.get(URL.getUser, {headers: { Authorization: `Bearer ${token}` }}).then(
      res =>{
        authenticated = true;
        
      }
      ).catch(err => {
        authentication.Logout(()=>{})
        authenticated = false
      })
  }

  useEffect(()=>{
    getUser()
  },[])
  if (token.length !== 0) {
    authenticated = true
    }


  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
