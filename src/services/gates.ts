import axios from "axios";
import URL from "helpers/URLs";

const configuration = () => {
  const token = "";
  const config = {
    headers: { Authorization: `${token}` },
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

export const getGate = () => {
  let config = configuration();
  return axios.get(URL.gate, config);
};

export const getCommunityGate = () => {
  let config = configuration();
  return axios.get(URL.communityGate, config);
};

export const toggleGate = (data: any) => {
  let config = configuration();
  return axios.post(URL.toggleGate, { ...data }, config);
};

export const gateLogin = (data: any) => axios.post(URL.toggleGate, { ...data });
