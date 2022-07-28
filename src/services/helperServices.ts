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
  return axios.get(URL.occupantTypes, config);
};
export const getUser = () => {
  let config = configuration();
  return axios.get(URL.getUser, config);
};
export const editUser = (data: any) => {
  let config = configuration();
  return axios.put(URL.getUser, { ...data }, config);
};
export const getUserNotificationSettings = () => {
  let config = configuration();
  return axios.get(URL.userNotificationSettings, config);
};
export const changeUserNotificationSettings = ({
  manager_access,
  manager_chat,
  manager_payment,
  manager_issue,
  manager_post,
  manager_new_member,
}: any) => {
  let config = configuration();
  return axios.put(
    URL.userNotificationSettings,
    {
      manager_access,
      manager_chat,
      manager_payment,
      manager_issue,
      manager_post,
      manager_new_member,
    },
    config
  );
};
