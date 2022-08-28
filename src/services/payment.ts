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

export const getBanks = () => {
  let config = configuration();
  return axios.get(URL.banks, config);
};

export const submitBank = (data: any) => {
  let config = configuration();

  return axios.post(URL.submitBank, data, config);
};

export const updateBank = (data: any) => {
  let config = configuration();

  return axios.put(URL.submitBank, data, config);
};

export const makePaymentRequest = (data: any) => {
  let config = configuration();

  return axios.post(URL.payment, data, config);
};
