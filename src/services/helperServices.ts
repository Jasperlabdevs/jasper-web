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

export const getCommunityTypes = () => {
  return axios.get(URL.communityTypes);
};
export const getOccupancyTypes = () => {
  let config = configuration();
  return axios.get(URL.occuoantTypes, config);
};
