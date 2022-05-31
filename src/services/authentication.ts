import axios from "axios";
import URL from './../helpers/URLs'

class Authentication {
    authenticated: boolean;
    constructor() {
        this.authenticated = false;
    }

    Login(data: any, cb: any, failedCb: any) {
        axios.post(URL.login, { ...data }, {timeout: 100000})
            .then(res => {
                this.authenticated = true
                cb(res)
            }).catch(err => {
                failedCb(err.message)
                
            })
    }

    Register(data: any, cb: any, failedCb: any) {
        axios.post(URL.registerManager, { ...data }, {timeout: 100000})
            .then(res => {
                this.authenticated = true
                cb(res.data)
            }).catch(err => {
                failedCb(err.message)
            })
    }

    Logout() {
        axios.post(URL.logout,  {timeout: 100000} )
            .then(res => {
                localStorage.removeItem("token");
                this.authenticated = false

            })

    }


    isAuthenticated() {
        return this.authenticated
    }
}

export default new Authentication()
