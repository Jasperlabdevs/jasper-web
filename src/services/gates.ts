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

export const addGate = (data: any) => {
  let config = configuration();
  return axios.post(URL.gate, { ...data }, config);
};

export const editGate = (data: any) => {
  let config = configuration();
  return axios.put(URL.gate, { ...data }, config);
};

export const getGate = (id: any) => {
  let config = configuration();
  return axios.get(URL.getGates + id + "/", config);
};

export const getCommunityGate = () => {
  let config = configuration();
  return axios.get(URL.communityGate, config);
};

export const toggleGate = (data: any) => {
  let config = configuration();
  return axios.post(URL.toggleGate, { ...data }, config);
};

export const gateAuth = (data: any) => {
  return axios.post(URL.loginGate, { ...data });
};

export const verifyGate = (data: any )=> {
  return axios.post(URL.verifyGate, { ...data })
}

export const gateLogin = (data: any) => axios.post(URL.toggleGate, { ...data });
