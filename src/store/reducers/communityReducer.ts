import {
  ADD_COMMUNITY_SUCCESS,
  GET_COMMUNITY_SUCCESS,
  SET_COMMUNITY_SUCCESS,
} from "../constants";

const communityReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_COMMUNITY_SUCCESS:
      return { ...state, ...payload };
    case SET_COMMUNITY_SUCCESS:
      return payload;
    case GET_COMMUNITY_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default communityReducer;
