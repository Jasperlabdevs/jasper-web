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
  return axios.post(URL.community, { ...data });
};

export const getCommunity = () => {
  let config = configuration()
  return axios.get(URL.community, config)
}
