
import { Navigate } from "react-router-dom";
import { getToken } from "./utils";

const  AuthGuard = ({ children }:any) => {

    const token = getToken()
    let authenticated = false

    if(token.length !== 0){
        authenticated = true
    }

    if (!authenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
}


export default AuthGuard