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


export const getPaymentRequests = () => {
  let config = configuration();

  return axios.get(URL.payment, config);
}

export const getPaymentRequestsDetails = (id:string) => {
  let config = configuration();

  return axios.get(URL.paymentDetails+id+'/', config);
}

export const getTransactionHistory = () => {
  let config = configuration();

  return axios.get(URL.transactionHistory, config);
}

export const verifyAccount = (data:any) => {
  let config = configuration();

  return axios.post(URL.verifyAccount, {...data}, config);
}


export const addRemoveRecepients = (data:any) => {
  let config = configuration();

  return axios.post(URL.addRemoveRecepients, {...data}, config);
}


