import axios from "axios";
import URL from "helpers/URLs";
import { getToken } from "helpers/utils";

const configuration = () => {
  const token = getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
};

export const setAccessRules = (data:any) => {
    let config = configuration()
    return axios.post(URL.accessRules, {...data}, config)
}