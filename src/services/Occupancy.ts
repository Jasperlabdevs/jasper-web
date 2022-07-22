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

export const chooseOccupancyType = (data: any) => {
  let config = configuration();
  return axios.post(URL.chooseOccupancyType, { ...data }, config);
};

export const getSelectedOccupancyTypes = () => {
  let config = configuration();
  return axios.get(URL.getOccupancyType, config);
};

export const getSelectableOccupancyTypes = () => {
  let config = configuration();
  return axios.get(URL.selectableOccupancyTypes, config);
};
