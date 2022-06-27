import axios from "axios";
import URL from "./../helpers/URLs";

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

  Logout() {
    axios.post(URL.logout, { timeout: 100000 }).then((res) => {
      localStorage.removeItem("token");
      this.authenticated = false;
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Authentication();
