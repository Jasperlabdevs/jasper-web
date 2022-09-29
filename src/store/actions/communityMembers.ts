import { getCommunityMembers } from "services/CommunityMembers";
import { GET_COMMUNITY_FAILURE, GET_COMMUNITY_MEMBERS } from "store/constants";

export const get_community_members = () => async (dispatch: any) => {
  return await getCommunityMembers().then(
    (res) =>
      dispatch({
        type: GET_COMMUNITY_MEMBERS,
        payload: res.data?.results,
      }),
    (error) =>
      dispatch({
        type: GET_COMMUNITY_FAILURE,
        payload: error.data,
      })
  );
};
