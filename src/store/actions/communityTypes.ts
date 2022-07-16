import { getCommunityTypes } from "services/helperServices";

import {
  GET_COMMUNITY_TYPES,
  GET_COMMUNITY_TYPES_FAILURE,
  GET_COMMUNITY_TYPES_SUCCESS,
} from "store/constants";

export const get_community_types = () => async (dispatch: any) => {
  dispatch({ type: GET_COMMUNITY_TYPES });

  return await getCommunityTypes().then(
    (res) =>
      dispatch({
        type: GET_COMMUNITY_TYPES_SUCCESS,
        payload: res.data?.results,
      }),
    (error) =>
      dispatch({
        type: GET_COMMUNITY_TYPES_FAILURE,
        payload: error.data,
      })
  );
};
