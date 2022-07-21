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

export const setAccessRules = (data: any) => {
  let config = configuration();
  return axios.post(URL.accessRules, { ...data }, config);
};

export const createEventAccess = (data: any) => {
  let config = configuration();
  return axios.post(URL.access, { ...data }, config);
};

export const getCommunityAccessHistory = () => {
  let config = configuration();
  return axios.get(URL.communityAccessHistory, config);
};


export const accessHistorySearchHistory = (data:any) => {
  let config = configuration();
  return axios.post(URL.accessHistorySearchFilter, data, config);

}

// const serialize = (obj:any) => {
//   var str = [];
//   for (var p in obj)
//     if (obj.hasOwnProperty(p)) {
//       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//     }
//   return str.join("&") + '/';
// }