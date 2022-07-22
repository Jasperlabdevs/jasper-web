import axios from "axios";
import { getToken } from "helpers/utils";
import { useNavigate } from "react-router-dom";
import URL from "./../helpers/URLs";

const configuration = () => {
  const token = getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
};

class Authentication {
  authenticated: boolean;
  constructor() {
    this.authenticated = false;
  }

  Login(data: any, cb: any, failedCb: any) {
    axios
      .post(URL.login, { ...data }, { timeout: 100000 })
      .then((res) => {
        this.authenticated = true;
        cb(res.data.results);
      })
      .catch((err) => {
        console.log(err);
        if (!!err.response.data.message) {
          failedCb(err.response.data.message);
        } else {
          failedCb(err.response.data.detail);
        }
      });
  }

  Register(data: any, cb: any, failedCb: any) {
    axios
      .post(URL.registerManager, { ...data }, { timeout: 100000 })
      .then((res) => {
        this.authenticated = true;
        cb(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (!!err.response.data.message) {
          failedCb(err.response.data.message);
        } else {
          failedCb(err.response.data);
        }
      });
  }

  ForgetPassword(data: any, cb: any, failedCb: any) {
    axios
      .post(URL.forgotPassword, { ...data }, { timeout: 100000 })
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (!!err.response.data.message) {
          failedCb(err.response.data.message);
        } else {
          failedCb(err.response.data);
        }
      });
  }

  ResetPassword(data: any, token: any, cb: any, failedCb: any) {
    axios
      .post(URL.resetPassword, { ...data }, { params: { token: token } })
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (!!err.response.data.message) {
          failedCb(err.response.data.message);
        } else {
          failedCb(err.response.data);
        }
      });
  }

  ValidateEmail(token: any, uid: any) {
    return axios.get(URL.validateEmail, { params: { token: token, uid: uid } });
  }

  Logout(callback: any) {
    let config = configuration();
    axios.get(URL.logout, config).then(() => {
      
    }).then(()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
      this.authenticated = false;
      callback();

    })
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Authentication();
