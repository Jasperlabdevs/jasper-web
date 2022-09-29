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

export const getCommunityMembers = () => {
  let config = configuration();
  return axios.get(URL.communityMembers, config);
};

export const searchFilterCommunityMembers = (data: any) => {
  let config = configuration();
  return axios.post(URL.communityMemberSearchFilter, { ...data }, config);
};
