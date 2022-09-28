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

export const addCommunity = (data: any) => {
  let config = configuration();
  return axios.post(URL.community, { ...data }, config);
};

export const updateCommunity = (data: any, id: string) => {
  let config = configuration();
  return axios.put(URL.community + id + "/", { ...data }, config);
};

export const getCommunity = () => {
  let config = configuration();
  return axios.get(URL.community, config);
};

export const getCommunityWithID = (id: string) => {
  let config = configuration();
  return axios.get(URL.community + id + "/", config);
};


export const getCommunityAccessHistory = () => {
  let config = configuration();
  return axios.get(URL.communityAccessHistory, config);
};