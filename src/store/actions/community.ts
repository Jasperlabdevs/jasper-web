import { getCommunity } from "services/community";
import {
  ADD_COMMUNITY_SUCCESS,
  GET_COMMUNITY_FAILURE,
  SET_COMMUNITY_SUCCESS,
  GET_COMMUNITY_SUCCESS,
} from "store/constants";

export const add_community = (data: any) => {
  return {
    type: ADD_COMMUNITY_SUCCESS,
    payload: data,
  };
};

export const set_community = (data: any) => {
  return {
    type: SET_COMMUNITY_SUCCESS,
    payload: data,
  };
};

export const get_community = () => async (dispatch: any) => {
  return await getCommunity().then(
    (res) =>
      dispatch({
        type: GET_COMMUNITY_SUCCESS,
        payload: res.data?.results,
      }),
    (error) =>
      dispatch({
        type: GET_COMMUNITY_FAILURE,
        payload: error.data,
      })
  );
};
